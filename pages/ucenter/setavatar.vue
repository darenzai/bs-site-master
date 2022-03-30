<template>
  <article class="col-7 fl">
    <div class="u-r-cont">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">
            <a href="javascript: void(0)" title="我的头像" class="current">
              我的头像
            </a>
          </section>
        </div>
        <div class="mt40">
          <section class="i-teach-wrap" style="width:500px">
            <el-upload
              :on-success="handleImageSuccess"
              :before-upload="beforeImageUpload"
              :on-error="handleImageError"
              :action="'http://localhost:88' + '/api/thirdparty/oss/get/url'"
              class="cover-uploader"
            >
              <img v-if="member.avatar" :src="member.avatar" style="width:300px;height:300px">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>
            <button v-if="show" style="margin:20px;width:130px;height:35px;" @click="onSubmit">更新</button>
          </section>
        </div>
      </section>
    </div>
  </article>
</template>
<script>
import memberApi from '~/api/member'
import cookie from 'js-cookie' // 导入cookie
export default {
  data() {
    return {
      member: {},
      show: false
    }
  },
  created() {
    this.initMember()
  },
  methods: {
    // 回显数据
    initMember() {
      memberApi.select().then(response => {
        this.member = response.data.member
      })
    },
    // 提交表单
    onSubmit() {
      memberApi.edit(this.member).then(response => {
        this.$message({
          type: 'success',
          message: '修改头像成功~'
        })
        this.show = false
        // 1. 获取返回的token, 将该token设置成当前cookie
        cookie.set('xueliedu_jwt_token', response.data.token, { domain: 'localhost' })
        this.$router.go(0)
      })
    },
    // 上传校验
    beforeImageUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    // 上传成功回调
    handleImageSuccess(res, file) {
      console.log(res)
      if (res.success) {
        // console.log(res)
        this.member.avatar = res.data.url
        this.show = true
        // 强制重新渲染
        this.$forceUpdate()
      } else {
        this.$message.error('上传失败1')
      }
    },
    // 错误处理
    handleImageError() {
      console.log('error')
      this.$message.error('上传失败2')
    }
  }
}
</script>
