import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import NoResource from '../pages/NoResource/NoResource'
import Home from '../pages/Home/Home'

import TestProject from '../pages/TestManager/TestProject'
import Course from '../pages/Course/Course'
import AttendCourse from '../pages/AttendCourse/AttendCourse'
import AttendCourseAlertnativeTime from '../pages/AttendcourseAlertnativeTime/AttendCourseAlertnativeTime'
import AttendCourseInfo from '../pages/AttendCourseInfo/AttendCourseInfo'
import AttendCourseTime from '../pages/AttendCourseTime/AttendCourseTime'
import Classroom from '../pages/Classroom/Classroom'
import CourseTeacher from '../pages/CourseTeacher/CourseTeacher'
import User from '../pages/User/User'
import Teacher from '../pages/Teacher/Teacher'
import StudentAttendcourse from "../pages/StudentAttendCourse/StudentAttendcourse";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'testProject',
          component: TestProject,
          name: '测试'
        },
        {
          path: 'course',
          component: Course,
          name: '课程信息'
        },
        {
          path: 'attendCourse',
          component: AttendCourse,
          name: '课程管理'
        },
        {
          path :'AttendCourseAlertNativeTime',
          component: AttendCourseAlertnativeTime
        },
        {
          path: 'attendCourseInfo',
          component: AttendCourseInfo,
          name: '添加课程信息'
        },
        {
          path: 'attendcourseTime',
          component: AttendCourseTime,
          name: '添加上课时间'
        },{
          path: 'classroom',
          component: Classroom,
          name: '教室信息'
        },
        {
          path: 'courseTeacher',
          component: CourseTeacher,
          name: '课程及授课教师'
        },
        {
          path: 'user',
          component: User,
          name: '用户信息'
        },
        {
          path: 'teacher',
          component: Teacher,
          name: '教师信息'
        },
        {
          path: 'studentAttendcourse',
          component: StudentAttendcourse,
          name: '学生添加课程'
        },
        {
          path: '',
          redirect: 'attendCourse',
        }
      ]
    },
    {
      path: '*',
      component: NoResource
    },
    {
      path: '',
      redirect: '/home',
    }
  ]
})
