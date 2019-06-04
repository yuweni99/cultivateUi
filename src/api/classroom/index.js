/*
教室管理接口请求api
 */
import ajax from '../ajax'
import {DELETE,GET,POST,PUT} from '../requestTypes'
const BASE_URL = 'http://localhost:8080';

// 分页过滤查询教室信息
export const getCoursePageQuery = (pageNum,pageSize,searchCourse) => ajax(`${BASE_URL}/classroom/pageQuery/${pageNum}/${pageSize}`,searchCourse,POST);

//根据id查询教室信息
export const getCourse = id => ajax(`${BASE_URL}/classroom/${id}`,{},GET);
//保存教室数据信息
export const saveCourse = (course) => ajax(`${BASE_URL}/classroom/save`,course,POST);
//删除教室信息
export const delCourses = (ids) => ajax(`${BASE_URL}/classroom/dels`,ids,POST);
