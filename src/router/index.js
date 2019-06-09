import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import NoResource from '../pages/NoResource/NoResource'
import Home from '../pages/Home/Home'

import Course from '../pages/Course/Course'
import Teaching from '../pages/Teaching/Teaching'
import AlternativeTime from '../pages/AlternativeTime/AlternativeTime'
import Classroom from '../pages/Classroom/Classroom'
import CourseTeacher from '../pages/CourseTeacher/CourseTeacher'
import User from '../pages/User/User'
import Teacher from '../pages/Teacher/Teacher'
import StudentTeaching from "../pages/StudentTeaching/StudentTeaching";
import Permission from '../pages/Permission/Permission'

Vue.use(Router);

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
          name: '课时管理'
        },
        {
          path :'alternativeTime',
          component: AlternativeTime,
          NAME: '上课时间管理'
        },
        {
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
          path: 'studentTeaching',
          component: StudentTeaching,
          name: '课程与课时'
        },
        {
          path: 'permission',
          component: Permission,
          name: '许可管理'
        },
        {
          path: '',
          redirect: 'user',
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
