<!--登录页-->
<template>
  <el-form status-icon label-position="left" :rules="rules" ref="userFrom" :model="user" label-width="0px"
           class="login-container">
    <h3 class="title text-center">培训管理系统</h3>
    <el-alert v-if="showErrorMessage" style="margin-bottom:10px;" :title="message"
              type="success"></el-alert>
    <el-form-item prop="username">
      <el-input type="text" placeholder="用户名" v-model="user.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="user.password" placeholder="密码"  show-password></el-input>
    </el-form-item>
    <el-checkbox class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;margin-top:10px;">
      <el-button type="primary" @click="login" style="width:100%;">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        user: {
          username: '',
          password: '',
        },
        showErrorMessage: false,
        message: '帐号admin或guest，密码123456，帐号权限不同!',
        //表单校验
        rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      //非空校验
      validator(rule, value, callback, message) {
        if (!value) {
          callback(new Error(message));
        } else {
          callback();
        }
      },
      //登陆处理
      login(){
        this.$refs.userFrom.validate((valid) => {
          if (valid) {
            this.$message('登陆成功');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }

  }
</script>

<style>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }

  }
  .text-center {
    text-align: center;
  }
</style>
