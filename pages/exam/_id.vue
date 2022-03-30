<template>
  <div>
    <h1 style="text-align:center;font-size:30px;padding: 50px 0px 20px 0px;"><b>{{ exam.title }}</b></h1>
    <p style="text-align:center;font-size:20px;padding: 0px 0px 50px 0px;">试卷总分: {{ exam.totalScore }}分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;考试时间: {{ exam.totalTime + 1 }}分钟&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#f72a3a;font-weight: bold;">剩余时间: {{ timerCount2 }}:{{ timerCount1 }}</span></p>
    <!-- <div class="time">
      <button @click="reset">重新计时</button>
    </div> -->
    <div v-for="(titleItem,ind) in exam.titleItems" :key="ind">
      <el-row>
        <el-col :span="18" :offset="3">
          <h1 style="font-size:20px;"><b>{{ titleItem.name }}</b></h1>
          <el-card shadow="always">
            <div v-for="(questionItem,index) in titleItem.questionItems" :key="index">
              <div v-if="questionItem.questionType == 1" style="margin:0px;padding: 40px 0px 20px 40px;">
                <p style="font-size:15px;">{{ index + 1 }}.&nbsp;{{ questionItem.question }}（{{ questionItem.score }}分）</p>
                <el-radio-group v-model="answer.radio[index]">
                  <el-radio :label="answerA">A.&nbsp;{{ questionItem.answerA }}</el-radio>
                  <el-radio :label="answerB">B.&nbsp;{{ questionItem.answerB }}</el-radio>
                  <el-radio :label="answerC">C.&nbsp;{{ questionItem.answerC }}</el-radio>
                  <el-radio :label="answerD">D.&nbsp;{{ questionItem.answerD }}</el-radio>
                </el-radio-group>
              </div>
              <div v-if="questionItem.questionType == 2" style="margin:0px;padding: 40px 0px 20px 40px;">
                <p style="font-size:15px;">{{ index + 1 }}.&nbsp;{{ questionItem.question }}（{{ questionItem.score }}分）</p>
                <el-checkbox-group v-model="answer.multi[index]" >
                  <el-checkbox :label="answerA">A.&nbsp;{{ questionItem.answerA }}</el-checkbox>
                  <el-checkbox :label="answerB">B.&nbsp;{{ questionItem.answerB }}</el-checkbox>
                  <el-checkbox :label="answerC">C.&nbsp;{{ questionItem.answerC }}</el-checkbox>
                  <el-checkbox :label="answerD">D.&nbsp;{{ questionItem.answerD }}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div v-if="questionItem.questionType == 3" style="margin:0px;padding: 40px 0px 20px 40px;">
                <p style="font-size:15px;">{{ index + 1 }}.&nbsp;{{ questionItem.question }}（{{ questionItem.score }}分）</p>
                <el-radio-group v-model="answer.judgeAnswer[index]" >
                  <el-radio :label="1">T</el-radio>
                  <el-radio :label="2">F</el-radio>
                </el-radio-group>
              </div>
              <div v-if="questionItem.questionType == 4" style="margin:0px;padding: 40px 0px 20px 40px;">
                <p style="font-size:15px;">{{ index + 1 }}.&nbsp;{{ questionItem.question }}（{{ questionItem.score }}分）</p>
                <el-input
                  v-model="answer.fillAnswer[index]"
                  placeholder="请填在此处, 注意多个空, 按照 '、' 分隔！！！"
                  clearable/></div>
              <div v-if="questionItem.questionType == 5" style="margin:0px;padding: 40px 0px 0px 40px;">
                <p style="font-size:15px;">{{ index + 1 }}.&nbsp;{{ questionItem.question }}（{{ questionItem.score }}分）</p>
                <client-only>
                  <quill-editor
                    ref="editor"
                    v-model="answer.shortContent[index]"
                    @change="onEditorChange($event)"
                  />
                </client-only>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="text-align:center;padding:50px 0px;">
      <el-button type="primary" @click="commit">提交</el-button>
      <el-button style="text-align:center;" @click="goback">返回</el-button>
      <el-dialog
        :visible.sync="dialogVisible"
        :before-close="goback"
        :close-on-click-modal="false"
        title="考试结果"
        width="25%">
        <span>试卷得分:&nbsp;{{ scoreManage.examScore }}分</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="goback">返回课程</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import paperApi from '~/api/paper'
