<template>
<div id="login">
  <h1>Welcome to Disease Database</h1>
  <el-input id="username_input" v-model="username_input" placeholder="请输入用户名"></el-input>
  <el-input id="password_input" v-model="password_input" placeholder="请输入密码"></el-input>
  <el-row>
    <el-button type="primary" @click="login">登录</el-button>
    <el-button>注册</el-button>
  </el-row>
</div>
</template>

<script>
import api from '../model/api.js'

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
      api.login(this.username_input, this.password_input)
        .then((res) => {
          console.log(res.data.authority)
          if (res.data.success == true) {
            this.$store.commit('updateIslogin', true)
            this.$store.commit('updateAuthority', res.data.authority)
            this.$router.push('/home')
          } else {
            console.log('Err: Username or Password Error')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    axiosLogin() {
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

<style>
#login {
    margin-top: 15%;
}

#username_input {
  width: 85%;
  margin-bottom: 5px;
}

#password_input {
  width: 85%;
  margin-bottom: 10px;
}
</style>
