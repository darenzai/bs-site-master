<template>
  <div>
    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css" >
    <!-- 启用私有加密的防调式：生产环境使用 -->
    <script src="https://g.alicdn.com/de/prismplayer/2.8.0/hls/aliplayer-vod-anti-min.js" />
    <!-- 阿里云视频播放器脚本 -->
    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js" />
    <!-- 定义播放器dom -->
    <div id="J_prismPlayer" class="prism-player"/>
  </div>
</template>
<script>
import vodApi from '~/api/thirdparty'

export default {
  async asyncData(page) {
    const vid = page.route.params.vid
    const response = await vodApi.getVideoPlayAuth(vid)
    return {
      vid: vid,
      playAuth: response.data.playAuth
    }
  },
  mounted() {
    /* eslint-disable no-undef */ // 忽略 no-undef 检测
    /* const player = */new Aliplayer({
      id: 'J_prismPlayer',
      width: '100%',
      height: '630px',
      autoplay: true,

      // 播放方式二：加密视频的播放：首先获取播放凭证
      encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
      vid: this.vid,
      playauth: this.playAuth
    }, function(player) {
      console.log('播放器创建成功')
    })
  }
}
</script>
