<template>
<div id="intervention">
  <span class="dt-title">Intervention Data</span>
  <el-form ref="form" :model="form" label-width="80px" label-position="center">
    <el-form-item label="Intervention ID">
      <el-input v-model="form.id" :disabled="true"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Group">
          <el-select v-model="form.group" placeholder="group">
            <el-option v-for="item in form.groupOptions" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label-width="10px">
          <el-input placeholder="Months after baseline"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- TODO: Drug -->

    <el-row>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_examine"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_positive"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_examine_male"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_positive_male"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive_male" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_examine_female"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_positive_female"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive_female" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="note4">
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
        id: 2334,
        group: '',
        monthsAfterBaseline: '',
        drug: '',
        frequencyAfterYear: '',
        period: '',
        coverage: '',
        otherMethod: '',
        numExamine: '',
        numPositive: '',
        percentPositive: '',
        numExamineMale: '',
        numPositiveMale: '',
        percentPositiveMale: '',
        numExamineFemale: '',
        numPositiveFemale: '',
        percentPositiveFemale: '',
        note5: '',
        groupOptions: detailData.interventionDetail.groupOptions
      }
    }
  }
}
</script>
