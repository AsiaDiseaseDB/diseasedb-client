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
          <el-input v-model="form.ADM1"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="ADM2">
          <el-input v-model="form.ADM2"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="ADM3">
          <el-input v-model="form.ADM3"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="PointName">
          <el-input v-model="form.pointName"></el-input>
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
          <el-input v-model="form.latitude"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Longitude">
          <el-input v-model="form.longitude"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="note3">
      <el-input v-model="form.note3"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onNext">Next</el-button>
      <el-button @click="onSave">Save</el-button>
      <el-button @click="onMenu">Menu</el-button>
      <el-button @click="onAdd">Add Location</el-button>
    </el-form-item>
  </el-form>
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
        id: this.id++,
        label:'Disease ' + nextId,
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
            message: '提交了一条Location',
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
        label:'Location ' + nextId,
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
