<template>
<div id="user-management">
  <el-popover
    ref="popover" placement="top" width="160" v-model="visible">
    <el-input id="user-manage-input" v-model="username" placeholder="username" size="mini"></el-input>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="onSearch">确定</el-button>
    </div>
  </el-popover>

  <div id="user-manage-panel">
    <el-button-group>
      <el-button v-popover:popover>Search</el-button>
      <el-button @click="onModifyPassword" icon="view">Reset Password</el-button>
      <el-button @click="onModifyAuthority" icon="edit">Modify Authority</el-button>
      <el-button @click="onDelete" icon="delete">Delete</el-button>
      <el-button type="primary" @click="onNew" icon="plus">New User</el-button>
    </el-button-group>
  </div>
  <div>
    <el-table :data="userData" style="width: 100%" align="center">
      <el-table-column property="id" type="index" width="100" sortable></el-table-column>
      <el-table-column property="username" label="Username" width="200" sortable></el-table-column>
      <el-table-column property="authority" label="Authority" sortable></el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import manager from '../model/manager.js'

export default {
  data() {
    return {
      username: '',
      userData: [],
      visible: false
    }
  },
  methods: {
    onSearch () {
      this.visible = false
    },
    onModifyPassword () {},
    onModifyAuthority () {},
    onDelete () {},
    onNew () {}
  },
  created () {

  }
}
</script>

<style>
#user-manage-panel {
  text-align: right;
  margin-top: 10px;
  margin-bottom: 10px;
}

#user-manage-input {
  margin-bottom: 5px;
}
</style>
