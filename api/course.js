import request from '~/utils/request'

const api_name = '/api/edu/front/course'

export default {
  // 1. 根据条件获取课程列表
  getCourseListByCondition(searchObj) {
    return request({
      url: `${api_name}/get/course/list`,
      method: 'post',
      data: searchObj
    })
  },
  // 2. 获取课程详情
  getCourseInfoById(courseId) {
    return request({
      url: `${api_name}/get/course/info/${courseId}`,
      method: 'get'
    })
  },
  // 3. 热门排行TOP 50
  hotPageList(page, limit) {
    return request({
      url: `${api_name}/hot/page/${page}/${limit}`,
      method: 'post'
    })
  },
  // 4. 新课排行
  newCourseList(page, limit) {
    return request({
      url: `${api_name}/new/page/${page}/${limit}`,
      method: 'post'
    })
  },
  // 5. 好评排行
  goodCourseList(page, limit) {
    return request({
      url: `${api_name}/good/page/${page}/${limit}`,
      method: 'post'
    })
  }
}
