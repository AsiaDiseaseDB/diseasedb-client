<template>
<div id="intervention">
  <span class="dt-title">Intervention Data</span>
  <el-form ref="form" :model="form" label-width="80px" label-position="center">
    <el-form-item label="Intervention ID">
      <el-input v-model="form.InterventionID" :disabled="true"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="8">
        <el-form-item label="Group">
          <el-select v-model="form.Group" placeholder="Group">
            <el-option v-for="item in groupOptions" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item label="Months">
          <el-input v-model="form.MonthsAfterBaseline"
                    placeholder="Months after baseline"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Drug">
          <el-input placeholder="Drug" v-model="form.Drug"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Frequency">
          <el-input placeholder="Frequency" v-model="form.FrequencyAfterYear"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Period">
          <el-input placeholder="Period" v-model="form.PeriodMonths"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Coverage">
          <el-input placeholder="Coverage" v-model="form.Coverage"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item label="Other Method">
        <el-input placeholder="Other Method" v-model="form.OtherMethod"></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_examine" v-model="form.INumExamine"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_positive" v-model="form.INumPositive"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive"
                    :disabled="true" v-model="form.IPercentPositive"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_examine_male" v-model="form.INumExamineMale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_positive_male" v-model="form.INumPositiveMale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive_male" :disabled="true"
                    v-model="form.IPercentPositiveMale"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_examine_female"
                    v-model="form.INumExamineFemale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_positive_female"
                    v-model="form.IPercentPositiveFemale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive_female"
                    :disabled="true" v-model="form.IPercentPositiveFemale"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Note">
      <el-input v-model="form.Note5" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="onSave">Save</el-button>
      <el-button @click="onMenu">Menu</el-button>
      <el-button @click="onAdd">Add Intervention</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import detailData from '../static/detailData.js'

export default {
  name: 'app',
  props: ['tree', 'idPath', 'nodeID'],
  data() {
    return {
      form: {
        InterventionID: -1,
        Group: '',
        MonthsAfterBaseline: '',
        Drug: '',
        FrequencyAfterYear: '',
        PeriodMonths: '',
        Coverage: '',
        OtherMethod: '',
        INumExamine: '',
        INumPositive: '',
        IPercentPositive: '',
        INumExamineMale: '',
        INumPositiveMale: '',
        IPercentPositiveMale: '',
        INumExamineFemale: '',
        INumPositiveFemale: '',
        IPercentPositiveFemale: '',
        Note5: '',
        DiseaseDataDiseaseID: -1,
        DiseaseDataLocationInformationLocationID1: -1,
        DiseaseDataLReportID: -1,
        DiseaseDataLocationInformationSurveyDescriptionSurveyID: -1
      },
      groupOptions: detailData.interventionDetail.groupOptions
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
    onSave() {
      let that = this
      setTimeout(function() {
        that.$notify({
            title: '保存成功',
            message: '提交了一条Disease',
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
        label:'Intervention ' + nextId,
        children:[],
        dataID: nextId
      }, parent.data)
      var len = parent.childNodes.length
      var that = this
      setTimeout(function() {
        that.tree.currentNode.$parent.$children[len].handleClick()
      }, 0)
    }
  },
  created: function() {
    this.form.DiseaseDataLReportID = this.idPath[0]
    this.form.DiseaseDataLocationInformationSurveyDescriptionSurveyID = this.idPath[1]
    this.form.DiseaseDataLocationInformationLocationID1 = this.idPath[2]
    this.form.DiseaseDataDiseaseID = this.idPath[3]
    this.form.InterventionID = this.idPath[4]
  },
  watch: {
    nodeID: function(val, oldVal) {
      // console.log(val)
      this.form.InterventionID = val
      this.form.DiseaseDataLReportID = this.idPath[0]
      this.form.DiseaseDataLocationInformationSurveyDescriptionSurveyID = this.idPath[1]
      this.form.DiseaseDataLocationInformationLocationID1 = this.idPath[2]
      this.form.DiseaseDataDiseaseID = this.idPath[3]
    }
  }
}
</script>
