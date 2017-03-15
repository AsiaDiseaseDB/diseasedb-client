<template>
<div id="disease">
  <span class="dt-title">Disease Data</span>
  <el-form ref="form" :model="form" label-width="80px" label-position="center">
    <el-form-item label="Disease ID">
      <el-input v-model="form.DiseaseID" :disabled="true"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Species">
          <el-input v-model="form.Species" :disabled="uneditable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Information">
          <el-select v-model="form.LocationInformationLocationID" placeholder="Information"
                     :disabled="uneditable">
            <el-option v-for="item in informationOptions"
                       :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row id="diagonstic_info">
      <el-col :span="6">
        <el-form-item label-width="10px">
          <el-input placeholder="Symptoms" v-model="form.DiagnosticSymptoms" :disabled="uneditable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="10px">
          <el-input placeholder="Blood" v-model="form.DiagnosticBlood" :disabled="uneditable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="10px">
          <el-input placeholder="Skin" v-model="form.DiagnosticSkin" :disabled="uneditable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="10px">
          <el-input placeholder="Stool" v-model="form.DiagnosticStool" :disabled="uneditable"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Num_samples">
          <el-input v-model="form.NumSamples" :disabled="uneditable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Num_specimen">
          <el-input v-model="form.NumSpecimen" :disabled="uneditable"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="AgeLower">
          <el-input v-model="form.AgeLower" :disabled="uneditable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="AgeUpper">
          <el-input v-model="form.AgeUpper" :disabled="uneditable"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_examine"
                    v-model="form.NumExamine" :disabled="uneditable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_positive"
                    v-model="form.NumPositive" :disabled="uneditable"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive" :disabled="uneditable"
                    v-model="form.PercentPositive"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_examine_male" :disabled="uneditable"
                    v-model="form.NumExamineMale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_positive_male" :disabled="uneditable"
                    v-model="form.NumPositiveMale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive_male" :disabled="uneditable"
                    v-model="form.PercentPositiveMale"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_examine_female" :disabled="uneditable"
                    v-model="form.NumExamineFemale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_positive_female" :disabled="uneditable"
                    v-model="form.NumPositiveFemale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive_female" :disabled="uneditable"
                    v-model="form.PercentPositiveFemale"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Note">
      <el-input v-model="form.Note4" type="textarea" :disabled="uneditable"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onNext" v-show="editable">Next</el-button>
      <el-button @click="onSave" v-show="editable">Save</el-button>
      <el-button @click="onAdd" v-show="editable">Add Disease</el-button>
      <el-button @click="onCancel" v-show="editable">Cancel</el-button>
      <el-button @click="onDelete" v-show="editable" icon="delete">Delete</el-button>
    </el-form-item>
  </el-form>

  <el-dialog :title="dialogMsg" v-model="dialogVisible" size="small">
    <span>此操作将无法撤销</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="danger" @click="deleteConfrim">删 除</el-button>
    </span>
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
        DiseaseID: -1,
        Species: '',
        DiagnosticSymptoms: '',
        DiagnosticBlood: '',
        DiagnosticSkin: '',
        DiagnosticStool: '',
        NumSamples: '',
        NumSpecimen: '',
        AgeLower: '',
        AgeUpper: '',
        NumExamine: '',
        NumPositive: '',
        PercentPositive: '',
        NumExamineMale: '',
        NumPositiveMale: '',
        PercentPositiveMale: '',
        NumExamineFemale: '',
        NumPositiveFemale: '',
        PercentPositiveFemale: '',
        Note4: '',
        LocationInformationLocationID: '',
        LReportID: -1,
        LocationInformationSurveyDescriptionSurveyID: -1,
        LocationInformationLocationID1: -1
      },
      informationOptions: detailData.diseaseDetail.informationOptions,
      dialogVisible: false
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
      return '确认删除Disease ' + this.nodeID + '？'
    }
  },
  methods: {
    onNext() {
      api.getId('Intervention Data')
        .then((res) => {
          var cur = this.tree.currentNode
          util.appendNode.call(this, cur, res.data.id, 'Intervention')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onSave() {
      var msg = checker.checkForm(this.form, 'Disease Data')
      if (msg !== '') {
        this.$notify({
          title: '警告',
          message: msg,
          type: 'warning'
        })
        return
      }
      api.add('Disease Data', this.form, this)
    },
    onMenu() {
      this.$router.push('/home')
    },
    onCancel() {
      util.deleteNode(this.tree.currentNode)
    },
    onDelete() {
      this.dialogVisible = true
    },
    deleteConfrim() {
      this.dialogVisible = false
      api.delete.call(this, this.nodeID, 'Disease Data')
    },
    onAdd() {
      api.getId('Disease Data')
        .then((res) => {
          var parent = this.tree.currentNode.$parent
          util.appendNode.call(this, parent, res.data.id, 'Disease')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onChangeItem() {
      this.form.LReportID = this.idPath[0]
      this.form.LocationInformationSurveyDescriptionSurveyID = this.idPath[1]
      this.form.LocationInformationLocationID1 = this.idPath[2]
      this.form.DiseaseID = this.idPath[3]
    },
    initForm() {
      this.form = {
        DiseaseID: this.idPath[3],
        Species: '', DiagnosticSymptoms: '', DiagnosticBlood: '',
        DiagnosticSkin: '', DiagnosticStool: '', NumSamples: '',
        NumSpecimen: '', AgeLower: '', AgeUpper: '',
        NumExamine: '', NumPositive: '', PercentPositive: '',
        NumExamineMale: '', NumPositiveMale: '', PercentPositiveMale: '',
        NumExamineFemale: '', NumPositiveFemale: '', PercentPositiveFemale: '',
        Note4: '', LocationInformationLocationID: '',
        LReportID: this.idPath[0],
        LocationInformationSurveyDescriptionSurveyID: this.idPath[1],
        LocationInformationLocationID1: this.idPath[2]
      }
    },
    updateData() {
      if (this.buff.D[this.nodeID] !== undefined) {
        this.form = this.buff.D[this.nodeID]
      } else {
        api.getIdContent(this.nodeID, 'Disease Data')
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
    this.$emit('getBuffer', 'D', this.nodeID, this.form)
  },
  watch: {
    nodeID: function(val, oldVal) {
      this.$emit('getBuffer', 'D', oldVal, this.form)
      this.updateData()
      // this.onChangeItem()
    }
  }
}
</script>
