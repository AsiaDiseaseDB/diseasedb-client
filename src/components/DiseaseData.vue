<template>
<div id="disease">
  <span class="dt-title">Disease Data</span>
  <el-form ref="form" :model="form" label-width="80px" label-position="center">
    <el-form-item label="Disease ID">
      <el-input v-model="form.id" :disabled="true"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Species">
          <el-input></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Information">
          <el-select v-model="form.information" placeholder="Information">
            <el-option v-for="item in form.informationOptions" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row id="diagonstic_info">
      <el-col :span="6">
        <el-form-item label-width="10px">
          <el-input placeholder="Symptoms"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="10px">
          <el-input placeholder="Blood"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="10px">
          <el-input placeholder="Skin"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="10px">
          <el-input placeholder="Stool"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Num_samples">
          <el-input></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Num_specimen">
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="AgeLower">
          <el-input></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="AgeUpper">
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-row>
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
import detailData from '../static/detailData.js'

export default {
  name: 'app',
  data() {
    return {
      form: {
        id: 2333,
        species: '',
        diagnosticSymptoms: '',
        diagnosticBlood: '',
        diagnosticStool: '',
        numSamples: '',
        numSpecimen: '',
        ageLower: '',
        ageUpper: '',
        numExamine: '',
        numPositive: '',
        percentPositive: '',
        numExamineMale: '',
        numPositiveMale: '',
        percentPositiveMale: '',
        numExamineFemale: '',
        numPositiveFemale: '',
        percentPositiveFemale: '',
        note4: '',
        information: '',  //  TODO: 待确定
        informationOptions: detailData.diseaseDetail.informationOptions
      }
    }
  }
}
</script>
