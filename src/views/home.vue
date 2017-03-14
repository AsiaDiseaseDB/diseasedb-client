<template>
<div id="home">
  <div id="page-container">
    <h1>Home Page</h1>
    <el-row id="input_row" :gutter="10">
      <el-col v-bind:span="4">
        <el-input placeholder="Report ID" v-model="conditions.searchID"></el-input>
      </el-col>
      <el-col :span="4">
        <el-select v-model="conditions.dValue" placeholder="Disease" clearable>
          <el-option v-for="item in diseaseOptions" v-bind:label="item" v-bind:value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="conditions.cValue" placeholder="Country" clearable>
          <el-option v-for="item in countryOptions" v-bind:label="item" v-bind:value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-date-picker v-model="conditions.yValue" align="right" type="year" placeholder="Year">
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-select v-model="conditions.doubleClick" placeholder="Double Click" clearable>
          <el-option v-for="item in clickOptions" v-bind:label="item" v-bind:value="item"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row id="buttons" type="flex" justify="end" :gutter="10">
      <el-col :span="20" class="btn-container">
        <el-button-group>
          <el-button @click="onSearch" icon="search">Search</el-button>
          <el-button @click="onBatchExport" icon="share">Export</el-button>
          <el-button @click="onBatchInput" icon="upload2">Batch Input</el-button>
          <el-button @click="onView" icon="view">View</el-button>
          <el-button @click="onEdit" icon="edit">Edit</el-button>
          <el-button type="primary" @click="onNew" icon="plus">New</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-table id="result-table" :data="tableData" highlight-current-row align="center" height="350"
      @current-change="handleCurrentChange" @row-dblclick="doubleClickEvent"
      style="width: 100%" @selection-change="handleSelectionChange"
      v-loading="isLoading" element-loading-text="Searching">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column property="id" label="id" width="90"></el-table-column>
      <el-table-column property="title" label="Title" width="160"></el-table-column>
      <el-table-column property="author" label="Author" width="110"></el-table-column>
      <el-table-column property="disease" label="Disease" width="200"></el-table-column>
      <el-table-column property="reporter" label="Reporter" width="110"></el-table-column>
      <el-table-column property="time" label="Year of publish"></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import detailData from '../static/detailData.js'
import api from '../model/api.js'

export default {
  name: 'home',
  data() {
    return {
      //  search conditions
      conditions: {
        searchID: null,
        dValue: '',
        cValue: '',
        yValue: '',
        doubleClick: ''
      },
      //  options
      diseaseOptions: detailData.basicDetail.diseaseOptions,
      countryOptions: detailData.basicDetail.countryOptions,
      clickOptions: ['Yes', 'No'],
      // table
      tableData: [],
      currentRow: null,
      isLoading: false,
      resultMultipleSelection: []
    }
  },
  computed: {
    opt: {
      get() { return this.$store.state.opt },
      set(v) { this.$store.commit('updateOpt', v) }
    },
    editID: {
      get() { return this.$store.state.editID },
      set(v) { this.$store.commit('updateEditID', v) }
    },
    viewID: {
      get() { return this.$store.state.viewID },
      set(v) { this.$store.commit('updateViewID', v) }
    }
  },
  methods: {
    doubleClickEvent(row, e) {
      this.onView()
    },
    //  记录当前选中的行
    handleCurrentChange(val) {
      this.currentRow = val
    },
    //  记录当前选中的所有行(多选)
    handleSelectionChange(val) {
      this.resultMultipleSelection = val
    },
    onBatchInput() {
      //  TODO 批量导入
    },
    onBatchExport() {
      //  TODO 批量导出
    },
    onView() {
      if (this.currentRow == null) {
        this.$alert('请选中需要查看的条目', '未选中任何条目',
          { confirmButtonText: '确定', callback: action => {} });
      } else {
        this.opt = 'view'
        this.viewID = this.currentRow.id
        this.$router.push('/detail')
      }
    },
    onEdit() {
      if (this.currentRow == null) {
        this.$alert('请选中需要编辑的条目', '未选中任何条目', {
          confirmButtonText: '确定',
          callback: action => {
            //  do nothing
          }
        });
      } else {
        this.opt = 'edit'
        this.editID = this.currentRow.id
        this.$router.push('/detail')
      }
    },
    onNew() {
      this.opt = 'new'
      this.$router.push('/detail')
    },
    onSearch() {
      var that = this
      that.isLoading = true
      var yearArr = String(this.conditions.yValue).split(' ')
      api.query(this.conditions.searchID, {
        disease: this.conditions.dValue == '' ? null : this.conditions.dValue,
        country: this.conditions.cValue == '' ? null : this.conditions.cValue,
        year: this.conditions.yValue == '' ? null : parseInt(yearArr[3]),
        doubleClick: this.conditions.doubleClick == '' ? null : (this.conditions.doubleClick == 'Yes' ? 'Yes' : 'No')
      }, that)
    }
  },
  created: function() {
    if (this.$store.state.homeTableBuff !== null) {
      this.tableData = this.$store.state.homeTableBuff
      this.conditions.searchID = this.$store.state.homeConditionsBuff.searchID
      this.conditions.dValue = this.$store.state.homeConditionsBuff.dValue
      this.conditions.cValue = this.$store.state.homeConditionsBuff.cValue
      this.conditions.yValue = this.$store.state.homeConditionsBuff.yValue
      this.conditions.doubleClick = this.$store.state.homeConditionsBuff.doubleClick
    }
  },
  beforeDestroy: function() {
    this.$store.commit('updateHomeTableBuff', this.tableData)
    this.$store.commit('updateHomeConditionsBuff', this.conditions)
  },
}
</script>

<style>
#buttons {
  margin-top: 10px;
  margin-bottom: 10px;
}

#page-container {
  padding: 5px;
  border: solid;
  border-width: 1px;
  border-radius: 4px;
}

#result-table {
  user-select: none;
}

.btn-container {
  text-align: right;
}
</style>
