<template>
<div id="manage">
  <el-menu id="top-menu" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1"><i class="el-icon-menu"></i>Home</el-menu-item>
    <el-menu-item index="2"><i class="el-icon-setting"></i>Management</el-menu-item>
  </el-menu>
  <!-- <h1>Detail Page</h1> -->
  <div id="manage-page-container">
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理">
        <UserManage></UserManage>
      </el-tab-pane>
      <el-tab-pane label="配置管理">
        <ConfigManage></ConfigManage>
      </el-tab-pane>
      <el-tab-pane label="操作日志">
        <SystemLog></SystemLog>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import api from '../model/api.js'

let id = 1000;

export default {
  data() {
    return {
      activeIndex: '2'
    }
  },
  components: {
    UserManage: require('../components/UserManage.vue'),
    ConfigManage: require('../components/ConfigManage.vue'),
    SystemLog: require('../components/SystemLog.vue')
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key == 1) {  // menu
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style>
#manage-page-container {
  position: relative;
  top: 20px;
}
</style>
