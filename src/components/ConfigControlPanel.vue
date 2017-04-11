<template>
<div class="control-panel">
  <el-button-group class="cc-button-group">
    <el-button class="cc-button-group-item" @click="onDelete" icon="delete">Delete</el-button>
    <el-button class="cc-button-group-item" @click="onAdd" icon="plus">New Item</el-button>
  </el-button-group>
  <el-form class="cc-inline-form" :inline="true" :model="form">
    <el-form-item class="cc-inline-form-item" v-show="type === 'delete'">
      <el-input readonly v-model="form.deleteItem" placeholder="请在选中要删除的条目"></el-input>
    </el-form-item>
    <el-form-item class="cc-inline-form-item" v-show="type === 'add'">
      <el-input v-model="form.addItem" placeholder="请输入要添加的条目"></el-input>
    </el-form-item>
    <el-form-item class="cc-inline-form-item cc-inline-form-submit" v-show="type !== null">
      <el-button type="text" @click="onSubmit">确定</el-button>
    </el-form-item>
  </el-form>
  <el-row>
    <el-table :data="dataForm" style="width: 100%" highlight-current-row
              align="center" @current-change="handleCurrentChange">
      <el-table-column property="id" type="index" width="100"></el-table-column>
      <el-table-column property="value" :label="optName" sortable></el-table-column>
    </el-table>
  </el-row>
</div>
</template>

<script>
import optionManager from '../model/optionManager'

export default {
  data() {
    return {
      type: null,
      form: {
        deleteItem: null,
        addItem: null
      },
      dataForm: []
    }
  },
  //  'reporter' 'disease' 'country' 'documentCategory' 'grSource' 'information'
  props: ['optName', 'catagory'],
  methods: {
    handleCurrentChange (val) {
      this.currentRow = val
      if (this.currentRow !== null) {
        this.form.deleteItem = val.value
      }
    },
    onDelete () {
      this.type = 'delete'
    },
    onAdd () {
      this.type = 'add'
    },
    onSubmit () {
      if (this.type == 'delete') {
        if (this.form.deleteItem === null || this.form.deleteItem === '') {
          this.$notify({ message: '请在左侧选中要删除的条目', type: 'warning' })
          return
        }
        optionManager.deleteOptions(this.catagory, this.optName, this.form.deleteItem)
          .then((res) => {
            this.$notify({ message: '删除成功', type: 'success' })
            //  TODO: 从store中删除, 更新视图
          })
          .catch((err) => { this.$notify({ message: '网络错误', type: 'warning' }) })
      } else if (this.type = 'add') {
        if (this.form.addItem === null || this.form.addItem === '') {
          this.$notify({ message: '请在输入要添加的条目', type: 'warning' })
          return
        }
        optionManager.addOptions(this.catagory, this.optName, this.form.addItem)
          .then((res) => {
            this.$notify({ message: '添加成功', type: 'success' })
            //  TODO: 从store中删除，更新视图
          })
          .catch((err) => { this.$notify({ message: '网络错误', type: 'warning' }) })
      }

      this.type = null
      this.form = {
        deleteItem: null,
        addItem: null
      }
    }
  },
  created () {
    let tmp = this.$store.getters[this.optName]
    console.log(this.optName)
    for (let i in tmp) {
      this.dataForm.push({
        value: tmp[i]
      })
    }
  }
}
</script>

<style>
.control-panel {
  text-align: left;
  width: 30%;
  user-select: none;
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

.cc-button-group {
  width: 100%;
}

.cc-button-group-item {
  height: 45px;
  width: 50%;
  border-style: none;
}

.cc-inline-form {
  width: 100%;
  text-align: center;
  margin: 0;
}

.cc-inline-form-item {
  margin-bottom: 10px;
  border-style: none;
}

.cc-inline-form-submit {
  position: relative;
  right: 0;
}
</style>
