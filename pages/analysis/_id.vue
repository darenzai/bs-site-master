<template>
  <div>
    <h1 style="text-align:center;font-size:30px;padding: 50px 0px 20px 0px;"><b>{{ examAnalysis.title }}解析</b></h1>
    <p style="text-align:center;font-size:20px;padding: 0px 0px 50px 0px;">试卷得分: {{ examAnalysis.examScore }}.00/{{ examAnalysis.totalScore }}.00&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提交时间: {{ examAnalysis.gmtCreate.substring(0, 10) }}</p>
    <div v-for="(titleItem,index) in examAnalysis.titleItems" :key="index">
      <el-row>
        <el-col :span="18" :offset="3">
          <h1 style="font-size:20px;"><b>{{ titleItem.name }}</b></h1>
          <el-card shadow="always">
            <div v-for="(questionItem,index) in titleItem.questionItems" :key="index">
              <div v-if="questionItem.questionType == 1" style="margin:0px;padding: 40px 0px 10px 40px;">
                <p style="font-size:15px;">{{ index + 1 }}.&nbsp;{{ questionItem.question }}（{{ questionItem.score }}分）</p>
                <el-radio-group v-model="questionItem.userAnswer" >
                  <el-radio :label="answerA">A.&nbsp;{{ questionItem.answerA }}</el-radio>
                  <el-radio :label="answerB">B.&nbsp;{{ questionItem.answerB }}</el-radio>
                  <el-radio :label="answerC">C.&nbsp;{{ questionItem.answerC }}</el-radio>
                  <el-radio :label="answerD">D.&nbsp;{{ questionItem.answerD }}</el-radio>
                </el-radio-group>
                <div style="padding: 20px 20px 0px 0px;">
                  <p>标答:&nbsp;&nbsp;{{ questionItem.rightKey }}</p><br>
                  <p v-if="questionItem.userAnswer == questionItem.rightKey">结果:&nbsp;&nbsp; <el-button size="mini" type="success" plain>正确</el-button></p>
                  <p v-else>结果:&nbsp;&nbsp; <el-button size="mini" type="danger" plain>错误</el-button></p><br>
                  <p>得分:&nbsp;&nbsp;{{ questionItem.userScore }}分</p><br>
                  <p>难度:&nbsp;&nbsp;<el-rate
                    v-model="questionItem.level"
                    disabled
                    style="display:inline;"
                    text-color="#ff9900"/></p><br>
                  <p>解析:&nbsp;&nbsp;{{ questionItem.analysis }}</p>
                </div>
              </div>
              <div v-if="questionItem.questionType == 2" style="margin:0px;padding: 40px 0px 20px 40px;">
                <p style="font-size:15px;">{{ index + 1 }}.&nbsp;{{ questionItem.question }}（{{ questionItem.score }}分）</p>
                <el-checkbox-group v-model="questionItem.rightArray" >
                  <el-checkbox :label="answerA">A.&nbsp;{{ questionItem.answerA }}</el-checkbox>
                  <el-checkbox :label="answerB">B.&nbsp;{{ questionItem.answerB }}</el-checkbox>
                  <el-checkbox :label="answerC">C.&nbsp;{{ questionItem.answerC }}</el-checkbox>
                  <el-checkbox :label="answerD">D.&nbsp;{{ questionItem.answerD }}</el-checkbox>
                </el-checkbox-group>
                <div style="padding: 20px 20px 0px 0px;">
                  <p>标答:&nbsp;&nbsp;{{ questionItem.rightKey }}</p><br>
                  <p v-if="questionItem.userAnswer == questionItem.rightKey">结果:&nbsp;&nbsp; <el-button size="mini" type="success" plain>正确</el-button></p>
                  <p v-else>结果:&nbsp;&nbsp; <el-button size="mini" type="danger" plain>错误</el-button></p><br>
                  <p>得分:&nbsp;&nbsp;{{ questionItem.userScore }}分</p><br>
                  <p>难度:&nbsp;&nbsp;<el-rate
                    v-model="questionItem.level"
                    disabled
                    style="display:inline;"
                    text-color="#ff9900"/></p><br>
                  <p>解析:&nbsp;&nbsp;{{ questionItem.analysis }}</p>
                </div>
              </div>
              <div v-if="questionItem.questionType == 3" style="margin:0px;padding: 40px 0px 20px 40px;">
                <p style="font-size:15px;">{{ index + 1 }}.&nbsp;{{ questionItem.question }}（{{ questionItem.score }}分）</p>
                <el-radio-group v-model="questionItem.userAnswer" >
                  <el-radio label="1">T</el-radio>
                  <el-radio label="2">F</el-radio>
                </el-radio-group>
                <div style="padding: 20px 20px 0px 0px;">
                  <p>标答:&nbsp;&nbsp;{{ questionItem.answer == 1 ? 'T' : 'F' }}</p><br>
                  <p v-if="questionItem.userAnswer == questionItem.answer">结果:&nbsp;&nbsp; <el-button size="mini" type="success" plain>正确</el-button></p>
                  <p v-else>结果:&nbsp;&nbsp; <el-button size="mini" type="danger" plain>错误</el-button></p><br>
                  <p>得分:&nbsp;&nbsp;{{ questionItem.userScore }}分</p><br>
                  <p>难度:&nbsp;&nbsp;<el-rate
                    v-model="questionItem.level"
                    disabled
                    style="display:inline;"
                    text-color="#ff9900"/></p><br>
                  <p>解析:&nbsp;&nbsp;{{ questionItem.analysis }}</p>
                </div>
              </div>
              <div v-if="questionItem.questionType == 4" style="margin:0px;padding: 40px 0px 20px 40px;">
                <p style="font-size:15px;">{{ index + 1 }}.&nbsp;{{ questionItem.question }}（{{ questionItem.score }}分）</p>
                <el-tag
                  type="info"
                  style="width:100%;font-size:14px;"
                  v-html="questionItem.userAnswer"/>
                <div style="padding: 20px 20px 0px 0px;">
                  <p>标答:&nbsp;&nbsp;{{ questionItem.answer }}</p><br>
                  <p v-if="questionItem.userAnswer == questionItem.answer">结果:&nbsp;&nbsp; <el-button size="mini" type="success" plain>正确</el-button></p>
                  <p v-else>结果:&nbsp;&nbsp; <el-button size="mini" type="danger" plain>错误</el-button></p><br>
                  <p>得分:&nbsp;&nbsp;{{ questionItem.userScore }}分</p><br>
                  <p>难度:&nbsp;&nbsp;<el-rate
                    v-model="questionItem.level"
                    disabled
                    style="display:inline;"
                    text-color="#ff9900"/></p><br>
                  <p>解析:&nbsp;&nbsp;{{ questionItem.analysis?questionItem.analysis:'空' }}</p>
                </div>
              </div>
              <div v-if="questionItem.questionType == 5" style="margin:0px;padding: 40px 0px 0px 40px;">
                <p style="font-size:15px;">{{ index + 1 }}.&nbsp;{{ questionItem.question }}（{{ questionItem.score }}分）</p>
                <el-tag
                  type="info"
                  style="width:100%;font-size:14px;"
                  v-html="questionItem.userAnswer"/>
                <div style="padding: 20px 20px 0px 0px;">
                  <p>标答:&nbsp;&nbsp;{{ questionItem.answer }}</p><br>
                  <p v-if="questionItem.userAnswer == questionItem.answer">结果:&nbsp;&nbsp; <el-button size="mini" type="success" plain>正确</el-button></p>
                  <p v-else>结果:&nbsp;&nbsp; <el-button size="mini" type="danger" plain>错误</el-button></p><br>
                  <p>得分:&nbsp;&nbsp;{{ questionItem.userScore }}分</p><br>
                  <p>难度:&nbsp;&nbsp;<el-rate
                    v-model="questionItem.level"
                    disabled
                    style="display:inline;"
                    text-color="#ff9900"/></p><br>
                  <p>解析:&nbsp;&nbsp;{{ questionItem.analysis?questionItem.analysis:'空' }}</p>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="text-align:center;padding:50px 0px;">
      <el-button style="text-align:center;" @click="goback">返回</el-button>
    </div>
  </div>
</template>

<script>
import answerApi from '~/api/answer'
import examApi from '~/api/exam'
export default {
  data() {
    // 这里存数据
    return {
      answerA: 'A',
      answerB: 'B',
      answerC: 'C',
      answerD: 'D'
    }
  },
  async asyncData(page) {
    const examId = page.route.params.id // 试卷ID
    const number = page.route.query.number // 用户有效次数
    const response = await answerApi.select(examId, number)
    return {
      examAnalysis: response.data.examAnalysisVo
    }
  },
  // 方法
  methods: {
    goback() {
      // console.log('this.examAnalysis', this.examAnalysis)
      examApi.getCourseIdById(this.examAnalysis.id).then(response => {
        this.$router.push({
          path: '/course/' + response.data.courseId
        })
      })
    }
  }// 缓存keep-alive
}
</script>

<style scoped>
</style>
