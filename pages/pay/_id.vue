<template>
  <div class="cart py-container">
    <!--主内容-->
    <div class="checkout py-container  pay">
      <div class="checkout-tit" style="width: 1050px; margin: 0 auto; padding: 10px 0;">
        <h4 class="fl tit-txt"><span class="success-info">支付申请提交成功，请您及时付款！订单号：{{ payObj.out_trade_no }}</span>
        </h4>
        <span class="fr"><em class="sui-lead">应付金额：</em><em class="orange money">￥{{ payObj.total_fee/100 }}</em></span>
        <div class="clearfix"/>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">微信支付</div>
        <div class="fl sao">
          <div class="fl code">
            <!-- <img id="qrious" src="~/assets/img/erweima.png" alt=""> -->
            <qriously :value="payObj.code_url" :size="338"/>
          </div>
          <div style="color: red; text-align:center;">请使用微信扫一扫</div>
        </div>
        <div class="clearfix"/>
        <!-- <p><a href="pay.html" target="_blank"> 其他支付方式</a></p> -->
      </div>
    </div>

  </div>
</template>
<script>
import payApi from '~/api/pay'
import orderApi from '~/api/order'

export default {
  async asyncData(page) {
    const response = await payApi.getWxQrCodeByOrderNo(page.route.params.id)
    return {
      payObj: response.data
    }
  },
  data() {
    return {
      timer: null, // 定时器名称
      initQCode: '',
      timer1: ''
    }
  },
  mounted() {
    // 在页面渲染之后执行
    // 每隔三秒，去查询一次支付状态
    this.timer1 = setInterval(() => {
      this.queryPayStatus(this.payObj.out_trade_no)
    }, 3000)
  },
  methods: {
    // 查询支付状态的方法
    queryPayStatus(out_trade_no) {
      orderApi.getPayStatus(out_trade_no).then(response => {
        if (response.data != null) {
          // 如果支付成功，清除定时器
          clearInterval(this.timer1)
          this.$message({
            type: 'success',
            message: '支付成功!'
          })
          // 跳转到课程详情页面观看视频
          this.$router.push({ path: '/course/' + this.payObj.course_id })
        }
      })
    }
  }

}
</script>
