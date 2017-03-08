<template>
<div id="survey">
  <span class="dt-title">Survey Description</span>
  <el-form ref="form" :model="form" label-width="80px" label-position="center">
    <el-form-item label="Survey ID">
      <el-input v-model="form.SurveyID" :disabled="true"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="12">
          <el-form-item label="DataType">
            <el-select v-model="form.DataType" placeholder="Data Type">
              <el-option v-for="item in dataTypeOptions" :label="item"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="SurveyType">
          <el-select v-model="form.SurveyType" placeholder="Survey Type">
            <el-option v-for="item in surveyTypeOptions"
                       :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
          <el-form-item label="MonthStart">
            <el-select v-model="form.MonthStart" placeholder="Month Start">
              <el-option v-for="item in monthOptions"
                         :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="MonthFinish">
          <el-select v-model="form.MonthFinish" placeholder="Month Finish">
            <el-option v-for="item in monthOptions"
                       :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
          <el-form-item label="YearStart">
            <el-input v-model="form.YearStart"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="YearFinish">
          <el-input v-model="form.YearFinish"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Note">
      <el-input type="textarea" v-model="form.Note2"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onNext">Next</el-button>
      <el-button @click="onSave">Save</el-button>
      <el-button @click="onCancel">Cancel</el-button>
      <el-button @click="onAdd">Add Survey</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import detailData from '../static/detailData.js'
import api from '../api.js'

export default {
  name: 'app',
  props: ['tree', 'idPath', 'nodeID', 'buff'],
  data() {
    return {
      form: {
        SurveyID: -1,                // survey id, 自动生成的随机值，从数据库获取
        BasicSourcesReportID: -1,   //  get from father
        DataType: '',
        SurveyType: '',
        MonthStart: '',
        MonthFinish: '',
        YearStart: '',
        YearFinish: '',
        Note2: ''
      },
      dataTypeOptions: detailData.surveyDetail.dataTypeOptions,
      surveyTypeOptions: detailData.surveyDetail.surveyTypeOptions,
      monthOptions: detailData.surveyDetail.monthOptions
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
      api.add('Survey Description', this.form, that)
    },
    onMenu() {
      this.$router.push('/home')
    },
    //  回退上一节点，删除本节点
    onCancel() {
      var curNode = this.tree.currentNode.node
      var parent = curNode.parent
      var len = parent.childNodes.length
      var that = this
      setTimeout(function() {
        that.tree.currentNode.$parent.handleClick()
      }, 0)
      curNode.store.remove(curNode.data)
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
    },
    updateData() {
      if (this.buff.S[this.nodeID] !== undefined) {
        this.form = this.buff.S[this.nodeID]
      } else {
        this.form = {
          SurveyID: this.idPath[1], BasicSourcesReportID: this.idPath[0], DataType: '',
          SurveyType: '', MonthStart: '', MonthFinish: '',
          YearStart: '', YearFinish: '', Note2: ''
        }
      }
    }
  },
  created: function() {
    this.updateData()
  },
  beforeDestroy: function() {
    this.$emit('getBuffer', 'S', this.nodeID, this.form)
  },
  watch: {
    nodeID: function(val, oldVal) {
      this.$emit('getBuffer', 'S', oldVal, this.form)
      this.updateData()
    }
  }
}
</script>
