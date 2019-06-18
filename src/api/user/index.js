/*
  课程管理请求接口定义
 */
import ajax from '../ajax'
import {DELETE,GET,POST,PUT} from '../requestTypes'
// const BASE_URL = 'http://127.0.0.1:88/api';
const BASE_URL = 'http://127.0.0.1:8080';

const AUTH_BASE_URL = 'http://localhost:8888/auth';

// 分页过滤查询课程信息
export const pageQueryUser = (pageNum,pageSize,searchUser) => ajax(`${BASE_URL}/user/pageQueryUser/${pageNum}/${pageSize}`,searchUser,POST);
export const pageQueryTeacher = (pageNum,pageSize,searchUser) => ajax(`${BASE_URL}/user/pageQueryTeacher/${pageNum}/${pageSize}`,searchUser,POST);

//根据课程id查询用户列表
export const pageQueryTeacherCourse = (pageNum,pageSize,ctId,searchUser) => ajax(`${BASE_URL}/user/pageQuerySelectCourseUser/${pageNum}/${pageSize}/${ctId}`,searchUser,POST);
//根据课时id查询用户列表
export const pageQuerySelectTeachingUser = (pageNum,pageSize,teachingId,searchUser) => ajax(`${BASE_URL}/user/pageQuerySelectTeachingUser/${pageNum}/${pageSize}/${teachingId}`,searchUser,POST);

export const login = (user) => ajax(`${AUTH_BASE_URL}/userlogin`,user,POST);

export const getUser = id => ajax(`${BASE_URL}/user/${id}`,{},GET);

//保存课程数据信息
export const saveUser = (user) => ajax(`${BASE_URL}/user/save`,user,POST);
//删除课程信息
export const delUsers = (ids) => ajax(`${BASE_URL}/user/dels`,ids,POST);

//注册用户
export const registerUser = user => ajax(`${BASE_URL}/user/register`,user,POST);

//发送验证码
export const sendCode = phone => ajax(`${BASE_URL}/user/smsCode`,{phone},GET);

//选择课程
export const addCourse = courseId => ajax(`${BASE_URL}/user/addCourse`,courseId,GET);

//查询用户对应的课程
export const findCourse = () => ajax(`${BASE_URL}/user/findCourse`,{},GET);

//获取用户信息
export const getUserInfo = () => ajax(`${BASE_URL}/user/getUserInfo`,{},GET);

//导出老师信息
export const exportTeacher = () => ajax(`${BASE_URL}/excel/teacherExport`,{},GET);

//退出
export const logout = () => ajax(`${BASE_URL}/user/logout`,{},GET);
