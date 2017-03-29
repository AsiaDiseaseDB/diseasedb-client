<template>
<div id="topbar">
  <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1"><i class="el-icon-menu"></i>Home</el-menu-item>
    <el-menu-item index="2"><i class="el-icon-setting"></i>Management</el-menu-item>
    <el-menu-item index="3"><i class="el-icon-close"></i>Log Out</el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key == 1) {  // menu
        this.$router.push('/home')
      } else if (key == 2) {
        this.$router.push('/manage')
      } else if (key == 3) {
        this.$store.commit('updateHomeConditionsBuff', {
          searchID: null, dValue: '', cValue: '', yValue: '', doubleClick: ''
        })
        this.$store.commit('updateHomeTableBuff', null)
        this.$router.push('/login')
      }
    }
  }
}
</script>
