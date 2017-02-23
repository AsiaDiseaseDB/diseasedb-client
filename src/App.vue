<template lang="pug">
div#app
  el-input(v-model="username_input" placeholder="请输入用户名")
  el-input(v-model="password_input" placeholder="请输入密码")
  el-button 默认按钮
  el-button(type="primary") 主要按钮
  el-button(type="text" @click="test") {{ msg }}
  p
    div
      router-link(to="/foo") Go to Foo
    div
      router-link(to="/bar") Go to Bar
    div
      router-link(to="/test") Go to Component Test
  router-view
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      username_input: '',
      password_input: ''
    }
  },
  methods: {
    test: function() {
      console.log('233');
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
