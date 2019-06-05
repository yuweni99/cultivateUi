import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import NoResource from '../pages/NoResource/NoResource'
import Home from '../pages/Home/Home'

import Course from '../pages/Course/Course'
import Teaching from '../pages/Teaching/Teaching'
import TeachingAlertnativeTime from '../pages/TeachingAlertnativeTime/TeachingAlertnativeTime'
import AttendCourseInfo from '../pages/AttendCourseInfo/AttendCourseInfo'
import TeachingTime from '../pages/TeachingTime/TeachingTime'
import Classroom from '../pages/Classroom/Classroom'
import CourseTeacher from '../pages/CourseTeacher/CourseTeacher'
import User from '../pages/User/User'
import Teacher from '../pages/Teacher/Teacher'
import StudentTeaching from "../pages/StudentTeaching/StudentTeaching";

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
          path: 'course',
          component: Course,
          name: '课程信息'
        },
        {
          path: 'teaching',
          component: Teaching,
          name: '课程管理'
        },
        {
          path :'teachingAlertNativeTime',
          component: TeachingAlertnativeTime
        },
        {
          path: 'attendCourseInfo',
          component: AttendCourseInfo,
          name: '添加课程信息'
        },
        {
          path: 'teachingTime',
          component: TeachingTime,
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
          path: 'studentteaching',
          component: StudentTeaching,
          name: '课程与课时'
        },
        {
          path: '',
          redirect: 'attendCourseInfo',
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
