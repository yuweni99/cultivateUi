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
    <el-form-item prop="code">
      <el-input type="password" style="width: 180px;padding: 0 0" v-model="user.code" placeholder="验证码" >
      </el-input>
      <div style="width: 100px;height: 40px;line-height: 40px;display: inline-block;padding: 0px;position: absolute;margin-left: 25px">
        <img @click="changeCode"  :src="codeUrl" alt="">
      </div>
    </el-form-item>
    <router-link to="/register">去注册</router-link>
    <el-form-item style="width:100%;margin-top:10px;">
      <el-button type="primary" @click="login" style="width:100%;">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

  import * as userApi from '../../api/user'

  const BASE_URL = 'http://localhost:8888/auth';

  export default {
    name: 'Login',
    data() {
      return {
        codeUrl: `${BASE_URL}/vrifyCode/defaultKaptcha`,
        user: {
          username: '',
          password: '',
          code: ''
        },
        showErrorMessage: false,
        message: '帐号admin或guest，密码123456，帐号权限不同!',
        //表单校验
        rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '验证码不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      //改变验证码
      changeCode(){
        console.log(1)
        let codeUrl = this.codeUrl;

        codeUrl = codeUrl + '?' + Date.now();

        this.codeUrl = codeUrl;
      },
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
        this.$refs.userFrom.validate(async (valid) => {
          if (valid) {

            const user = this.user;

            const result = await userApi.login(user);

            if(result.success){
              console.log(result.object);

              //获取token
              const token = result.object;
              //保存到vuex中
              this.$store.dispatch("saveToken",token)

              //跳转首页
              this.$router.replace("/home")

            }else{
              this.$message(result.message);
            }

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
