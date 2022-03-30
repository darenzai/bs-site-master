<template>
  <!-- 公共头 -->
  <header id="header">
    <section class="container">
      <h1 id="logo">
        <a href="#" title="WFIT教学辅助系统">
          <img src="~/assets/img/logo.png" width="100%" alt="教学辅助系统">
        </a>
      </h1>
      <div class="h-r-nsl">
        <ul class="nav">
          <router-link to="/" tag="li" active-class="current" exact>
            <a>首页</a>
          </router-link>
          <router-link to="/course" tag="li" active-class="current">
            <a>课程</a>
          </router-link>
          <router-link to="/teacher" tag="li" active-class="current">
            <a>名师</a>
          </router-link>
          <router-link to="/article" tag="li" active-class="current">
            <a>文章</a>
          </router-link>
          <router-link to="/question" tag="li" active-class="current">
            <a>问答</a>
          </router-link>
        </ul>
        <!-- / nav -->
        <!-- 如果用户信息不存在, 才显示登录 -->
        <ul class="h-r-login">
          <li v-if="!userInfo" id="no-login">
            <a href="/login" title="登录">
              <em class="icon18 login-icon">&nbsp;</em>
              <span class="vam ml5">登录</span>
            </a>
            |
            <a href="/register" title="注册">
              <span class="vam ml5">注册</span>
            </a>
          </li>
          <li v-if="userInfo" id="is-login-one" class="mr10">
            <a id="headerMsgCountId" href="#" title="消息">
              <em class="icon18 news-icon">&nbsp;</em>
            </a>
            <q class="red-point">&nbsp;</q>
          </li>
          <li v-if="userInfo" id="is-login-two" class="h-r-user">
            <a href="/ucenter" title>
              <img
                :src="userInfo.avatar"
                width="30"
                height="30"
                class="vam picImg"
                alt>
              <span id="userName" class="vam disIb">{{ userInfo.nickname }}</span>
            </a>
            <a href="javascript:void(0);" title="退出" class="ml5" @click="logout()">退出</a>
          </li>
          <!-- /未登录显示第1 li；登录后显示第2，3 li -->
        </ul>
        <aside class="h-r-search">
          <form action="#" method="post">
            <label class="h-r-s-box">
              <input type="text" placeholder="搜索课程" name="queryCourse.courseName" value>
              <button type="submit" class="s-btn">
                <em class="icon18">&nbsp;</em>
              </button>
            </label>
          </form>
        </aside>
      </div>
      <aside class="mw-nav-btn">
        <div class="mw-nav-icon"/>
      </aside>
      <div class="clear"/>
    </section>
  </header>
  <!-- /公共头 -->
</template>
<script>
import memberApi from '~/api/member'
import cookie from 'js-cookie'

export default {

  data() {
    return {
      userInfo: null,
      token: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  mounted() {
    // 1. 获取页面参数
    this.token = this.$route.query.token
    if (this.token) {
      // 将token存储cookie中
      cookie.set('xueliedu_jwt_token', this.token, { domain: 'localhost' })
      // 路由主页面
      // 因为create中无法使用window, 所以写在mounted中
      window.location.href = '/'
    }
  },
  methods: {
    // 登录成功, 获取用户信息
    getUserInfo() {
      // 如果cookie中token不存在，则不显示用户信息
      if (!cookie.get('xueliedu_jwt_token')) {
        return
      }
      console.log('2........')
      // 如果token存在，则根据token解析用户登录信息
      memberApi.getLoginInfo().then(response => {
        // 渲染页面
        this.userInfo = response.data.userInfo
        console.log('userInfo:', this.userInfo.nickname)
      })
    },
    // 登出
    logout() {
      // 1. 清除cookie
      cookie.set('xueliedu_jwt_token', '', { domain: 'localhost' })
      // 2. 刷新页面
      window.location.href = '/'
    }
  }
}
</script>
