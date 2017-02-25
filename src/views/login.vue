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
import axios from 'axios'

//  配置baseURL
axios.defaults.baseURL = 'http://localhost:3000';

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
    login() {
      // if (users[0].name == this.username_input && users[0].password == this.password_input) {
      //   store.state.islogin = true;
      //   this.$router.push('/home')
      // } else {
      //   console.log('Err: Username or Password Error');
      // }
      var tmpRouter = this.$router;
      axios.post('/loginReq', {
        username: this.username_input,
        //  TODO: md5 加密
        password: this.password_input
      })
      .then(function (response) {
        console.log(response.data.success)
        tmpRouter.push('/home')
      })
      .catch(function (response) {
        console.log(response)
      });
    }
  }
}
</script>
