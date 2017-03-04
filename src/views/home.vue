<template>
<div id="home">
  <div id="page-container">
    <h1>Home Page</h1>
    <el-row id="input_row" :gutter="10">
      <el-col v-bind:span="4">
        <el-input placeholder="Report ID"></el-input>
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
        <el-button>Search</el-button>
        <el-button>Export</el-button>
        <el-button>Batch Input</el-button>
        <el-button @click="editItem">Edit</el-button>
        <el-button type="primary" @click="newItem">New</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" highlight-current-row align="center" height="350"
      @current-change="handleCurrentChange" style="width: 100%">
      <el-table-column type="index" laber="index" width="60"></el-table-column>
      <el-table-column property="title" label="Title" width="200"></el-table-column>
      <el-table-column property="author" label="Author" width="110"></el-table-column>
      <el-table-column property="disease" label="Disease" width="150"></el-table-column>
      <el-table-column property="reporter" label="Reporter" width="110"></el-table-column>
      <el-table-column property="time" label="Year of publish"></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import detailData from '../static/detailData.js'

export default {
  name: 'home',
  data() {
    return {
      //  disease
      diseaseOptions: detailData.basicDetail.diseaseOptions,
      countryOptions: detailData.basicDetail.countryOptions,
      d_value: '',
      c_value: '',
      y_value: '',
      clickOptions: ['Yes', 'No'],
      double_click: '',
      // table
      tableData: [],
      currentRow: null
    }
  },
  computed: {
    opt: {
      get() {
        return this.$store.state.opt
      },
      set(value) {
        this.$store.commit('updateOpt', value)
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val
    },
    editItem() {
      this.opt = 'edit'
      this.$router.push('/detail')
    },
    newItem() {
      this.opt = 'new'
      this.$router.push('/detail')
      // this.tableData.push({
      //   title: 'Study of AIDS',
      //   author: 'hhk',
      //   disease: 'AIDS',
      //   reporter: 'wyz',
      //   time: '2016'
      // })
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
