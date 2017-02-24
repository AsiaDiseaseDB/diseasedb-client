<template lang="pug">
div#login
  h1 Welcome to Disease Database
  el-input(v-model="username_input" placeholder="请输入用户名")
  el-input(v-model="password_input" placeholder="请输入密码")
  el-button(type="primary" @click="login") 登录
  el-button 注册
</template>

<script>
import store from '../store/store.js'

//  从数据库读取用户信息
var users = [{
  name: 'mingyu',
  password: '123456'
}]

export default {
  name: 'login',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      username_input: '',
      password_input: ''
    }
  },
  methods: {
    login: function() {
      if (users[0].name == this.username_input && users[0].password == this.password_input) {
        store.state.islogin = true;
        this.$router.push('/home')
      } else {
        console.log('Err: Username or Password Error');
      }
    }
  }
}
</script>
