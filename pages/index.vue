<template>
  <div class="main">
    <!-- 幻灯片 开始 -->
    <div>
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-carousel height="400px" indicator-position="outside">
            <el-carousel-item v-for="banner in bannerList" :key="banner.id">
              <!-- target="_blank" href="/" -->
              <a>
                <img :src="banner.imageUrl" :alt="banner.title" style="width: 100%; height: 100%" >
              </a>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="4">
          <el-card class="box-card" body-style="height:358px;">
            <p style="text-align:center;">欢迎</p>
            <p style="text-align:center;">课程</p>
            <br><br>
            <div style="text-align:center;">
              <img v-if="!userInfo" style="width:50px;" src="~/assets/img/default-tea-img.gif" alt>
              <img v-if="userInfo" :src="userInfo.avatar" style="width:50px;" class="img1" alt>
            </div>
            <div v-if="!userInfo" style="text-align:center;">
              <a href="/login" title="登录/注册">
                <el-button type="success" round>登录/注册</el-button>
              </a>
            </div>
            <br><br>
            <p style="text-align:center;">学院教学辅助系统</p>
            <p v-if="!userInfo" style="font-size:30px;text-align:center;">Ali.</p>
            <p v-if="userInfo" style="font-size:30px;text-align:center;">{{ userInfo.nickname }}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 本周课程排行 开始 -->
    <div>
      <section class="container">
        <header class="comm-title">
          <h2 class="tac">
            <span class="c-333">本周课程排行</span>
          </h2>
        </header>
        <div>
          <el-row :gutter="20" type="flex" justify="center">
            <!-- 热门排行 Top 10 -->
            <el-col :span="8">
              <el-card class="box-card">
                <span><b>热门排行TOP 50</b></span>
                <span style="float: right;color:#C0C0C0;font-style: italic;"><b>HOT</b></span>
                <el-table :data="hotCourseList" style="margin:0px;padding:0px;">
                  <el-table-column width="320%">
                    <template slot-scope="scope">
                      <div @click="route(scope.row.id)">
                        <span :style="(hotPage - 1) * hotLimit + scope.$index + 1 == 1 || (hotPage - 1) * hotLimit + scope.$index + 1 == 2 || (hotPage - 1) * hotLimit + scope.$index + 1 == 3 ? 'font-size:20px;color:#FF6633;vertical-align:top;': 'font-size:20px;vertical-align:top;'">{{ (hotPage - 1) * hotLimit + scope.$index + 1 }}</span>&nbsp;
                        <img :src="scope.row.cover" style="width:45%;padding:0px;margin:0px;vertical-align:middle;">
                        <span style="vertical-align:top;font-size:12px;"><b>{{ scope.row.title }}</b></span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  :current-page="hotPage"
                  :page-size="hotLimit"
                  :total="hotTotal"
                  background
                  style="padding: 0;margin:0px;text-align: center;"
                  layout="prev, next"
                  @current-change="changeCurrentHotPage"/>
              </el-card>
            </el-col>
            <!-- 新课排行 -->
            <el-col :span="8">
              <el-card class="box-card">
                <span><b>新课排行</b></span>
                <span style="float: right;color:#C0C0C0;font-style: italic;"><b>NEW</b></span>
                <el-table :data="newCourseList" style="margin:0px;padding:0px;">
                  <el-table-column width="320%">
                    <template slot-scope="scope">
                      <div @click="route(scope.row.id)">
                        <span :style="(newPage - 1) * newLimit + scope.$index + 1 == 1 || (newPage - 1) * newLimit + scope.$index + 1 == 2 || (newPage - 1) * newLimit + scope.$index + 1 == 3 ? 'font-size:20px;color:#FF6633;vertical-align:top;': 'font-size:20px;vertical-align:top;'">{{ (newPage - 1) * newLimit + scope.$index + 1 }}</span>&nbsp;
                        <img :src="scope.row.cover" style="width:45%;padding:0px;margin:0px;vertical-align:middle;">
                        <span style="vertical-align:top;font-size:12px;"><b>{{ scope.row.title }}</b></span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  :current-page="newPage"
                  :page-size="newLimit"
                  :total="newTotal"
                  background
                  style="padding: 0;margin:0px;text-align: center;"
                  layout="prev, next"
                  @current-change="changeCurrentNewPage"/>
              </el-card>
            </el-col>
            <!-- 五星评价 Top 50 -->
            <el-col :span="8">
              <el-card class="box-card">
                <span><b>五星评价TOP 10</b></span>
                <span style="float: right;color:#C0C0C0;font-style: italic;"><b>GOOD</b></span>
                <el-table :data="goodCourseList" style="margin:0px;padding:0px;">
                  <el-table-column width="320%">
                    <template slot-scope="scope">
                      <div @click="route(scope.row.id)">
                        <span :style="(goodPage - 1) * goodLimit + scope.$index + 1 == 1 || (goodPage - 1) * goodLimit + scope.$index + 1 == 2 || (goodPage - 1) * goodLimit + scope.$index + 1 == 3 ? 'font-size:20px;color:#FF6633;vertical-align:top;': 'font-size:20px;vertical-align:top;'">{{ (goodPage - 1) * goodLimit + scope.$index + 1 }}</span>&nbsp;
                        <img :src="scope.row.cover" style="width:45%;padding:0px;margin:0px;vertical-align:middle;">
                        <span style="vertical-align:top;font-size:12px;"><b>{{ scope.row.title }}</b></span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  :current-page="goodPage"
                  :page-size="goodLimit"
                  :total="goodTotal"
                  background
                  style="padding: 0;margin:0px;text-align: center;"
                  layout="prev, next"
                  @current-change="changeCurrentGoodPage"/>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </section>
      <!-- /本周课程排行 结束 -->
    </div>
    <!-- 精彩评论 开始 -->
    <div>
      <section class="container">
        <header class="comm-title">
          <h2 class="tac">
            <span class="c-333">精彩评论</span>
          </h2>
        </header>
        <article class="comm-course-list">
          <ul id="bna" class="of">
            <li v-for="(comment,index) in prettyComment" :key="index">
              <div class="a cc-l-wrap" @click="route(comment.courseId)" >
                <section class="course-img">
                  <el-card shadow class="box-card" body-style="height:220px;">
                    <div>
                      <img :src="comment.avatar" style="width:55px; height:55px; border-radius:50%; " class="picImg">&nbsp;&nbsp;
                      <span><font class="fsize16 c-999 ml5">{{ comment.nickname }}</font></span>
                    </div>
                    <div class="content">
                      {{ comment.content }}
                    </div>
                    <div style="position: relative;position: absolute; bottom: 0;">
                      <span style="font-size:13px;color:#00CC66;">来自《{{ comment.courseName }}》</span>
                    </div>
                  </el-card>
                </section>
              </div>
            </li>
          </ul>
          <el-pagination
            :current-page="prettyPage"
            :page-size="prettyLimit"
            :total="prettyTotal"
            background
            style="padding: 0;margin:0px;text-align: center;"
            layout="prev, next"
            @current-change="changeCurrentPrettyPage"/>
          <div class="clear" />
        </article>
      </section>
      <!-- /精彩评论 结束 -->
    </div>

    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门课程</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul id="bna" class="of">
                <li v-for="course in courseList" :key="course.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        :src="course.cover"
                        :alt="course.title"
                        class="img-responsive"
                      >
                      <div class="cc-mask">
                        <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a :href="'/course/'+course.id" :title="course.title" class="course-title fsize18 c-333">{{ course.title }}</a>
                    </h3>
                    <span v-if="Number(course.price) === 0" class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span v-else class="fr jgTag ">
                      <i class="c-orange fsize12 f-fA"> ￥{{ course.price }}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ course.viewCount }}人学习</i>
                      |
                      <i class="c-999 f-fA">{{ course.buyCount }}人购买</i>
                    </span>
                  </div>
                </li>

              </ul>
              <div class="clear" />
            </article>
            <section class="tac pt20">
              <a href="/course" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师专栏</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in teacherList" :key="teacher.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a :href="'/teacher/'+teacher.id" :title="teacher.name">
                        <img :src="teacher.avatar" :alt="teacher.name" height="142">
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a :href="'/teacher/'+teacher.id" :title="teacher.name" class="fsize18 c-666">{{ teacher.name }}</a>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear" />
            </article>
            <section class="tac pt20">
              <a href="/teacher" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->
    </div>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import memberApi from '~/api/member'
