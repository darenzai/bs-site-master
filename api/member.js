import request from '~/utils/request'
// import cookie from 'js-cookie'
const api_name = '/api/ums/member'

export default {
  // 通过手机验证码注册用户
  registerMemberByMobile(registerVo) {
    return request({
      url: `${api_name}/register`,
      method: 'post',
      data: registerVo
    })
  },
  // 登录Api
  loginMember(loginVo) {
    return request({
      url: `${api_name}/login`,
      method: 'post',
      data: loginVo
    })
  },
  // 根据request中Headers的token获取用户信息
  getLoginInfo() {
    return request({
      url: `${api_name}/get/login/info`,
      method: 'get'
      // headers: { 'token': cookie.get('xueliedu_jwt_token') }
    })
  },
  // 更改个人资料
  edit(member) {
    return request({
      url: `${api_name}/edit`,
      method: 'post',
      data: member
    })
  },
  // 查询用户信息
  select() {
    return request({
      url: `${api_name}/select`,
      method: 'post'
    })
  },
  // 验证用户验证码
  checkCode(member, code) {
    return request({
      url: `${api_name}/check/${code}`,
      method: 'post',
      data: member
    })
  },
  // 修改用户密码
  updatePassword(member, password) {
    return request({
      url: `${api_name}/update/${password}`,
      method: 'post',
      data: member
    })
  }
}
