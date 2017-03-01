<template>
<div id="location">
  <span class="dt-title">Location Information</span>
  <el-form ref="form" :model="form" label-width="80px" label-position="center">
    <el-form-item label="Location ID">
      <el-input v-model="form.id" :disabled="true"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="ADM1">
          <el-input></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="ADM2">
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="ADM3">
          <el-input></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="PointName">
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="PointType">
          <el-select v-model="form.pointType" placeholder="Point Type">
            <el-option v-for="item in form.pointTypeOptions" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="GeoRef">
          <el-select v-model="form.grSource" placeholder="Point Type">
            <el-option v-for="item in form.grSourceOptions" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Latitude">
          <el-input></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Longitude">
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="note3">
      <el-input></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import detailData from '../static/detailData.js'

export default {
  name: 'app',
  data() {
    return {
      form: {
        id: 2333,
        ADM1: '',
        ADM2: '',
        ADM3: '',
        pointName: '',
        pointType: '',
        latitude: '',
        longitude: '',
        grSource: '',
        note3: '',
        grSourceOptions: detailData.locationDetail.grSourceOptions,
        pointTypeOptions: detailData.locationDetail.pointTypeOptions
      }
    }
  }
}
</script>