import examApi from '~/api/exam'
import answerApi from '~/api/answer'
export default {
  name: 'Time',
  data() {
    return {
      timeSeconds: 0,
      timeMinutes: 0,
      seconds: 59, // 秒
      // minutes: 1, // 分
      timer: null,
      exam: {},
      answer: {
        id: '',
        radio: [], // 保存考生所有选择题的选项
        multi: [[], [], [], [], []], // 保存多选题答案，使用是二维数组，不然保存不了
        judgeAnswer: [], // 保存所有判断题答案
        fillAnswer: [],
        shortContent: ['']
      },
      scoreManage: { // 提交后返回的得分信息

      },
      answerA: 'A',
      answerB: 'B',
      answerC: 'C',
      answerD: 'D',
      answerT: 'T',
      answerF: 'F',
      index: 0, // 全局索引
      dialogVisible: false // 对话框控制
    }
  },
  async asyncData(page) {
    const id = page.route.params.id
    const response = await paperApi.select(id)
    return {
      exam: response.data.exam,
      minutes: response.data.exam.totalTime
    }
  },
  computed: {
    timerCount1() {
      return this.timeSeconds < 10 ? '0' + this.timeSeconds : '' + this.timeSeconds
    },
    timerCount2() {
      return this.timeMinutes < 10 ? '0' + this.timeMinutes : '' + this.timeMinutes
    }
  },
  created() {
  },
  mounted() {
    if (sessionStorage.getItem('answered') !== 1) {
      this.timing()
    }
  },
  destroyed() {
    // 退出后清除计时器
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    commit() {
      // 1. TODO 将examid赋值到answer中
      this.answer.id = this.exam.examId
      console.log('answer:', this.answer)
      this.dialogVisible = true
      answerApi.edit(this.answer).then(response => {
        this.scoreManage = response.data.scoreManage
        console.log('scoreManage:', response.data.scoreManage)
        this.clear()
        // 1. 清除考试时间
        // this.$router.push({
        //   path: '/course/' + response.data.scoreManage.courseId
        // })
        this.dialogVisible = true
      })
    },
    goback() {
      // console.log('this.exam.examId:', this.exam.examId)
      // 1. 根据这个考试的ID查询课程id然后路由到课程哪里就好了。
      this.clear()
      // 2. 还需要清除倒计时
      examApi.getCourseIdById(this.exam.examId).then(response => {
        this.$router.push({
          path: '/course/' + response.data.courseId
        })
      })
    },
    onEditorChange({ editor, html, text }) {

    },
    multiChange(val) {
      // console.log('val:', val)
    },
    getChangeLabel(val) {
      // console.log('val:', val)
    },
    num(n) {
      return n < 10 ? '0' + n : '' + n
    },
    // 重新计时
    reset() {
      sessionStorage.removeItem('answered')
      window.location.reload()
      localStorage.removeItem('startTime1')
      localStorage.removeItem('startTime2')
      clearInterval(this.timer)
    },
    // 清除
    clear() {
      localStorage.removeItem('startTime1')
      localStorage.removeItem('startTime2')
      sessionStorage.setItem('answered', 1)
      clearInterval(this.timer)
    },
    // 倒计时
    timing() {
      const [startTime1, startTime2] = [localStorage.getItem('startTime1'), localStorage.getItem('startTime2')]
      const nowTime = new Date().getTime()
      if (startTime1) {
        const surplus = this.seconds - parseInt((nowTime - startTime1) / 1000)
        this.timeSeconds = surplus <= 0 ? 0 : surplus
      } else {
        this.timeSeconds = this.seconds
        localStorage.setItem('startTime1', nowTime) // 存储秒
      }
      if (startTime2) {
        this.timeMinutes = startTime2
      } else {
        this.timeMinutes = this.minutes
        localStorage.setItem('startTime2', this.minutes) // 存储分
      }
      this.timer = setInterval(() => {
        if (this.timeSeconds === 0 && this.timeMinutes !== 0 && this.timeMinutes > 0) {
          const nowTime = new Date().getTime()
          this.timeSeconds = this.seconds
          localStorage.setItem('startTime1', nowTime)
          this.timeMinutes--
          localStorage.setItem('startTime2', this.timeMinutes)
        } else if (this.timeMinutes === 0 && this.timeSeconds === 0) {
          this.timeSeconds = 0
          this.clear()
          alert('考试时间到')
        } else {
          this.timeSeconds--
        }
      }, 1000)
    }
  }
}
</script>
<style scoped>
  .time {
    color: #f72a3a;
    font-weight: bold;
    font-size: 26px;
  }
  .container {
    width: 60%;
    margin: 0 auto;
    padding: 50px 0;
  }
  .quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
  }
</style>
