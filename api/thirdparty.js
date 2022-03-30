import request from '~/utils/request'
const api_name = '/api/thirdparty'

export default {
  // 1. 获取视频播放凭证
  getVideoPlayAuth(vid) {
    return request({
      baseURL: 'http://localhost:8160',
      url: `/thirdparty/vod/get/play/auth/${vid}`,
      method: 'get'
    })
  },
  // 2. 发送验证码
  sendMobileCode(mobile) {
    return request({
      url: `${api_name}/sms/send/code/${mobile}`,
      method: 'get'
    })
  }
}
