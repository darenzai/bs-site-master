<template>
  <article class="col-7 fl">
    <div class="u-r-cont">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">
            <a href="javascript: void(0)" title="个人信息" class="current">
              个人信息
            </a>
          </section>
        </div>
        <div class="mt40">
          <section>
            <el-form :model="member" label-width="100px">
              <el-form-item label="昵称：">
                <el-tag type="info">{{ member.nickname }}</el-tag>
              </el-form-item>
              <el-form-item label="性别：">
                <el-radio-group v-model="member.sex">
                  <el-radio v-if="member.sex === 1" :label="1" border>男</el-radio>
                  <el-radio v-else :label="1" disabled border>男</el-radio>
                  <el-radio v-if="member.sex === 2" :label="2" border>女</el-radio>
                  <el-radio v-else :label="2" disabled border>女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="出生日期：">
                <el-date-picker
                  v-model="member.birthday"
                  type="date"
                  disabled
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
              <el-form-item label="我的签名：">
                <el-input v-model="member.sign" type="textarea" disabled/>
              </el-form-item>
              <el-form-item label="头像：">
                <img :src="member.avatar" style="width:300px;height:300px">
              </el-form-item>
            </el-form>
          </section>
        </div>
      </section>
    </div>
  </article>
</template>
<script>
import memberApi from '~/api/member'
export default {
  data() {
    return {
      member: {}
    }
  },
  // 声明周期 - 创建完成（可以访问当前this实例）
  created() {
    this.initMember()
  },
  methods: {
    // 回显数据
    initMember() {
      memberApi.select().then(response => {
        this.member = response.data.member
      })
    }
  }
}
</script>
