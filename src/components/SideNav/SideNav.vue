<template>
    <el-col>
    <el-menu default-active="/testManagement" class="el-menu-vertical-demo" router>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-location"></i>用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="/home/teacher">教师管理</el-menu-item>
          <el-menu-item index="/home/user">学生管理</el-menu-item>
          <el-menu-item index="/home/permission">许可管理</el-menu-item>
          <el-menu-item index="/home/role">角色管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-location"></i>课程管理</template>
        <el-menu-item-group>
          <el-menu-item index="/home/teaching">课时管理</el-menu-item>
          <el-menu-item index="/home/alternativeTime">上课时间管理</el-menu-item>
          <el-menu-item index="/home/Classroom">教室信息</el-menu-item>
          <el-menu-item index="/home/course">课程管理</el-menu-item>
          <el-menu-item index="/home/course">课程列表</el-menu-item>
          <el-menu-item index="/home/courseTeacher">课程列表</el-menu-item>
          <el-menu-item index="/home/userCourse">学生课程</el-menu-item>
          <el-menu-item index="/home/teacherCourse">老师课程</el-menu-item>
          <el-menu-item index="/home/studentTeaching">我的课时</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    <!--  <el-submenu index="2">
        <template slot="title"><i class="el-icon-location"></i>系统管理</template>
        <el-menu-item-group>
          <el-menu-item index="/index/userGroup">用户分群管理</el-menu-item>
          <el-menu-item index="/index/userList">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>-->
    <!--<el-menu-item index="/index/feedback"><i class="el-icon-setting"></i>意见反馈</el-menu-item>-->
  </el-menu>
  </el-col>

</template>
