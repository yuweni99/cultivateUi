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
import StudentSelectCourse from '../pages/StudentSelectCourse/StudentSelectCourse'
import User from '../pages/User/User'
import Teacher from '../pages/Teacher/Teacher'
import StudentTeaching from "../pages/StudentTeaching/StudentTeaching";
import Permission from '../pages/Permission/Permission'
import Role from '../pages/Role/Role'
import UserCourse from '../pages/UserCourse/UserCourse'
import TeacherCourse from '../pages/TeacherCourse/TeacherCourse'
import TeachingSelectCourse from '../pages/TeachingSelectCourse/TeachingSelectCourse'

import store from '../store'
import * as userApi from '../api/user'


Vue.use(Router);

const router = new Router({
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
          path: 'teachingSelectCourse',
          component: TeachingSelectCourse,
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
          path: 'studentSelectCourse',
          component: StudentSelectCourse,
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
          path: 'userCourse',
          component: UserCourse,
        },
        {
          path: 'teacherCourse',
          component: TeacherCourse,
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

/**
 * 路由守卫
 */
router.beforeEach(async (to, from, next) => {

  //获取路由地址
  const path = to.path;

  //登陆注册页面放行
  if(path === '/login' || path === '/register'){
    next();
    return;
  }

  //从vuex中查询是否存在用户信息和token
  let token = store.state.token;
  if(token){
    next();
    return;
  }

  //查询sessionStore是否存在token
  token = sessionStorage.getItem("token");

  if(token){ //存在token表示登陆
    //token保存到vuex中
    store.dispatch('saveToken',token);

    //查询用户信息
    const result = await userApi.getUserInfo();
    console.log(result)
    if(result.success){ //获取用户信息失败
      const userInfo = result.object;
      store.dispatch('saveUserInfo',userInfo);
      next();
      return ;
    }

  }

  //未登录，跳转登陆页面
  next('/login');

});

export default router;
