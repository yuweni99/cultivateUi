/*
  角色管理请求接口定义
 */
import ajax from '../ajax'
import {DELETE,GET,POST,PUT} from '../requestTypes'
const BASE_URL = 'http://localhost:8080';
// 分页过滤查询课程信息
export const getRolePageQuery = (pageNum,pageSize,searchRole) => ajax(`${BASE_URL}/role/pageQuery/${pageNum}/${pageSize}`,searchRole,POST);

//根据id查询课程信息
export const getRole = id => ajax(`${BASE_URL}/role/${id}`,{},GET);
//保存课程数据信息
export const saveRole = (user) => ajax(`${BASE_URL}/role/save`,user,POST);
//删除课程信息
export const delRoles = (ids) => ajax(`${BASE_URL}/role/dels`,ids,POST);