import bannerApi from '~/api/banner'
import indexApi from '~/api/index'
import courseApi from '~/api/course'
import commentAPi from '~/api/comment'
export default {
  data() {
    return {
      hotPage: 1,
      hotLimit: 5,
      hotTotal: 50,
      hotCourseList: [],
      newPage: 1,
      newLimit: 5,
      newTotal: 50,
      newCourseList: [],
      goodPage: 1,
      goodLimit: 5,
      goodTotal: 10,
      goodCourseList: [],
      userInfo: null, // 用户信息
      prettyPage: 1,
      prettyLimit: 4,
      prettyTotal: 10,
      prettyComment: [] // 精彩评论
    }
  },
  async asyncData() {
    // 获取首页banner数据
    const bannerListResponse = await bannerApi.getBannerList()
    const bannerList = bannerListResponse.data.bannerList
    // console.log('bannerList', bannerList)
    // 获取名师和热门课程
    const indexDataResponse = await indexApi.getCourseAndTeacherList()
    const courseList = indexDataResponse.data.courseList
    const teacherList = indexDataResponse.data.teacherList

    return {
      bannerList,
      courseList,
      teacherList
    }
  },
  created() {
    if (cookie.get('xueliedu_jwt_token')) {
      this.fetchUserData()
    }
    this.fetchHotCourse()
    this.fetchNewCourse()
    this.fetchGoodCourse()
    this.fetchPrettyComment()
  },
  methods: {
    fetchUserData() {
      memberApi.getLoginInfo().then(response => {
        // 渲染页面
        this.userInfo = response.data.userInfo
      })
    },
    fetchPrettyComment(prettyPage = 1) {
      this.prettyPage = prettyPage
      // 获取热门课程 TOP 50
      commentAPi.getPerfectComment(this.prettyPage, this.prettyLimit).then(response => {
        this.prettyComment = response.data.collectComment
        this.prettyTotal = response.data.total
      })
    },
    fetchHotCourse(hotPage = 1) {
      this.hotPage = hotPage
      // 获取热门课程 TOP 50
      courseApi.hotPageList(this.hotPage, this.hotLimit).then(response => {
        this.hotCourseList = response.data.hotCourses
        this.hotTotal = response.data.total
      })
    },
    fetchNewCourse(newPage = 1) {
      this.newPage = newPage
      // 获取热门课程 TOP 50
      courseApi.newCourseList(this.newPage, this.newLimit).then(response => {
        this.newCourseList = response.data.newCourses
        this.newTotal = response.data.total
      })
    },
    fetchGoodCourse(goodPage = 1) {
      this.goodPage = goodPage
      // 获取热门课程 TOP 50
      courseApi.goodCourseList(this.goodPage, this.goodLimit).then(response => {
        this.goodCourseList = response.data.goodCourses
      })
    },
    changeCurrentHotPage(val) {
      this.fetchHotCourse(val)
    },
    changeCurrentNewPage(val) {
      this.fetchNewCourse(val)
    },
    changeCurrentGoodPage(val) {
      this.fetchGoodCourse(val)
    },
    changeCurrentPrettyPage(val) {
      this.fetchPrettyComment(val)
    },
    route(id) {
      this.$router.push({
        path: '/course/' + id
      })
    }
  }
}
</script>
<style>
  .content{
    overflow:hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 6;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    width:230px;
  }
  .a:hover {
    box-shadow:2px 2px 5px #000;
  }
</style>
