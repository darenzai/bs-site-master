<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 课程详情 开始 -->
    <section class="container">
      <!-- 课程所属分类 开始 -->
      <section class="path-wrap txtOf hLh30">
        <a href="/" title class="c-999 fsize14">首页</a>
        \
        <a href="/course" title class="c-999 fsize14">课程列表</a>
        \
        <a :href="'/course?subjectParentId='+course.subjectLevelOneId" class="c-333 fsize14">{{ course.subjectLevelOne }}</a>
        \
        <a :href="'/course?subjectParentId='+course.subjectLevelOneId+'&subjectId='+course.subjectLevelTwoId" class="c-333 fsize14">{{ course.subjectLevelTwo }}</a>
      </section>
      <!-- /课程所属分类 结束 -->

      <!-- 课程基本信息 开始 -->
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section id="videoPlay" class="p-h-video-box">
            <img :src="course.cover" :alt="course.title" class="dis c-v-pic">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ course.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size:24px;">￥{{ course.price }}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">主讲： {{ course.teacherName }}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <section class="c-attr-mt of">
              <span v-if="isCollect" class="ml10 vam sc-end">
                <em class="icon18 scIcon"/>
                <a
                  style="cursor:pointer"
                  class="c-fff vam"
                  title="取消收藏"
                  @click="collection(course.id)">已收藏</a>
              </span>
              <span v-else class="ml10 vam">
                <em class="icon18 scIcon"/>
                <span
                  style="cursor:pointer"
                  class="c-fff vam"
                  title="收藏"
                  @click="collection(course.id)" >收藏</span>
              </span>
            </section>
            <section v-if="status || course.price === 0" class="c-attr-mt">
              <a
                href="javascript:void(0);"
                title="立即观看"
                class="comm-btn c-btn-3">立即观看</a>
            </section>
            <section v-else class="c-attr-mt">
              <a
                href="javascript:void(0);"
                title="立即购买"
                class="comm-btn c-btn-3"
                @click="createOrder()">立即购买</a>
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.buyCount }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.lessonNum }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ course.viewCount }}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"/>
      </div>
      <!-- /课程基本信息 结束 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a :class="active == 1 ? 'current':''" name="c-i" title="课程详情" @click="changeActive(1)">课程详情</a>
                  <a :class="active == 2 ? 'current':''" name="c-i" title="单元测试" @click="changeActive(2)">单元测试</a>
                  <a :class="active == 3 ? 'current':''" name="c-i" title="考试" @click="changeActive(3)">考试</a>
                  <a :class="active == 4 ? 'current':''" name="c-i" title="课程评论" @click="changeActive(4)">评论区</a>
                </section>
              </div>
              <article v-if="active == 1" class="ml10 mr10 pt20">
                <!-- 课程详情介绍 开始 -->
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <!-- v-html：将内容中的html翻译过来 -->
                    <section class="course-txt-body" v-html="course.description">
                      <!-- {{ course.description }} -->
                    </section>
                  </div>
                </div>
                <!-- /课程详情介绍 结束 -->

                <!-- 课程大纲 开始-->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 课程章节目录 -->
                          <li v-for="chapter in chapterList" :key="chapter.id" class="lh-menu-stair">
                            <a :title="chapter.title" href="javascript: void(0)" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"/>{{ chapter.title }}
                            </a>
                            <ol class="lh-menu-ol" style="display: block;">
                              <li v-for="video in chapter.children" :key="video.id" class="lh-menu-second ml30">
                                <a
                                  v-if="status || course.price === 0"
                                  :title="video.title"
                                  href="#"
                                  @click="toPlayer(video.videoSourceId)">
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                </a>
                                <a
                                  v-else-if="video.free === true"
                                  :href="'/player/'+video.videoSourceId"
                                  :title="video.title">
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                  <i class="free-icon vam mr10">免费试听</i>
                                </a>
                                <a
                                  v-else
                                  :title="video.title">
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                  <!-- /课程大纲 结束 -->
                </div>
              </article>
              <!-- 单元测试开始 -->
              <article v-if="active === 2" class="ml10 mr10">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>单元测试</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 课程章节目录 -->
                          <li v-for="(exam, index) in examList" :key="index" class="lh-menu-stair">
                            <p style="font-size:20px;">{{ exam.chapterName }}</p>
                            <el-collapse>
                              <el-collapse-item>
                                <template slot="title">
                                  <!-- <span style="font-size:20px;" >
                                    {{ exam.title }}&nbsp;&nbsp;
                                  </span> -->
                                  <span class="fl"><b style="font-size:15px;">{{ exam.title }}</b>&nbsp;&nbsp;<font class="fsize15 c-999 ml5">截止时间: {{ exam.stopTime }}</font></span>
                                  <span v-if="exam.number != 0" class="fl"><font class="fsize15 c-999 ml5">&nbsp;&nbsp;&nbsp;&nbsp;测试得分: {{ exam.maxScore }}</font></span>
                                  <el-button v-if="exam.number == 3" type="info" plain round style="float:right;margin: 5px 0px;" @click.stop="goAnalysis(exam.id, exam.number)">查看解析</el-button>
                                  <el-button v-else type="info" plain round style="float:right;margin: 5px 0px;" @click.stop="goExam(exam.id)">前往测试</el-button>
                                </template>
                                <div>
                                  <p>截止日期&nbsp;&nbsp;&nbsp;&nbsp;{{ exam.stopTime }}</p><br>
                                  <p>测试时间&nbsp;&nbsp;&nbsp;&nbsp;{{ exam.totalTime }}分钟</p><br>
                                  <p>有效分数&nbsp;&nbsp;&nbsp;&nbsp;{{ exam.maxScore?exam.maxScore:0 }}.00/{{ exam.totalScore }}.0</p><br>
                                  <p>有效次数&nbsp;&nbsp;&nbsp;&nbsp;{{ exam.number?exam.number:0 }}/3</p><br>
                                  <p v-if="exam.scoreManageList">有效测验成绩：</p>
                                  <el-table
                                    v-if="exam.scoreManageList"
                                    :data="exam.scoreManageList"
                                    border
                                    style="width: 100%;text-align:center;">
                                    <el-table-column prop="number" label="次数" align="center" width="80"/>
                                    <el-table-column prop="gmtCreate" label="时间" align="center">
                                      <template slot-scope="scope">
                                        {{ scope.row.gmtCreate }}
                                      </template>
                                    </el-table-column>
                                    <el-table-column prop="examScore" align="center" width="120" label="得分">
                                      <template slot-scope="scope">
                                        <p v-if="scope.row.examScore === exam.maxScore" style="color:red;">{{ scope.row.examScore }}分（最终）</p>
                                        <p v-else >{{ scope.row.examScore }}分</p>
                                      </template>
                                    </el-table-column>
                                    <el-table-column align="center" width="120" label="操作">
                                      <template slot-scope="scope">
                                        <el-button type="success" size="mini" @click="goAnalysis(exam.id, scope.row.number)">查看</el-button>
                                      </template>
                                    </el-table-column>
                                  </el-table>
                                </div>
                              </el-collapse-item>
                            </el-collapse>
                            <br>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
              </article>
              <!-- /单元测试 结束 -->
              <!-- 课程考试 开始 -->
              <article v-if="active === 3" class="ml10 mr10">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>考试</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 课程章节目录 -->
                          <li v-for="(exam, index) in examList" :key="index" class="lh-menu-stair">
                            <el-collapse>
                              <el-collapse-item>
                                <template slot="title">
                                  <!-- <span style="font-size:20px;" >
                                    {{ exam.title }}&nbsp;&nbsp;
                                  </span> -->
                                  <span class="fl"><b style="font-size:15px;">{{ exam.title }}</b>&nbsp;&nbsp;<font class="fsize15 c-999 ml5">截止时间: {{ exam.stopTime }}</font></span>
                                  <span v-if="exam.number != 0" class="fl"><font class="fsize15 c-999 ml5">&nbsp;&nbsp;&nbsp;&nbsp;考试成绩: {{ exam.maxScore }}</font></span>
                                  <el-button v-if="exam.number == 1" type="info" plain round style="float:right;margin: 5px 0px;" @click.stop="goAnalysis(exam.id, exam.number)">查看解析</el-button>
                                  <el-button v-else type="info" plain round style="float:right;margin: 5px 0px;" @click.stop="goExam(exam.id)">前往测试</el-button>
                                </template>
                                <div>
                                  <p>截止日期&nbsp;&nbsp;&nbsp;&nbsp;{{ exam.stopTime }}</p><br>
                                  <p>考试时间&nbsp;&nbsp;&nbsp;&nbsp;{{ exam.totalTime }}分钟</p><br>
                                  <p>有效分数&nbsp;&nbsp;&nbsp;&nbsp;{{ exam.maxScore?exam.maxScore:0 }}.00/{{ exam.totalScore }}.0</p><br>
                                  <p>有效次数&nbsp;&nbsp;&nbsp;&nbsp;{{ exam.number?exam.number:0 }}/1</p>
                                </div>
                              </el-collapse-item>
                            </el-collapse>
                            <br>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
              </article>
              <!-- /课程考试 结束 -->
              <!-- 评论区开始 -->
              <article v-if="active === 4" class="ml10 mr10">
                <div style="display:inline-block;margin:0px;padding:0px;">
                  <span style="color:#FF6633;font-size:45px">{{ avg }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <div style="display:inline-block;margin:0px;padding:0px;">
                    <el-rate
                      v-model="avg"
                      :colors="colors"
                      disabled/>
                    <font class="fsize12 c-999 ml5">共 {{ count }} 条评价 </font>
                  </div>
                </div>
                <div>
                  <section class="lh-bj-list pr mt20 replyhtml">
                    <ul>
                      <li class="unBr">
                        <aside class="noter-pic">
                          <img width="50" height="50" class="picImg" src="~/assets/img/avatar-boy.gif">
                          <el-button v-if="flag" size="mini" @click="toLogin">登录</el-button>
                        </aside>
                        <div class="of">
                          <section class="n-reply-wrap">
                            <fieldset>
                              <el-input id="commentContent" :disabled="disabled" v-model="comment.content" type="textarea" placeholder="请先登录后发表评论"/>
                            </fieldset>
                            <p class="of mt5 tar pl10 pr10">
                              <span class="fl "><tt class="c-red commentContentmeg" style="display: none;"/></span>
                              <input type="button" value="发表评论" @click="dialogVisible = true">
                            </p>
                          </section>
                        </div>
                      </li>
                    </ul>
                    <div>
                      <section id="c-i-tabTitle" class="c-tab-title">
                        <a :class="searchObj.type == 1 ? 'current':''" title="按热度排序" @click="sort(1)">按热度排序</a>
                        <a :class="searchObj.type == 2 ? 'current':''" title="按时间排序" @click="sort(2)">按时间排序</a>
                      </section>
                    </div>
                  </section>
                  <section class="question-list lh-bj-list pr">
                    <ul class="pr10">
                      <li v-for="(comment,index) in commentList" :key="index">
                        <aside class="noter-pic">
                          <img :src="comment.avatar" width="50" height="50" class="picImg">
                        </aside>
                        <div class="of">
                          <span class="fl">
                            {{ comment.nickname }} &nbsp;&nbsp;
                            <el-rate
                              v-model="comment.score"
                              :colors="colors"
                              style="text-align:right;display:inline-block;"
                              disabled/>
                          </span>
                        </div>
                        <div class="noter-txt mt5">
                          <span>{{ comment.content }}</span>
                          <div style="text-align:right;display:inline-block;">
                            <tt title="赞一下" class="noter-zan vam ml5 f-fM" @click="supportNum(comment.id)">
                              <em class="icon18">&nbsp;</em><span class="addPraise23_3 praiseCount">{{ comment.supportNum }}</span>
                            </tt>
                          </div>
                        </div>
                        <div class="of mt5">
                          <span class="fr"><font class="fsize12 c-999 ml5">{{ comment.gmtCreate }}</font></span>
                        </div>
                      </li>
                    </ul>
                  </section>
                </div>
                <el-pagination
                  :current-page="page"
                  :page-size="limit"
                  :total="total"
                  background
                  style="padding: 0;margin:0px;text-align: center;"
                  layout="prev,pager, next"
                  @current-change="getComentList"/>
              </article>
              <!-- /评论区 结束 -->
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <!-- 主讲讲师 开始-->
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a :href="'/teacher/'+course.teacherId" target="_blank">
                        <img :src="course.avatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a :href="'/teacher/'+course.teacherId" class="c-333 fsize16 fl" target="_blank">{{ course.teacherName }}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ course.intro }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
            <!-- /主讲讲师 结束 -->
          </div>
        </aside>
        <div class="clear"/>
      </div>
    </section>
    <!-- /课程详情 结束 -->
    <!-- 对话框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="请给该课程评分"
      width="30%">
      <div class="block" style="text-align:center;">
        <el-rate
          v-model="comment.score" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addComment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import courseApi from '~/api/course'
import cookie from 'js-cookie'
import orderApi from '~/api/order'
import collectApi from '~/api/collection'
import commentApi from '~/api/comment'
import examApi from '~/api/exam'

export default {
  data() {
    return {
      status: false, // 是否已购买
      isCollect: false, // 是否已收藏
      flag: true, // 登录状态
      disabled: true, // 输入框禁用
      dialogVisible: false, // 对话框
      page: 1,
      limit: 10,
      total: 0,
      avg: 0, // 平均评价
      count: 0, // 总评价数
      colors: ['#FF6633', '#FF6633', '#FF6633'],
      commentList: [], // 评论列表
      examList: [], // 考试列表
      active: 1,
      searchObj: {
        type: 1,
        courseId: ''
      },
      comment: {
        score: null
      }
    }
  },
  // 同步请求,
  async asyncData(page) {
    const response = await courseApi.getCourseInfoById(page.route.params.id)
    return {
      course: response.data.course,
      chapterList: response.data.chapterVoList
    }
  },
  created() {
    // 如果未登录，则isBuy=false
    // 如果已登录，则判断是否已购买
    var token = cookie.get('xueliedu_jwt_token')
    if (token) {
      // 1. 发送请求, 判断课程是否需要购买
      orderApi.getCourseStatusById(this.course.id).then(response => {
        this.status = response.data.status
      })
      // 2. 发送请求, 判断当前用户是否收藏了该课程
      collectApi.isCollection(this.course.id).then(response => {
        this.isCollect = response.data.isCollect
      })
      // 3. 设置评论属性
      this.disabled = false
      this.flag = false
    }
  },
  methods: {
    // 创建订单
    createOrder() {
      var token = cookie.get('xueliedu_jwt_token')
      if (!token) {
        this.$message({
          type: 'warning',
          message: '您必须登陆, 才能购买该课程'
        })
        // 路由到登录页面
        this.$router.push({
          name: 'login'
        })
      } else {
        orderApi.addOrder(this.course.id).then(response => {
          this.$router.push({ path: '/order/' + response.data.orderId })
        })
      }
    },
    collection(courseId) {
      var token = cookie.get('xueliedu_jwt_token')
      if (!token) {
        this.$message({
          type: 'warning',
          message: '您必须登陆, 才能收藏该课程'
        })
        // 路由到登录页面
        this.$router.push({
          name: 'login'
        })
      } else {
        if (this.isCollect) {
        // 调用取消收藏
          this.removeCollect(courseId)
        } else {
        // 调用收藏
          this.addCollect(courseId)
        }
      }
    },
    // 收藏课程
    addCollect(courseId) {
      collectApi.addCollection(courseId).then(response => {
        // 1. 收藏成功, 提示信息
        this.$message({
          type: 'success',
          message: '已成功藏课程'
        })
        // 2. 设置收藏状态
        this.isCollect = true
        // 3. 刷新页面
        history.go(0)
      })
    },
    // 取消收藏
    removeCollect(courseId) {
      collectApi.cancelCourseCollection(courseId).then(response => {
        // 1. 取消收藏, 提示信息
        this.$message({
          type: 'success',
          message: '已取消收藏'
        })
        // 2. 设置收藏状态
        this.isCollect = false
        // 3. 刷新页面
        history.go(0)
      })
    },
    changeActive(value) {
      this.active = Number(value)
      if (this.active === 2) { // 获取单元测试列表
        this.getExamList(this.course.id, 1)
      }
      if (this.active === 3) { // 获取考试列表
        this.getExamList(this.course.id, 2)
      }
      if (this.active === 4) {
        this.getTotalComment() // 获取总评论
        this.getComentList() // 获取评论列表
      }
    },
    // 获取考试列表
    getExamList(id, type) {
      examApi.select(id, type).then(response => {
        this.examList = response.data.examList
      })
    },
    // 获取总评价数和平均评分
    getTotalComment() {
      commentApi.select(this.course.id).then(response => {
        this.avg = response.data.avg
        this.count = response.data.count
      })
    },
    // 获取评论列表
    getComentList(page = 1) {
      this.page = page
      this.searchObj.courseId = this.course.id
      commentApi.pageList(this.page, this.limit, this.searchObj).then(response => {
        this.commentList = response.data.records
        this.total = response.data.total
      })
    },
    toLogin() {
      this.$router.push({
        path: '/login'
      })
    },
    // 添加评论
    addComment() {
      // 1. 判断用户是否登录
      if (!cookie.get('xueliedu_jwt_token')) {
        this.$message({
          type: 'warning',
          message: '登录才能评论哦o(╥﹏╥)o'
        })
        this.dialogVisible = false
      } else {
        // 1. 设置评论讲师和课程
        this.comment.courseId = this.course.id
        this.comment.teacherId = this.course.teacherId
        // 2. 发送请求
        commentApi.edit(this.comment).then(response => {
          this.$message({
            type: 'success',
            message: '成功'
          })
          this.dialogVisible = false
          this.comment = {}
          // TODO 刷新评论列表
          this.getComentList()
        })
      }
    },
    // 点赞
    supportNum(id) {
      // 1. 判断用户是否登录
      if (!cookie.get('xueliedu_jwt_token')) {
        this.$message({
          type: 'warning',
          message: '登录才能点赞哦o(╥﹏╥)o'
        })
      } else {
        commentApi.update(id).then(response => {
          // 1. 刷新
          this.getComentList()
        })
      }
    },
    // 按照type进行排序
    sort(value) {
      this.searchObj.type = Number(value)
      this.getComentList()
    },
    // 点击播放
    toPlayer(videoSourceId) {
      // 1. 判断用户是否登陆,
      if (!cookie.get('xueliedu_jwt_token')) {
        this.$message({
          message: '您好, 请先登录o(╥﹏╥)o',
          type: 'warning'
        })
        this.$router.push({ path: '/login' })
      } else if (this.course.price === 0 || this.status) {
        if (!videoSourceId) {
          this.$message({
            message: '还未给章节添加视频',
            type: 'info'
          })
        } else {
          // let { href } =
        // 跳转到新的页面,
          const { href } = this.$router.resolve({
            path: '/player/' + videoSourceId // 这里写的是要跳转的路由地址
          // query: { goodsId: "1111" } // 这里写的是页面参数
          })
          window.open(href, '_blank') // _blank表示新开一个窗口
        }
      } else {
        // 没登录, 需要付费, 则提示需要购买课程
        this.$message({
          type: 'warning',
          message: '您好, 该课程付费观看, 请先购买(#^.^#)'
        })
      }
    },
    /**
     * '/player/'+video.videoSourceId
     */
    goExam(id) {
      if (!cookie.get('xueliedu_jwt_token')) {
        this.$message({
          message: '您好, 请先登录o(╥﹏╥)o',
          type: 'warning'
        })
        this.$router.push({ path: '/login' })
      } else {
        // 路由到考试页面
        this.$router.push({
          path: '/exam/' + id
        })
      }
    },
    // 去考试解析页面
    goAnalysis(id, number) {
      if (!cookie.get('xueliedu_jwt_token')) {
        this.$message({
          message: '您好, 请先登录o(╥﹏╥)o',
          type: 'warning'
        })
        this.$router.push({ path: '/login' })
      } else {
        // 路由到考试页面
        this.$router.push({
          path: '/analysis/' + id,
          query: { number }
        })
      }
    }
  }
}
</script>
<!-- 还原被重置的样式 -->
<style>
.course-txt-body ol, .course-txt-body ul{
    padding-left: 40px;
    margin: 16px 0;
}
.course-txt-body ol li{
    list-style: decimal;
}
.course-txt-body ul li{
    list-style: disc;
}
</style>
