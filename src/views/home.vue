<template>
<div id="home">
  <div id="page-container">
    <h1>Home Page</h1>
    <el-row id="input_row" :gutter="10">
      <el-col v-bind:span="4">
        <el-input placeholder="Report ID" v-model="searchID"></el-input>
      </el-col>
      <el-col :span="4">
        <el-select v-model="d_value" placeholder="Disease" clearable>
          <el-option v-for="item in diseaseOptions" v-bind:label="item" v-bind:value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="c_value" placeholder="Country" clearable>
          <el-option v-for="item in countryOptions" v-bind:label="item" v-bind:value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-date-picker v-model="y_value" align="right" type="year" placeholder="Year">
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-select v-model="double_click" placeholder="Double Click" clearable>
          <el-option v-for="item in clickOptions" v-bind:label="item" v-bind:value="item"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row id="buttons" type="flex" justify="end" :gutter="10">
      <el-col :span="20" class="btn-container">
        <el-button @click="onSearch">Search</el-button>
        <el-button @click="onBatchExport">Export</el-button>
        <el-button @click="onBatchInput">Batch Input</el-button>
        <el-button @click="onEdit">Edit</el-button>
        <el-button type="primary" @click="onNew">New</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" highlight-current-row align="center" height="350"
      @current-change="handleCurrentChange"
      style="width: 100%"
      v-loading="isLoading" element-loading-text="Searching">
      <!-- <el-table-column type="index" laber="index" width="40"></el-table-column> -->
      <el-table-column property="id" label="id" width="100"></el-table-column>
      <el-table-column property="title" label="Title" width="180"></el-table-column>
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
import api from '../api.js'

export default {
  name: 'home',
  data() {
    return {
      //  search conditions
      searchID: null,
      d_value: '',
      c_value: '',
      y_value: '',
      double_click: '',
      //  options
      diseaseOptions: detailData.basicDetail.diseaseOptions,
      countryOptions: detailData.basicDetail.countryOptions,
      clickOptions: ['Yes', 'No'],
      // table
      tableData: [],
      currentRow: null,
      isLoading: false
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
    }
  },
  methods: {
    //  记录当前选中的行
    handleCurrentChange(val) {
      this.currentRow = val
    },
    onBatchInput() {
      //  TODO 批量导入
    },
    onBatchExport() {
      //  TODO 批量导出
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
      var yearArr = String(this.y_value).split(' ')
      console.log(yearArr[3])
      api.query(this.searchID, {
        disease: this.d_value == '' ? null : this.d_value,
        country: this.c_value == '' ? null : this.c_value,
        year: this.y_value == '' ? null : parseInt(yearArr[3]),
        doubleClick: this.double_click == '' ? null : (this.double_click == 'Yes' ? 'Yes' : 'No')
      }, that)
    }
  }
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

.btn-container {
  text-align: right;
}
</style>
