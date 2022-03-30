import request from '~/utils/request'

const api_name = '/api/ems/answer'

export default {
  // 1. 提交试卷, 插入答案
  edit(answer) {
    return request({
      url: `${api_name}/edit`,
      method: 'post',
      data: answer
    })
  },
  // 2. 解析, 试卷
  select(examId, number) {
    return request({
      url: `${api_name}/select/${examId}/${number}`,
      method: 'post'
    })
  }
}
