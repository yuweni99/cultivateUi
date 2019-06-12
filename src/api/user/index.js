/*
  课程管理请求接口定义
 */
import ajax from '../ajax'
import {DELETE,GET,POST,PUT} from '../requestTypes'
const BASE_URL = 'http://localhost:8080';
// 分页过滤查询课程信息
export const getUserPageQuery = (pageNum,pageSize,searchUser) => ajax(`${BASE_URL}/user/pageQuery/${pageNum}/${pageSize}`,searchUser,POST);

//根据id查询课程信息
export const getUser = id => ajax(`${BASE_URL}/user/${id}`,{},GET);
//保存课程数据信息
export const saveUser = (user) => ajax(`${BASE_URL}/user/save`,user,POST);
//删除课程信息
export const delUsers = (ids) => ajax(`${BASE_URL}/user/dels`,ids,POST);


//选择课程
export const addCourse = (courseId) => ajax(`${BASE_URL}/user/addCourse`,courseId,GET);

//查询用户对应的课程
export const findCourse = () => ajax(`${BASE_URL}/user/findCourse`,{},GET);
