import request from '~/utils/request'

const api_name = '/api/edu/front/subject'

export default {
  multiLevelSubjectList() {
    return request({
      url: `${api_name}/get/subject/list`,
      method: 'get'
    })
  }
}
