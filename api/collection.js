import request from '~/utils/request'

const api_name = '/api/edu/course/collect'

export default {
  // 1. 判断用户是否收藏课程
  isCollection(courseId) {
    return request({
      url: `${api_name}/is/collection/${courseId}`,
      method: 'get'
    })
  },
  // 2. 收藏课程
  addCollection(courseId) {
    return request({
      url: `${api_name}/add/collection/${courseId}`,
      method: 'post'
    })
  },
  // 3. 取消收藏课程
  cancelCourseCollection(courseId) {
    return request({
      url: `${api_name}/delete/course/collection/${courseId}`,
      method: 'delete'
    })
  },
  // 4. 获取收藏列表, 根据用户id
  getCourseCollectionList() {
    return request({
      url: `${api_name}/get/course/collection/list`,
      method: 'get'
    })
  }
}

