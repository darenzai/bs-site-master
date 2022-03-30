<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
      <span>·</span>
      <a href="/">首页</a>
    </div>

    <div class="sign-up-container">
      <form action="register">
        <div class="input-prepend restyle">
          <input
            v-model="user.mobile"
            type="text"
            placeholder="手机号">
          <i class="iconfont icon-phone"/>
        </div>
        <div class="input-prepend">
          <input
            v-model="user.password"
            type="password"
            placeholder="密码">
          <i class="iconfont icon-password"/>
        </div>
        <div class="btn">
          <input
            type="button"
            class="sign-in-button"
            value="登录"
            @click="submitLogin()">
        </div>
      </form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" href="http://localhost:8150/api/ucenter/wx/login"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'
import memberApi from '~/api/member'
import cookie from 'js-cookie'

export default {
  layout: 'sign',
  data() {
    return {
      user: {
        mobile: '',
        password: ''
      },
      fromRoute: ''
    }
  },
  // beforeRouteEnter: (to, from, next) => {
  //   console.log(to, '组件独享守卫beforeRouteEnter第一个参数')
  //   console.log(from, '组件独享守卫beforeRouteEnter第二个参数')
  //   next(vm => {
  //     // 1. 记录来的路由
  //     vm.fromRoute = from.fullPath
  //   })
  // },
  methods: {
    // 登录
    submitLogin() {
      // 1. 请求后端拿到token
      memberApi.loginMember(this.user).then(response => {
        // 2. 将token设置到Request的cookie中
        cookie.set('xueliedu_jwt_token', response.data.token, { domain: 'localhost' })
        // // 3. 路由到主页
        // window.location.href = this.fromRoute
        // 跳转到首页
        // window.location.href = '/'
        if (document.referrer.indexOf('register') !== -1) {
          window.location.href = '/'
        } else {
          history.go(-1)
        }
      })
    }
  }
}
</script>
