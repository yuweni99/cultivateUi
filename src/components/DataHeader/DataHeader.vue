<template>
  <div class="header-wraper">
      <el-menu background-color="#324157" theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <li class="title">
              <i class="el-icon-menu"></i>
              <span>培训管理系统</span>
          </li>
          <li class="user">
              <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                  monster1935<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>退出</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
          </li>
      </el-menu>
  </div>
</template>


<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>


<style>
.header-wraper li {
    float: left;
    margin-right: 20px;
    margin-top: 5px;

}

.header-wraper{
  background-color: #af66ff;
}

.title {
    padding: 1em .2em;
}

.title span {
    font-size: 1.4em;
    margin-left: 5px;
}
.el-dropdown-link{
  color: #ffffff;
}



.user .el-dropdown {
    position: absolute;
    right: 20px;
    padding-top: 20px;
}
</style>
