/*
  课时管理请求接口定义
 */
import ajax from '../ajax'
import {DELETE,GET,POST,PUT} from '../requestTypes'
const BASE_URL = 'http://localhost:8080';
// 分页过滤查询课时信息
export const getTeachingPageQuery = (pageNum,pageSize,searchTeaching) => ajax(`${BASE_URL}/teaching/pageQuery/${pageNum}/${pageSize}`,searchTeaching,POST);

//根据id查询课时信息
export const getTeaching = id => ajax(`${BASE_URL}/teaching/${id}`,{},GET);
//保存课时数据信息
export const saveTeaching = (course) => ajax(`${BASE_URL}/teaching/save`,course,POST);
//删除课时信息
export const delTeaching = (id) => ajax(`${BASE_URL}/teaching/del/${id}`,ids,DELETE);


