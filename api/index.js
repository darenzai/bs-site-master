import request from '~/utils/request'

const api_name = '/api/edu/front/index'

export default {
  // 1. 获取课程和讲师
  getCourseAndTeacherList() {
    return request({
      url: `${api_name}/get/course/teacher/list`,
      method: 'get'
    })
  }
}
