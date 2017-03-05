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
          <el-input v-model="form.species"></el-input>
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
          <el-input placeholder="Symptoms" v-model="form.diagnosticSymptoms"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="10px">
          <el-input placeholder="Blood" v-model="form.diagnosticBlood"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="10px">
          <el-input placeholder="Skin" v-model="form.diagnosticSkin"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="10px">
          <el-input placeholder="Stool" v-model="form.diagnosticStool"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Num_samples">
          <el-input v-model="form.numSamples"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Num_specimen">
          <el-input v-model="form.numSpecimen"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="AgeLower">
          <el-input v-model="form.ageLower"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="AgeUpper">
          <el-input v-model="form.ageUpper"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_examine" v-model="form.numExamine"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_positive" v-model="form.numPositive"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive" :disabled="true" v-model="form.percentPositive"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_examine_male" v-model="form.numExamineMale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_positive_male" v-model="form.numPositiveMale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive_male" :disabled="true" v-model="form.percentPositiveMale"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_examine_female" v-model="form.numExamineFemale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Num_positive_female" v-model="form.numPositiveFemale"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label-width="10px">
          <el-input placeholder="Percent_positive_female" :disabled="true" v-model="form.percentPositiveFemale"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Note">
      <el-input v-model="form.note4"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onNext">Next</el-button>
      <el-button @click="onSave">Save</el-button>
      <el-button @click="onMenu">Menu</el-button>
      <el-button @click="onAdd">Add Disease</el-button>
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
        id: 2333,
        species: '',
        diagnosticSymptoms: '',
        diagnosticBlood: '',
        diagnosticSkin: '',
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
