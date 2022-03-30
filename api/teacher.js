import request from '~/utils/request'

const api_name = '/api/edu/front/teacher'

export default{
  // 1. 获取讲师列表
  getTeacherList(current, limit) {
    return request({
      url: `${api_name}/get/teacher/list/${current}/${limit}`,
      method: 'get'
    })
  },
  getTeacherInfoById(id) {
    return request({
      url: `${api_name}/get/teacher/${id}`,
      method: 'get'
    })
  }
}
