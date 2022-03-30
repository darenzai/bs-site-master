import request from '~/utils/request'

const api_name = '/api/ems/paper/api'

export default {
  // 1. 根据课程Id和type的类型没, 查询单元测试或者考试
  select(examId) {
    return request({
      url: `${api_name}/select/${examId}`,
      method: 'post'
    })
  }
}
