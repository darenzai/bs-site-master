import request from '~/utils/request'
const api_name = '/api/ums/wx/pay'

export default {
  getWxQrCodeByOrderNo(orderNo) {
    return request({
      url: `${api_name}/get/qrcode/${orderNo}`,
      method: 'get'
    })
  }
}
