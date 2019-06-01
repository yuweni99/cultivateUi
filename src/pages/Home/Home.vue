<template>
  <div id="app">
    <div class="app_header">
      <data-header></data-header>
    </div>
    <div class="app_content">
      <div class="app_nav">
        <side-nav></side-nav>
      </div>
      <div class="app_right">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{pathName}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>

  import DataHeader from '../../components/DataHeader/DataHeader'
  import SideNav from '../../components/SideNav/SideNav'
  import Nothing from '../../components/Nothing/Nothing'


  export default {
    name: "Home",
    data() {
      return {
        pathName: this.$route.name,
      }
    },
    components: {
      DataHeader,
      SideNav,
      Nothing
    },
  }
</script>

<style>

  .app_header {
    position: relative;
    flex: 0 0 auto;
    z-index: 2;

  }

  .app_header .title {
    margin-left: 16px;
    color: #fff;
  }

  .app_content {
    flex: 1;
    display: flex;
    flex-flow: row;
  }

  .app_nav {
    position: relative;
    flex: 0 0 280px;
    background: #EFF2F7;
  }

  .app_right {
    flex: 1;
    overflow: auto;
    padding: 20px;

  }

  .breadcrumb {
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
</style>
