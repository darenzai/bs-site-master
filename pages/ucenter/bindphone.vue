a<template>
  <article class="col-7 fl">
    <div class="u-r-cont">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">
            <a href="javascript: void(0)" title="绑定手机" class="current">
              绑定手机
            </a>
          </section>
        </div>
        <div class="mt40">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step title="验证身份"/>
            <el-step title="绑定手机"/>
            <el-step title="绑定成功"/>
          </el-steps>
          <div v-if="active === 0" style="text-align:center;margin: 50px;">
            <el-input
              :disabled="true"
              placeholder="原手机号"
              style="width:108px;"/>
            <el-input
              v-model="member.mobile"
              :disabled="true"
              style="width:200px;"/>
            <br><br>
            <el-input v-model="code" placeholder="请输入内容" value style="width:200px;"/>
            <el-button style="width:108px;" @click="getCodeFun" >{{ codeText }}</el-button>
            <p v-if="code === ''" style="margin: 0px 0px 0px -230px;color:red;">请输入验证码</p>
            <p v-else><br></p>
            <el-button type="primary" style="width:315px;" @click="one">下一步</el-button>
          </div>
          <div v-if="active === 1" style="text-align:center;margin: 50px;">
            <el-input
              :disabled="true"
              placeholder="中国大陆"
              style="width:108px;"/>
            <el-input
              v-model="member.mobile"
              placeholder="请输入手机号"
              style="width:200px;"/>
            <p v-if="member.mobile === ''" style="margin: 0px 0px 0px -215px;color:red;">请输入手机号</p>
            <p v-else-if="mobileText != null" style="margin: 0px 0px 0px -215px;color:red;">{{ mobileText }}<br></p>
            <p v-else><br></p>
            <el-input v-model="code" placeholder="请输入内容" value style="width:200px;"/>
            <el-button style="width:108px;" @click="getCodeFun" >{{ codeText }}</el-button>
            <p v-if="code === ''" style="margin: 0px 0px 0px -220px;color:red;">{{ codeMsg }}</p>
            <p v-else><br></p>
            <el-button type="primary" style="width:315px;" @click="two">下一步</el-button>
          </div>
          <div v-if="active === 2" style="text-align:center;margin: 50px;">
            <h1 style="font-size: 30px;">修改手机号成功!</h1>
            <p style="margin:20px;">为了您的账户安全, 修改手机后, 请重新登录</p>
            <img src="~/assets/img/success.jpg"><br>
            <el-button type="primary" style="margin: 25px;width:150px;" @click="goLogin">重新登录</el-button>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>
<script>
import memberApi from '~/api/member'
import thirdpartyApi from '~/api/thirdparty'
export default {
  data() {
    return {
      member: {},
      codeText: '获取验证码',
      sending: false, // 是否发送验证码
      second: 60, // 倒计时间
      code: '',
      active: 0,
      mobileText: '',
      codeMsg: '请输入验证码'
    }
  },
  // 声明周期 - 创建完成（可以访问当前this实例）
  created() {
    this.initMember()
  },
  methods: {
    one() {
      if (this.code === '' || this.code === null) {
        console.log('this.code', this.code)
      } else {
        memberApi.checkCode(this.member, this.code).then(response => {
          // 清空验证码
          this.code = '0'
          this.active = 1
        })
      }
    },
    two() {
      if (this.code === '' || this.code === null || this.member.mobile === '' || this.member.mobile === null) {
        this.codeMsg = '验证码不能为空'
      } else if (!(/^1[3456789]\d{9}$/.test(this.member.mobile))) {
        this.mobileText = '手机号格式错误'
      } else {
        this.mobileText = ''
        memberApi.checkCode(this.member, this.code).then(response => {
          memberApi.edit(this.member).then(response => {
            this.active = 2
          })
        })
      }
    },
    goLogin() {
      this.$router.push({
        path: '/login'
      })
    },
    // 回显数据
    initMember() {
      memberApi.select().then(response => {
        this.member = response.data.member
      })
    },
    // 获取验证码
    getCodeFun() {
      // this.sending原为false,
      // 点击后立即使 this.sending == true，防止有人多次点击
      if (this.sending) { return }
      this.sending = true
      thirdpartyApi.sendMobileCode(this.member.mobile).then(response => {
        this.timeDown()
        this.$message({
          type: 'success',
          message: '短信发送成功'
        })
      })
    },
    // 倒计时
    timeDown() {
      const result = setInterval(() => {
        this.codeText = this.second
        this.second--
        if (this.second < 0) {
          // 清楚定时任务
          clearInterval(result)
          this.sending = false
          this.second = 60
          this.codeText = '获取验证码'
        }
        if (this.code === '0') {
          // 清楚定时任务
          clearInterval(result)
          this.sending = false
          this.second = 60
          this.codeText = '获取验证码'
          this.code = ''
        }
      }, 1000)
    }
  }
}
</script>
