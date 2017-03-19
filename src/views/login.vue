<template>
<div id="login">
  <h1>Welcome to Disease Database</h1>
  <el-input id="username_input" v-model="username_input" placeholder="请输入用户名"></el-input>
  <el-input type="password" id="password_input" v-model="password_input" placeholder="请输入密码"></el-input>
  <el-row>
    <el-button type="primary" @click="login">登录</el-button>
    <el-button @click="onRegister">注册</el-button>
  </el-row>

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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser('register')">注 册</el-button>
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
      msg: 'Welcome to Your Vue.js App',
      username_input: '',
      password_input: '',
      dialogVisible: false,
      //  register
      register: {
        userame: '',
        password: '',
        confirm: ''
      },
      registerRules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        confirm: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      api.login(this.username_input, this.password_input)
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
            console.log('Err: Username or Password Error')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onRegister () {
      this.dialogVisible = true
    },
    addUser (formName) {
      console.log(formName)
      console.log(this.register)
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
          console.log('error submit!!');
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

#username_input {
  width: 85%;
  margin-bottom: 5px;
}

#password_input {
  width: 85%;
  margin-bottom: 10px;
}

</style>
