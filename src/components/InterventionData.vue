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
          <el-input placeholder="Frequency" v-model="form.FrequencyPerYear"></el-input>
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
          <el-input placeholder="Percent_positive" :disabled="true"
                    v-model="IPercentPositive"></el-input>
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
                    v-model="IPercentPositiveMale"></el-input>
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
                    v-model="form.INumPositiveFemale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive_female" :disabled="true"
                    v-model="IPercentPositiveFemale"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Note">
      <el-input v-model="form.Note5" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="onSave">Save</el-button>
      <el-button @click="onCancel">Cancel</el-button>
      <el-button @click="onAdd">Add Intervention</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import detailData from '../static/detailData.js'
import api from '../model/api.js'
import util from '../model/util.js'

export default {
  name: 'app',
  props: ['tree', 'idPath', 'nodeID', 'buff'],
  data() {
    return {
      form: {
        InterventionID: -1,
        Group: '',
        MonthsAfterBaseline: '',
        Drug: '',
        FrequencyPerYear: '',
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
    },
    IPercentPositive: function() {
      if (this.form.INumPositive == '' || this.form.INumExamine == '')
        return ''
      return parseInt(this.form.INumPositive) / parseInt(this.form.INumExamine)
    },
    IPercentPositiveMale: function() {
      if (this.form.INumPositiveMale == '' || this.form.INumExamineMale == '')
        return ''
      return parseInt(this.form.INumPositiveMale) / parseInt(this.form.INumExamineMale)
    },
    IPercentPositiveFemale: function() {
      if (this.form.INumPositiveFemale == '' || this.form.INumExamineFemale == '')
        return ''
      return parseInt(this.form.INumPositiveFemale) / parseInt(this.form.INumExamineFemale)
    }
  },
  methods: {
    onSave() {
      let that = this
      api.add('Intervention Data', this.form, that)
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
      api.getId('Intervention Data')
        .then((res) => {
          var parent = this.tree.currentNode.$parent
          util.appendNode.call(this, parent, res.data.id, 'Intervention')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    initForm() {
      this.form = {
        InterventionID: this.idPath[4],
        Group: '', MonthsAfterBaseline: '', Drug: '',
        FrequencyPerYear: '', PeriodMonths: '', Coverage: '',
        OtherMethod: '', Note5: '',
        INumExamine: '', INumPositive: '', IPercentPositive: '',
        INumExamineMale: '', INumPositiveMale: '', IPercentPositiveMale: '',
        INumExamineFemale: '', INumPositiveFemale: '', IPercentPositiveFemale: '',
        DiseaseDataDiseaseID: this.idPath[3],
        DiseaseDataLocationInformationLocationID1: this.idPath[2],
        DiseaseDataLReportID: this.idPath[0],
        DiseaseDataLocationInformationSurveyDescriptionSurveyID: this.idPath[1]
      }
    },
    updateData() {
      if (this.buff.I[this.nodeID] !== undefined) {
        this.form = this.buff.I[this.nodeID]
      } else {
        api.getIdContent(this.nodeID, 'Intervention Data')
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
    this.$emit('getBuffer', 'I', this.nodeID, this.form)
  },
  watch: {
    nodeID: function(val, oldVal) {
      this.$emit('getBuffer', 'I', oldVal, this.form)
      this.updateData()
    },
    IPercentPositive: function(val, oldVal) {
      this.form.IPercentPositive = val
    },
    IPercentPositiveMale: function(val, oldVal) {
      this.form.IPercentPositiveMale = val
    },
    IPercentPositiveFemale: function(val, oldVal) {
      this.form.IPercentPositiveFemale = val
    }
  }
}
</script>
