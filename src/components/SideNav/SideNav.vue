<template>
    <el-col>
    <el-menu default-active="/testManagement" class="el-menu-vertical-demo" router>
      <el-submenu v-if="permissions[0]" :index="index" v-for="(permission,index) in permissions[0].children">
        <template slot="title"><i class="el-icon-location"></i>{{permission.name}}</template>
        <el-menu-item-group>
          <el-menu-item v-for="(permissionChildren) in permission.children"  :index="permissionChildren.url"><i :class="permissionChildren.icon"></i>{{permissionChildren.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
  </el-menu>
  </el-col>

</template>


<script>


  export default {
    computed: {
      permissions(){
        console.log(this.$store.state.userInfo);
        return this.$store.state.userInfo.permission;
      }
    }
  }


</script>
