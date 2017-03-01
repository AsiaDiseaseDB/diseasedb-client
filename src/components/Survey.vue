<template>
<div id="survey">
  <span class="dt-title">Survey Description</span>
  <el-form ref="form" :model="form" label-width="80px" label-position="center">
    <el-form-item label="Survey ID">
      <el-input v-model="form.id" :disabled="true"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="12">
          <el-form-item label="DataType">
            <el-select v-model="form.dataType" placeholder="Data Type">
              <el-option v-for="item in form.dataTypeOptions" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="SurveyType">
          <el-select v-model="form.surveyType" placeholder="Survey Type">
            <el-option v-for="item in form.surveyTypeOptions" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
          <el-form-item label="MonthStart">
            <el-select v-model="form.monthStart" placeholder="Month Start">
              <el-option v-for="item in form.monthOptions" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="MonthFinish">
          <el-select v-model="form.monthFinish" placeholder="Month Finish">
            <el-option v-for="item in form.monthOptions" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
          <el-form-item label="YearStart">
            <el-input></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="YearFinish">
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Note">
      <el-input></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import detailData from '../store/detailData.js'

export default {
  name: 'app',
  data() {
    return {
      form: {
        id: 1234,  // survey id, 自动生成的随机值，从数据库获取
        reportID: 1111,  //  get from father
        dataTypeOptions: detailData.surveyDetail.dataTypeOptions,
        surveyTypeOptions: detailData.surveyDetail.surveyTypeOptions,
        monthOptions: detailData.surveyDetail.monthOptions,
        dataType: '',
        surveyType: '',
        monthStart: '',
        monthFinish: '',
        yearStart: '',
        yearFinish: '',
        note2: ''
      }
    }
  }
}
</script>
