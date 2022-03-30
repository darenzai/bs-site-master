import request from '~/utils/request'
// import cookie from 'js-cookie'
const api_name = '/api/ums/order'

export default {
  // 新增订单
  addOrder(courseId) {
    return request({
      url: `${api_name}/save/auth/${courseId}`,
      method: 'post'
    })
  },
  // 根据id获取订单信息
  getOrderById(orderId) {
    return request({
      url: `${api_name}/get/order/${orderId}`,
      method: 'get'
    })
  },
  // 获取课程状态,是否需要购买
  getCourseStatusById(courseId) {
    return request({
      url: `${api_name}/get/course/status/${courseId}`,
      method: 'get'
    })
  },
  // 获取当前用户订单列表
  getMemberOrderList() {
    return request({
      url: `${api_name}/get/member/order/list`,
      method: 'get'
    })
  },
  // 删除订单接口
  deleteOrderById(orderId) {
    return request({
      url: `${api_name}/delete/order/${orderId}`,
      method: 'delete'
    })
  },
  // 根据订单号, 查询订单状态
  getPayStatus(orderNo) {
    return request({
      url: `${api_name}/pay/info/get/status/${orderNo}`,
      method: 'get'
    })
  }
}
