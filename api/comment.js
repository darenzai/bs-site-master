import request from '~/utils/request'

const api_name = '/api/edu/course/comment'

export default {
  // 1. 判断用户是否收藏课程
  edit(comment) {
    return request({
      url: `${api_name}/edit`,
      method: 'post',
      data: comment
    })
  },
  // 评论列表
  pageList(current, size, searchObj) {
    return request({
      url: `${api_name}/page/${current}/${size}`,
      method: 'post',
      data: searchObj
    })
  },
  // 点赞模块
  update(commentId) {
    return request({
      url: `${api_name}/update/${commentId}`,
      method: 'post'
    })
  },
  // 获取课程的评论数. 和课程评价平均分
  select(courseId) {
    return request({
      url: `${api_name}/select/${courseId}`,
      method: 'post'
    })
  },
  // 获取精彩的评论
  getPerfectComment(current, size) {
    return request({
      url: `${api_name}/perfect/list/${current}/${size}`,
      method: 'post'
    })
  }
}
