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
import Role from '../pages/Role/Role'
import UserCourseTeacher from '../pages/UserCourseTeacher/UserCourseTeacher.vue'

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
        },
        {
          path: 'teaching',
          component: Teaching,
        },
        {
          path :'alternativeTime',
          component: AlternativeTime,
        },
        {
          path: 'classroom',
          component: Classroom,
        },
        {
          path: 'courseTeacher',
          component: CourseTeacher,
        },
        {
          path: 'user',
          component: User,
        },
        {
          path: 'teacher',
          component: Teacher,
        },
        {
          path: 'studentTeaching',
          component: StudentTeaching,
        },
        {
          path: 'permission',
          component: Permission,
        },
        {
          path: 'role',
          component: Role,
        },
        {
          path: 'userCourseTeacher',
          component: UserCourseTeacher,
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
