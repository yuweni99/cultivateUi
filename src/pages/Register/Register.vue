<!--注册页-->
<template>
  <el-form status-icon label-position="left" :rules="rules" ref="userFrom" :model="user" label-width="0px"
           class="register-container">
    <h3 class="title text-center">培训管理系统</h3>
    <el-alert v-if="showErrorMessage" style="margin-bottom:10px;" :title="message"
              type="success"></el-alert>
    <el-form-item prop="username">
      <el-input type="text" placeholder="用户名" v-model="user.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="user.password" placeholder="密码"  show-password></el-input>
    </el-form-item>
    <el-form-item prop="secondaryPasswordConfirmation">
      <el-input type="password" v-model="user.secondaryPasswordConfirmation"  placeholder="二次密码确认"  show-password></el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input type="text" placeholder="手机号码" v-model="user.phone" autocomplete="off"></el-input>
    </el-form-item>
    <div style="margin-top: 20px">
      <el-radio v-model="user.userType" label="1">学生</el-radio>
      <el-radio v-model="user.userType" label="2">老师</el-radio>
    </div>
    <el-form-item style="width:100%;margin-top:10px;">
      <el-button type="primary" @click="register" style="width:100%;">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'Register',
    data() {

      return {
        user: {
          username: '',
          password: '',
          secondaryPasswordConfirmation: '',
          phone: '',
          userType: '1'
        },



        showErrorMessage: false,
        message: '帐号admin或guest，密码123456，帐号权限不同!',
        //表单校验
        rules: {
          username: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "用户名不能为空")
              }, trigger: 'blur'
            }
          ],
          password: [
            {
              validator: (rule, value, callback) => {
                this.validator(rule, value, callback, "密码不能为空")
              }, trigger: 'blur'
            }
          ],
          secondaryPasswordConfirmation: [
            {
              validator: this.validatorPassword, trigger: 'blur'
            }
          ],
          phone: [
            {
              validator: this.checkPhoneNumber, trigger: 'blur'
            }
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
        this.$refs.userFrom.validate((valid) => {
          if (valid) {
            this.$message('注册成功');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      validatorPassword(rule, value, callback) {

        if (!value) {
          callback(new Error('二次确认密码不能为空'));
          return
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


        let phoneNumberReg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!phoneNumberReg.test(value)) {
          callback(new Error('手机号码格式不正确'));
          return;
        }
        callback()
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
