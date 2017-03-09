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
          <el-input v-model="form.Species"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Information">
          <el-select v-model="form.LocationInformationLocationID" placeholder="Information">
            <el-option v-for="item in informationOptions"
                       :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row id="diagonstic_info">
      <el-col :span="6">
        <el-form-item label-width="10px">
          <el-input placeholder="Symptoms" v-model="form.DiagnosticSymptoms"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="10px">
          <el-input placeholder="Blood" v-model="form.DiagnosticBlood"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="10px">
          <el-input placeholder="Skin" v-model="form.DiagnosticSkin"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="10px">
          <el-input placeholder="Stool" v-model="form.DiagnosticStool"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Num_samples">
          <el-input v-model="form.NumSamples"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Num_specimen">
          <el-input v-model="form.NumSpecimen"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="AgeLower">
          <el-input v-model="form.AgeLower"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="AgeUpper">
          <el-input v-model="form.AgeUpper"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_examine"
                    v-model="form.NumExamine"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_positive"
                    v-model="form.NumPositive"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive" :disabled="true"
                    v-model="PercentPositive"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_examine_male"
                    v-model="form.NumExamineMale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_positive_male"
                    v-model="form.NumPositiveMale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive_male" :disabled="true"
                    v-model="PercentPositiveMale"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_examine_female"
                    v-model="form.NumExamineFemale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_positive_female"
                    v-model="form.NumPositiveFemale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive_female" :disabled="true"
                    v-model="PercentPositiveFemale"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Note">
      <el-input v-model="form.Note4" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onNext">Next</el-button>
      <el-button @click="onSave">Save</el-button>
      <el-button @click="onCancel">Cancel</el-button>
      <el-button @click="onAdd">Add Disease</el-button>
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
      informationOptions: detailData.diseaseDetail.informationOptions
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
    PercentPositive: function() {
      if (this.form.NumPositive == '' || this.form.NumExamine == '')
        return ''
      return parseInt(this.form.NumPositive) / parseInt(this.form.NumExamine)
    },
    PercentPositiveMale: function() {
      if (this.form.NumPositiveMale == '' || this.form.NumExamineMale == '')
        return ''
      return parseInt(this.form.NumPositiveMale) / parseInt(this.form.NumExamineMale)
    },
    PercentPositiveFemale: function() {
      if (this.form.NumPositiveFemale == '' || this.form.NumExamineFemale == '')
        return ''
      return parseInt(this.form.NumPositiveFemale) / parseInt(this.form.NumExamineFemale)
    }
  },
  methods: {
    onNext() {
      //  TODO: 从服务器端取回ID进行替换
      var nextId = parseInt(300 + Math.random() * 100)
      var curNode = this.tree.currentNode.node
      curNode.store.append({
        id:this.id++,
        label:'Intervention ' + nextId,
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
      api.add('Disease Data', this.form, that)
    },
    onMenu() {
      this.$router.push('/home')
    },
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
        label:'Disease ' + nextId,
        children:[],
        dataID: nextId
      }, parent.data)
      var len = parent.childNodes.length
      var that = this
      setTimeout(function() {
        that.tree.currentNode.$parent.$children[len].handleClick()
      }, 0)
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
    },
    PercentPositive: function(val, oldVal) {
      this.form.PercentPositive = val
    },
    PercentPositiveMale: function(val, oldVal) {
      this.form.PercentPositiveMale = val
    },
    PercentPositiveFemale: function(val, oldVal) {
      this.form.PercentPositiveFemale = val
    }
  }
}
</script>
