<template>
<div id="login">
  <h1>Welcome to Disease Database</h1>
  <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="60px">
    <div id="username-input">
      <el-form-item label="帐号" prop="usernameInput">
        <el-input v-model="loginForm.usernameInput" @keyup.enter.native="login('loginForm')">
        </el-input>
      </el-form-item>
    </div>
    <div id="password-input">
      <el-form-item label="密码" prop="passwordInput">
        <el-input type="password" v-model="loginForm.passwordInput" @keyup.enter.native="login('loginForm')">
        </el-input>
      </el-form-item>
    </div>
    <el-form-item>
      <div id="login-button">
        <el-button type="primary" @click="login('loginForm')">登录</el-button>
        <el-button @click="onRegister">注册</el-button>
      </div>
    </el-form-item>
  </el-form>

  <el-dialog title="新用户注册" v-model="dialogVisible" size="small">
    <el-form :model="register" :rules="registerRules" ref="register" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input class="register-input" v-model="register.username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input type="password" class="register-input" v-model="register.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm">
        <el-input type="password" class="register-input" v-model="register.confirm"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addUser('register')">注 册</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import api from '../model/api.js'

export default {
  name: 'login',
  data() {
    var validatePass1 = (rule, value, callback) => {
        if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.register.confirm !== '') {
        this.$refs.register.validateField('confirm')
      }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.register.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      //  login
      loginForm: {
        usernameInput: '',
        passwordInput: '',
      },
      loginRules: {
        usernameInput: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        passwordInput: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      //  register
      register: {
        userame: '',
        password: '',
        confirm: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass1, trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        confirm: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.login(this.loginForm.usernameInput, this.loginForm.passwordInput)
            .then((res) => {
              if (res.data.success == true) {
                console.log(res.data)
                this.$store.commit('updateIslogin', true)
                this.$store.commit('updateUserInfo', {
                  authority: res.data.authority,
                  id: res.data.id,
                  username: res.data.username
                })
                this.$router.push('/home')
              } else {
                this.$notify({
                  title: '登录失败',
                  message: '用户名或密码错误',
                  type: 'warning'
                })
              }
            })
            .catch((err) => {
              this.$notify({
                title: '',
                message: '登录失败',
                type: '网络异常'
              })
            })
        } else {
          return false
        }
      })
    },
    onRegister () {
      this.dialogVisible = true
    },
    addUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          api.register(this.register.username, this.register.password, 4)
            .then((res) => {
              if (res.data.success) {
                this.$notify({
                  title: '',
                  message: '注册成功',
                  type: 'success'
                })
              } else {
                console.log(res)
                this.$notify({
                  title: '注册失败',
                  message: '用户名重复',
                  type: 'warning'
                })
              }
            })
            .catch((err) => {
              console.log(err)
              this.$notify({
                title: '',
                message: '注册失败',
                type: 'warning'
              })
            })
        } else {
          // console.log('error submit!!');
          return false;
        }
      })
    }
  }
}
</script>

<style>
#login {
  margin-top: 15%;
}

#username-input {
  width: 55%;
  margin-left: auto;
  margin-right: auto;
}

#password-input {
  width: 55%;
  margin-left: auto;
  margin-right: auto;
}

#login-button {
  width: 55%;
  margin-left: auto;
  margin-right: auto;
}
</style>
