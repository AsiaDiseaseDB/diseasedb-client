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
            <el-input v-model="form.yearStart"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="YearFinish">
          <el-input v-model="form.yearFinish"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Note">
      <el-input type="textarea" v-model="form.note2"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onNext">Next</el-button>
      <el-button @click="onSave">Save</el-button>
      <el-button @click="onMenu">Menu</el-button>
      <el-button @click="onAdd">Add Survey</el-button>
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
  },
  computed: {
    id: {
      get() {
        return this.$store.state.treeID
      },
      set(v) {
        this.$store.commit('updateTreeID', v)
      }
    }
  },
  methods: {
    onNext() {
      //  TODO: 从服务器端取回ID进行替换
      var nextId = parseInt(300 + Math.random() * 100)
      var curNode = this.tree.currentNode.node
      curNode.store.append({
        id:this.id++,
        label:'Location ' + nextId,
        children:[],
        dataID: nextId
      }, curNode.data)
      var that = this
      var len = curNode.childNodes.length
      setTimeout(function() {
        that.tree.currentNode.$children[len].handleClick()
      }, 0)
    },
    onSave() {
      let that = this
      setTimeout(function() {
        that.$notify({
            title: '保存成功',
            message: '提交了一条Survey',
            type: 'success'
        })
      }, 2000)
    },
    onMenu() {
      this.$router.push('/home')
    },
    onAdd() {
      //  TODO: 从服务器端取回ID进行替换
      var nextId = parseInt(200 + Math.random() * 100)
      var curNode = this.tree.currentNode.node
      var parent = curNode.parent
      parent.store.append({
        id:this.id++,
        label:'Survey ' + nextId,
        children:[],
        dataID: nextId
      }, parent.data)
      var len = parent.childNodes.length
      var that = this
      setTimeout(function() {
        that.tree.currentNode.$parent.$children[len].handleClick()
      }, 0)
    }
  }
}
</script>
