<!--注册页-->
<template>
  <el-form status-icon label-position="left" :rules="rules" ref="userFrom" :model="user" label-width="0px"
           class="register-container">
    <h3 class="title text-center">培训管理系统</h3>
    <el-alert v-if="showErrorMessage" style="margin-bottom:10px;" :title="message"
              type="success"></el-alert>
    <el-form-item prop="name">
      <el-input type="text" placeholder="用户名" v-model="user.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="user.password" placeholder="密码"  show-password></el-input>
    </el-form-item>
    <el-form-item prop="secondaryPasswordConfirmation">
      <el-input type="password" v-model="user.secondaryPasswordConfirmation"  placeholder="确认密码确认"  show-password></el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input type="text" placeholder="手机号码" v-model="user.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input type="text" placeholder="验证码" v-model="user.code" autocomplete="off"></el-input>
      <el-button @click="sendMsg" :disabled="isSendSuccessCode">{{isSendSuccessCode?`请等待${waitDate}秒`:'发送验证码'}}</el-button>
    </el-form-item>
    <div style="margin-top: 20px">

    </div>
    <router-link to="/login">去登陆</router-link>
    <el-form-item style="width:100%;margin-top:10px;">
      <el-button type="primary" @click="register" style="width:100%;">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

  import * as userApi from '../../api/user'

  export default {
    name: 'Register',
    data() {
      return {
        user: {
          name: '',
          password: '',
          secondaryPasswordConfirmation: '',
          phone: '',
          roleId: '3', //默认学生
          code: '' //验证码
        },
        phoneNumberReg: /^[1][3,4,5,7,8][0-9]{9}$/, //手机号码正则
        waitDate: 60,//倒计时
        isSendSuccessCode: false, //是否成功发送验证码
        showErrorMessage: false,
        message: '帐号admin或guest，密码123456，帐号权限不同!',
        //表单校验
        rules: {
          name: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ],
          secondaryPasswordConfirmation: [
            { validator: this.validatorPassword, trigger: 'blur'}
          ],
          phone: [
            {validator: this.checkPhoneNumber, trigger: 'blur'},
          ],
          code: [
            { required: true, message: '验证码不能为空', trigger: 'blur' },
            { min: 6, max: 6, message: '验证码长度为6', trigger: 'blur' }
          ],
          roleId: [
            { required: true, message: '请选择用户类型', trigger: 'blur' },
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
      register(){
        this.$refs.userFrom.validate(async (valid) => {
          if (valid) {

            const result = await userApi.registerUser(this.user);

            if(result.success){
              this.$message({
                type:"success",
                message: "注册成功,5秒后跳转登陆页面"
              });

              this.user = {};
              this.user.roleId = '3';

              //定时跳转
              setTimeout(() => {
                this.$router.push("/login")
              },5000)

            }else{
              this.$message(result.message);
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      validatorPassword(rule, value, callback) {

          if(!value){
            callback(new Error('请输入确认密码'));
            return;
          }

          if(value !== this.user.password){
            callback(new Error('两次密码输入不一致'));
            return;
          }

        callback()
      },
      checkPhoneNumber(rule, value, callback) {

        if(!value){
          callback(new Error('手机号码不能为空'));
          return;
        }
        let phoneNumberReg = this.phoneNumberReg;
        if (!phoneNumberReg.test(value)) {
          callback(new Error('手机号码格式不正确'));
          return;
        }
        callback()
      },
      //发送验证码
      async sendMsg(){

        const isSendSuccessCode = this.isSendSuccessCode;

        if(!isSendSuccessCode){

          //获取手机号
          const phone = this.user.phone;
          //获取手机号正则
          const phoneNumberReg = this.phoneNumberReg;

          if(!phoneNumberReg.test(phone)){
            this.$message("手机号未填写或格式不正确!");
            return ;
          }

          const result = await userApi.sendCode(phone);

          const {success,message} = result;

          if(success){ //发送验证码成功

            let waitDate = 60; //倒计时
            //更改验证码状态
            this.isSendSuccessCode = true;

            //定时器
            this.intervalId = window.setInterval(() => {
              waitDate--;
              this.waitDate = waitDate;

              if(waitDate === 0){ //停止倒计时
                clearInterval(this.intervalId);
                //改变状态
                this.isSendSuccessCode = false;
              }

            },1000);

            this.$message({
              message,
              type: 'success'
            })
          }else{
            //重置倒计时
            this.waitDate = 0;
            this.isSendSuccessCode = false;
            this.$message(message);
          }

        }
      }
    }

  }
</script>

<style>
  .register-container {
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
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }


  .text-center {
    text-align: center;
  }
</style>
