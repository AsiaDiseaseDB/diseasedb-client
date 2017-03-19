<template>
<div id="survey">
  <span class="dt-title">Survey Description</span>
  <el-form ref="form" :model="form" label-width="80px" label-position="top">
    <el-form-item>
      <el-input v-model="form.SurveyID" :disabled="true"></el-input>
    </el-form-item>
    <el-row :gutter="10">
      <el-col :span="12">
          <el-form-item label="DataType">
            <el-select v-model="form.DataType" placeholder="Data Type" :disabled="uneditable">
              <el-option v-for="item in dataTypeOptions" :label="item"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="SurveyType">
          <el-select v-model="form.SurveyType" placeholder="Survey Type" :disabled="uneditable">
            <el-option v-for="item in surveyTypeOptions"
                       :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
          <el-form-item label="MonthStart">
            <el-select v-model="form.MonthStart" placeholder="Month Start" :disabled="uneditable">
              <el-option v-for="item in monthOptions"
                         :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="MonthFinish">
          <el-select v-model="form.MonthFinish" placeholder="Month Finish" :disabled="uneditable">
            <el-option v-for="item in monthOptions"
                       :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
          <el-form-item label="YearStart">
            <el-input v-model="form.YearStart" :disabled="uneditable"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="YearFinish">
          <el-input v-model="form.YearFinish" :disabled="uneditable"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Note">
      <el-input type="textarea" v-model="form.Note2" :disabled="uneditable"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button-group>
      <el-button type="primary" @click="onSave" v-show="editable">Save</el-button>
        <el-button @click="onNext" v-show="editable">Next</el-button>
        <el-button @click="onAdd" v-show="editable">Add Survey</el-button>
        <el-button @click="onCancel" v-show="editable">Cancel</el-button>
        <el-button @click="onDelete" v-show="editable" icon="delete">Delete</el-button>
      </el-button-group>
      <el-button-group id="survey-import-group">
        <el-button @click="onImport" v-show="editable" icon="upload2">Import</el-button>
      <el-button-group>
    </el-form-item>
  </el-form>

  <el-dialog :title="dialogMsg" v-model="dialogVisible" size="small">
    <span>此操作将无法撤销</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="danger" @click="deleteConfrim">删 除</el-button>
    </span>
  </el-dialog>

  <el-dialog id="survey-upload" title="Upload"
    v-model="dialogUploadVisible" size="small"
    :close-on-click-modal="false">
    <el-upload
        drag
        action="//localhost:3000/importtable"
        name="report"
        :show-file-list="showlist"
        :on-success="onUploadSuccess"
        :data="payload"
        mutiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只支持.xls/.xlsx格式</div>
    </el-upload>
  </el-dialog>
</div>
</template>

<script>
import detailData from '../static/detailData.js'
import api from '../model/api.js'
import util from '../model/util.js'
import checker from '../model/format-checker.js'

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
      monthOptions: detailData.surveyDetail.monthOptions,
      dialogVisible: false,
      //  upload dialog
      dialogUploadVisible: false,
      payload: null,
      showlist: false
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
    },
    uneditable: function() {
      return this.$store.state.opt === 'view'
    },
    editable: function() {
      return this.$store.state.opt !== 'view'
    },
    dialogMsg: function() {
      return '确认删除Survey ' + this.nodeID + '？'
    }
  },
  methods: {
    // upload
    onUploadSuccess (response, file, fileList) {
      console.log(response)
      if (!response.success) {
        this.dialogUploadVisible = false
        this.$alert('上传失败', '解析Excel时发生错误', {
          confirmButtonText: '确定',
          callback: action => {}
        })
      } else {
        this.dialogUploadVisible = false
        this.$notify({
          title: '上传成功',
          message: '批量导入了一系列Location',
          type: 'success'
        })
        this.$router.push('/home')
      }
      if (this.active++ > 4) this.active = 0
    },
    onNext() {
      api.checkModified(() => {
        api.getId('Location Information')
          .then((res) => {
            var cur = this.tree.currentNode
            util.appendNode.call(this, cur, res.data.id, 'Location')
          })
          .catch((err) => {
            console.log(err)
          })
      }, 'Survey Description', this)
    },
    onSave() {
      var msg = checker.checkForm(this.form, 'Survey Description')
      if (msg !== '') {
        // console.log(msg)
        this.$notify({
          title: '警告',
          message: msg,
          type: 'warning'
        })
        return
      }
      api.add('Survey Description', this.form, this)
    },
    onMenu() {
      this.$router.push('/home')
    },
    //  回退上一节点，删除本节点
    onCancel() {
      util.deleteNode(this.tree.currentNode)
    },
    onDelete() {
      this.dialogVisible = true
    },
    onImport () {
      this.dialogUploadVisible = true
      this.payload = {
        type: 'Survey Description',
        bid: this.idPath[0],
        sid: this.idPath[1]
      }
    },
    deleteConfrim() {
      this.dialogVisible = false
      api.delete.call(this, this.nodeID, 'Survey Description')
    },
    onAdd() {
      //  TODO: 从服务器端取回ID进行替换
      api.getId('Survey Description')
        .then((res) => {
          // var curNode = this.tree.currentNode.node
          var parent = this.tree.currentNode.$parent
          util.appendNode.call(this, parent, res.data.id, 'Survey')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    initForm() {
      this.form = {
        SurveyID: this.idPath[1], BasicSourcesReportID: this.idPath[0], DataType: '',
        SurveyType: '', MonthStart: '', MonthFinish: '',
        YearStart: '', YearFinish: '', Note2: ''
      }
    },
    updateData() {
      if (this.buff.S[this.nodeID] !== undefined) {
        this.form = this.buff.S[this.nodeID]
      } else {
        api.getIdContent(this.nodeID, 'Survey Description')
          .then((res) => {
            if (res.data.data == null) {
              this.initForm()
            } else {
              this.form = res.data.data
            }
          })
          .catch((err) => {
            this.initForm()
          })
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

<style>
#survey-upload {
  text-align: center;
}
#survey-import-group {
  margin-left: 15px;
}
</style>
