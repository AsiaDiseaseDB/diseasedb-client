<template>
<div id="basic_source">
  <span class="dt-title">Basic Source</span>
  <el-form ref="form" :model="form" label-width="80px" label-position="center">
    <el-form-item label="ReportID">
      <el-input v-model="form.ReportID" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="Reporter">
      <el-select v-model="form.Reporter" placeholder="Reporter">
        <el-option v-for="item in reporterOptions" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Disease">
      <el-select v-model="form.Disease" placeholder="Disease">
        <el-option v-for="item in diseaseOptions" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Country">
      <el-select v-model="form.Country" placeholder="Country">
        <el-option v-for="item in countryOptions" v-bind:label="item" v-bind:value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Document Category">
      <el-select v-model="form.DocumentCategory" placeholder="DocumentCategory">
        <el-option v-for="item in documentCategoryOptions" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Journal">
          <el-input v-model="form.Journal"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Title">
          <el-input v-model="form.Title"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Authors">
          <el-input v-model="form.Authors"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Year of Pub">
          <el-input v-model="form.YearOfPub"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Volume">
          <el-input v-model="form.Volume"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Issue">
          <el-input v-model="form.Issue"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Page From">
          <el-input v-model="form.PageFrom"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Page To">
          <el-input v-model="form.PageTo"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Author Contact Needed">
      <el-select v-model="form.AuthorContactNeeded" placeholder="Author Contact Needed">
        <el-option v-for="item in contactNeededOptions" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Open Access">
          <el-select v-model="form.OpenAccess" placeholder="Open Access">
            <el-option v-for="item in openAccessOptions" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Checked">
          <el-select v-model="form.Checked" placeholder="Checked">
            <el-option v-for="item in checkedOptions" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Note">
      <el-input type="textarea" :rows="2" placeholder="Note" v-model="form.Note1"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onNext">Next</el-button>
      <el-button @click="onSave">Save</el-button>
      <el-button @click="onMenu">Menu</el-button>
      <el-button @click="onAdd">Add Report</el-button>
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
        ReportID: -1,  //  自动生成的随机值，从数据库获取
        Reporter: '',
        Disease: '',
        Country: '',
        DocumentCategory: '',
        Journal: '',
        Title: '',
        Authors: '',
        YearOfPub: '',
        Volume: '',
        Issue: '',
        PageFrom: '',
        PageTo: '',
        AuthorContactNeeded: '',
        OpenAccess: '',
        Checked: '',
        Note1: ''  //  note1
      },
      reporterOptions: detailData.basicDetail.reporterOptions,
      diseaseOptions: detailData.basicDetail.diseaseOptions,
      countryOptions: detailData.basicDetail.countryOptions,
      documentCategoryOptions: detailData.basicDetail.documentCategoryOptions,
      contactNeededOptions: ['No', 'Yes', 'Already'],
      openAccessOptions: ['No', 'Yes'],
      checkedOptions: ['No', 'Yes']
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
      var nextId = parseInt(200 + Math.random() * 100)
      var curNode = this.tree.currentNode.node
      curNode.store.append({
        id:this.id++,
        label:'Survey ' + nextId,
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
      var that = this
      api.add('Basic Sources', this.form, this)
    },
    onMenu() {
      this.$router.push('/home')
    },
    onAdd() {
      //  TODO: 从服务器端取回ID进行替换
      var nextId = parseInt(100 + Math.random() * 100)
      var root = this.tree.root
      root.store.append({
        id:this.id++,
        label:'Report ID ' + nextId,
        children:[],
        dataID: nextId
      })
      var len = this.tree.root.childNodes.length
      var that = this
      setTimeout(function() {
        that.tree.$children[len-1].handleClick()
      }, 0)
      this.updateData()
    },
    removeTest() {
      var curNode = this.tree.currentNode.node
      curNode.store.remove(curNode.data)
    },
    //  根据ReportID更新当前页面上的数据
    updateData(indexID) {
      // console.log(this.buff)
      if (this.buff.B[this.nodeID] !== undefined) {
        this.form = this.buff.B[this.nodeID]
      } else {
        this.form = {
          ReportID: this.nodeID, Reporter: '', Disease: '', Country: '',
          DocumentCategory: '', Journal: '', Title: '', Authors: '',
          YearOfPub: '', Volume: '', Issue: '', PageFrom: '',
          PageTo: '', AuthorContactNeeded: '', OpenAccess: '', Checked: '',
          Note1: ''
        }
      }
    }
  },
  created: function() {
    // console.log(this.nodeID)
    this.form.ReportID = this.nodeID
    this.$emit('getBuffer', 'B', this.nodeID, this.form)
    console.log(this.buff.B)
  },
  watch: {
    nodeID: function(val, oldVal) {
      this.$emit('getBuffer', 'B', oldVal, this.form)
      this.updateData()
    }
  }
}
</script>

<style>
body {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
