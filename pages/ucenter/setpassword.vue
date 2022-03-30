<template>
  <article class="col-7 fl">
    <div class="u-r-cont">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">
            <a href="javascript: void(0)" title="修改密码" class="current">
              修改密码
            </a>
          </section>
        </div>
        <div class="mt40">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step title="验证身份"/>
            <el-step title="设置密码"/>
            <el-step title="改密成功"/>
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
              placeholder="新的密码"
              style="width:108px;"/>
            <el-input
              v-model="password1"
              type="password"
              style="width:200px;"/>
            <br><br>
            <el-input
              :disabled="true"
              placeholder="确认密码"
              style="width:108px;"/>
            <el-input
              v-model="password2"
              type="password"
              style="width:200px;"/>
            <p v-if="password1 === '' || password2 == ''" style="margin: 0px 0px 0px -220px;color:red;">密码不能为空</p>
            <p v-else-if="checkPassword != null && !flag" style="margin: 0px 0px 0px 164px;color:red;">{{ checkPassword }}<br></p>
            <p v-else-if="checkPassword != null && flag" style="margin: 0px 0px 0px -215px;color:red;">{{ checkPassword }}<br></p>
            <p v-else><br></p>
            <el-button type="primary" style="width:315px;" @click="two">下一步</el-button>
          </div>
          <div v-if="active === 2" style="text-align:center;margin: 50px;">
            <h1 style="font-size: 30px;">修改登录密码成功!</h1>
            <p style="margin:20px;">为了您的账户安全, 改密成功后, 请重新登录</p>
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
      checkPassword: '',
      flag: false,
      password1: '',
      password2: '',
      passwordFlag: true
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
          this.code = ''
          this.active = 1
        })
      }
    },
    two() {
      var pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}')
      // 1. 验证密码规则
      if (!pwdRegex.test(this.password1) || !pwdRegex.test(this.password2)) {
        this.flag = false
        this.checkPassword = '密码中必须包含大小写 字母、数字、特称字符，至少8个字符，最多30个字符'
      } else if (this.password1 !== this.password2) { // 2. 确认两次输入的密码是否一致
        this.flag = true
        this.checkPassword = '两次密码不一致'
      } else { // 3. 发送请求修改密码
        memberApi.updatePassword(this.member, this.password1).then(response => {
          this.active = 2
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
