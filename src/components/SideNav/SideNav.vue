<template>
    <el-col>
    <el-menu default-active="/testManagement" class="el-menu-vertical-demo" router>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-location"></i>系统管理</template>
        <el-menu-item-group>
          <el-menu-item index="/home/testProject">测试管理</el-menu-item>

          <el-menu-item index="/home/teaching">课程管理</el-menu-item>
          <el-menu-item index="/home/TeachingAlertnativeTime">课程选择时间</el-menu-item>
          <el-menu-item index="/home/teachingTime">添加上课时间</el-menu-item>
          <el-menu-item index="/home/Classroom">教室信息</el-menu-item>
          <el-menu-item index="/home/course">课程信息</el-menu-item>
          <el-menu-item index="/home/courseTeacher">课程及授课教师</el-menu-item>
          <el-menu-item index="/home/attendCourseInfo">添加课程信息</el-menu-item>

          <el-menu-item index="/home/user">用户信息</el-menu-item>
          <el-menu-item index="/home/teacher">教师信息</el-menu-item>
          <el-menu-item index="/home/studentTeaching">课程与课时</el-menu-item>
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
