<template>
<div id="basic_source">
  <span class="dt-title">Basic Source</span>
  <el-form ref="form" :model="form" label-width="80px" label-position="center">
    <el-form-item label="ReportID">
      <el-input v-model="form.id" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="Reporter">
      <el-select v-model="form.reporter" placeholder="Reporter">
        <el-option v-for="item in form.reporterOptions" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Disease">
      <el-select v-model="form.disease" placeholder="Disease">
        <el-option v-for="item in form.diseaseOptions" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Country">
      <el-select v-model="form.country" placeholder="Country">
        <el-option v-for="item in form.countryOptions" v-bind:label="item" v-bind:value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Document Category">
      <el-select v-model="form.documentCategory" placeholder="DocumentCategory">
        <el-option v-for="item in form.documentCategoryOptions" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Journal">
          <el-input v-model="form.journal"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Authors">
          <el-input v-model="form.authors"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Year of Pub">
          <el-input v-model="form.yearOfPub"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Volume">
          <el-input v-model="form.volume"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Issue">
          <el-input v-model="form.issue"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Page From">
          <el-input v-model="form.pageFrom"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Page To">
          <el-input v-model="form.pageTo"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Author Contact Needed">
      <el-select v-model="form.authorContactNeeded" placeholder="Author Contact Needed">
        <el-option v-for="item in form.contactNeededOptions" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Open Access">
          <el-select v-model="form.openAccess" placeholder="Open Access">
            <el-option v-for="item in form.openAccessOptions" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Checked">
          <el-select v-model="form.checked" placeholder="Checked">
            <el-option v-for="item in form.checkedOptions" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Note">
      <el-input type="textarea" :rows="2" placeholder="Note" v-model="form.note"></el-input>
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

export default {
  name: 'app',
  props: ['tree', 'idPath', 'nodeID'],
  data() {
    return {
      form: {
        id: 2,  //  自动生成的随机值，从数据库获取
        reporterOptions: detailData.basicDetail.reporterOptions,
        diseaseOptions: detailData.basicDetail.diseaseOptions,
        countryOptions: detailData.basicDetail.countryOptions,
        documentCategoryOptions: detailData.basicDetail.documentCategoryOptions,
        contactNeededOptions: ['No', 'Yes', 'Already'],
        openAccessOptions: ['No', 'Yes'],
        checkedOptions: ['No', 'Yes'],
        reporter: '',
        disease: '',
        country: '',
        documentCategory: '',
        journal: '',
        title: '',
        authors: '',
        yearOfPub: '',
        volume: '',
        issue: '',
        pageFrom: '',
        pageTo: '',
        authorContactNeeded: '',
        openAccess: '',
        checked: '',
        note: ''  //  note1
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
      var nextId = parseInt(200 + Math.random() * 100)
      var curNode = this.tree.currentNode.node
      curNode.store.append({id:this.id++, label:'Survey ' + nextId, children:[], dataID: nextId}, curNode.data)
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
            message: '提交了一条Report',
            type: 'success'
        })
      }, 2000)
    },
    onMenu() {
      this.$router.push('/home')
    },
    onAdd() {
      //  TODO: 从服务器端取回ID进行替换
      var nextId = parseInt(100 + Math.random() * 100)
      var root = this.tree.root
      // root.insertChild({data: {id:this.id++, label:'Report ID 123', children:[]}})
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
    },
    removeTest() {
      var curNode = this.tree.currentNode.node
      curNode.store.remove(curNode.data)
    }
  },
  watch: {
    nodeID: function(val, oldVal) {
      console.log(val)
      //  切换显示数据
    }
  }
}
</script>

<style>
body {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
