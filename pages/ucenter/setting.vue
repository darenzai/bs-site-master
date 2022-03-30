<template>
  <article class="col-7 fl">
    <div class="u-r-cont">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">
            <a href="javascript: void(0)" title="我的信息" class="current">
              我的信息
            </a>
          </section>
        </div>
        <div class="mt40">
          <section>
            <el-form :model="member" label-width="100px">
              <el-form-item label="昵称：">
                <el-input v-model="member.nickname"/>
              </el-form-item>
              <el-form-item label="性别：">
                <el-radio-group v-model="member.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="出生日期：">
                <el-date-picker
                  v-model="member.birthday"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
              <el-form-item label="我的签名：">
                <el-input v-model="member.sign" type="textarea"/>
              </el-form-item>
              <el-form-item style="text-align:center">
                <el-button :disabled="disabled" type="primary" @click="onSubmit">保存</el-button>
              </el-form-item>
            </el-form>
          </section>
        </div>
      </section>
    </div>
  </article>
</template>
<script>
import memberApi from '~/api/member'
import cookie from 'js-cookie' // 导入cookie
export default {
  data() {
    return {
      member: {},
      disabled: false
    }
  },
  // 声明周期 - 创建完成（可以访问当前this实例）
  created() {
    this.initMember()
  },
  methods: {
    // 回显数据
    initMember() {
      memberApi.select().then(response => {
        this.member = response.data.member
      })
    },
    // 提交表单
    onSubmit() {
      console.log('member:', this.member)
      memberApi.edit(this.member).then(response => {
        this.$message({
          type: 'success',
          message: '修改个人信息成功~'
        })
        this.disabled = true
        // 1. 修改token 刷新页面
        cookie.set('xueliedu_jwt_token', response.data.token, { domain: 'localhost' })
        this.$router.go(0)
      })
    }
  }
}
</script>
