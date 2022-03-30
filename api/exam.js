import request from '~/utils/request'

const api_name = '/api/ems/exam/api'

export default {
  // 1. 根据课程Id和type的类型没, 查询单元测试或者考试
  select(courseId, type) {
    return request({
      url: `${api_name}/select/${courseId}/${type}`,
      method: 'post'
    })
  },
  // 根据考试的id查询课程id
  getCourseIdById(examId) {
    return request({
      url: `${api_name}/select/${examId}`,
      method: 'post'
    })
  }
}
