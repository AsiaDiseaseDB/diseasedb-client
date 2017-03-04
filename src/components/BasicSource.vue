<template>
<div id="basic_source">
  <span class="dt-title">Basic Source</span>
  <el-form ref="form" :model="form" label-width="80px" label-position="center">
    <el-form-item label="ReportID">
      <el-input v-model="form.id" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="Reporter">
      <el-select v-model="form.reporter" placeholder="Reporter">
        <el-option v-for="item in form.reporterOptions" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Disease">
      <el-select v-model="form.disease" placeholder="Disease">
        <el-option v-for="item in form.diseaseOptions" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Country">
      <el-select v-model="form.country" placeholder="Country">
        <el-option v-for="item in form.countryOptions" v-bind:label="item" v-bind:value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="DocumentCategory">
      <el-select v-model="form.documentCategory" placeholder="DocumentCategory">
        <el-option v-for="item in form.documentCategoryOptions" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Journal">
          <el-input></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Title">
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Authors">
          <el-input></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Year of Pub">
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Volume">
          <el-input></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Issue">
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Page From">
          <el-input></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Page To">
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Author contact needed">
      <el-input></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Open access">
          <el-input></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="checked">
          <el-input></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="note1">
      <el-input></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="removeTest">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import detailData from '../static/detailData.js'

export default {
  name: 'app',
  props: ['tree', 'idPath'],
  data() {
    return {
      form: {
        id: 1111,  //  自动生成的随机值，从数据库获取
        reporterOptions: detailData.basicDetail.reporterOptions,
        diseaseOptions: detailData.basicDetail.diseaseOptions,
        countryOptions: detailData.basicDetail.countryOptions,
        documentCategoryOptions: detailData.basicDetail.documentCategoryOptions,
        reporter: '',
        disease: '',
        country: '',
        documentCategory: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      console.log(this.form)
      console.log(this.idPath)
    },
    addTest() {
      // console.log(this.tree)
      var curNode = this.tree.currentNode.node
      curNode.store.append({id:this.id++, label:'1234', children:[], dataID: 1996}, curNode.data)
    },
    removeTest() {
      var curNode = this.tree.currentNode.node
      curNode.store.remove(curNode.data)
    }
  }
}
</script>
