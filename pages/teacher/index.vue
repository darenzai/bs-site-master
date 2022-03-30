<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section v-if="teacherList.length===0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->

          <!-- /数据列表 开始-->
          <article v-if="teacherList.length>0" class="i-teacher-list">
            <ul class="of">
              <li v-for="(teacher, index) in teacherList" :key="index">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :title="teacher.name" :href="'/teacher/'+teacher.id">
                      <img :src="teacher.avatar" :alt="teacher.name" width="142">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :title="teacher.name" :href="'/teacher/'+teacher.id" class="fsize18 c-666">{{ teacher.name }}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999" >{{ teacher.intro }}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ teacher.career }}</p>
                  </div>
                </section>
              </li>

            </ul>
            <div class="clear"/>
          </article>
          <!-- /数据列表 结束-->
        </div>
      </section>
    </section>
    <!-- /讲师列表 结束 -->
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[8, 12, 16, 20, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
    />
  </div>
</template>

<script>
import teacherApi from '~/api/teacher'
export default {
  data() {
    return {
      page: 1,
      limit: 12,
      total: 0,
      teacherList: []
    }
  },
  // 服务器端渲染方案：
  // 异步数据获取：在前端服务器端执行
  created() {
    this.getTeachers()
  },
  methods: {
    getTeachers(page = 1) {
      this.page = page
      teacherApi.getTeacherList(this.page, this.limit).then(response => {
        this.teacherList = response.data.teacherList
        this.total = response.data.total
      })
    },
    // 处理当前页
    changeCurrentPage(val) {
      this.getTeachers(val)
    },
    // 每页大小切换
    changePageSize(val) {
      this.limit = val
      this.getTeachers()
    }
  }
}
</script>
