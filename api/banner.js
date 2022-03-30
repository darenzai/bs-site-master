import request from '~/utils/request'

const api_name = '/api/edu/front/banner'

export default {
  // 1. 获取最新的轮播图
  getBannerList() {
    return request({
      url: `${api_name}/get/banners`,
      method: 'get'
    })
  }
}
