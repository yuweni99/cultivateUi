<template>
  <div class="header-wraper">
    <el-menu background-color="#324157" theme="dark" default-active="1" class="el-menu-demo" mode="horizontal"
             >
      <li class="title">
        <i class="el-icon-menu"></i>
        <span>培训管理系统</span>
      </li>
      <li class="user">
        <el-dropdown @command="logout" trigger="click">
                  <span class="el-dropdown-link">
                  {{username}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item split-button @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </el-menu>
  </div>
</template>


<script>
  import * as userApi from '../../api/user'
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {}
    },
    computed: {
      username(){
        return this.$store.state.userInfo.name;
      }
    },
    methods: {
      //注销
      async logout(){
        const result = await userApi.logout();

        if(result.success){
          //清理vuex中的数据
          this.clearUserInfo();
          this.clearToken();

          //清理sessionStore中的数据
          sessionStorage.clear();

          //跳转登陆页面
          this.$router.replace('/login');
        }else{
          this.$message(result.message);
        }


      },
      ...mapActions(['clearUserInfo','clearToken'])

    }
  }
</script>


<style>
  .header-wraper li {
    float: left;
    margin-right: 20px;
    margin-top: 5px;

  }

  .header-wraper {
    background-color: #af66ff;
  }

  .title {
    padding: 1em .2em;
  }

  .title span {
    font-size: 1.4em;
    margin-left: 5px;
  }

  .el-dropdown-link {
    color: #ffffff;
  }


  .user .el-dropdown {
    position: absolute;
    right: 20px;
    padding-top: 20px;
  }
</style>
