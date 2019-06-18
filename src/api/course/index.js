/*
  课程管理请求接口定义
 */
import ajax from '../ajax'
import {DELETE,GET,POST,PUT} from '../requestTypes'
const BASE_URL = 'http://localhost:8080';
// 分页过滤查询课程信息
export const getCoursePageQuery = (pageNum,pageSize,searchCourse) => ajax(`${BASE_URL}/course/pageQuery/${pageNum}/${pageSize}`,searchCourse,POST);

export const pageQueryTeacherCanSelectCourse = (pageNum,pageSize,searchCourse) => ajax(`${BASE_URL}/course/pageQueryTeacherCanSelectCourse/${pageNum}/${pageSize}`,searchCourse,POST);

//根据id查询课程信息
export const getCourse = id => ajax(`${BASE_URL}/course/${id}`,{},GET);
//保存课程数据信息
export const saveCourse = (course) => ajax(`${BASE_URL}/course/save`,course,POST);
//删除课程信息
export const delCourses = (ids) => ajax(`${BASE_URL}/course/dels`,ids,POST);
//获取所有课程信息
export const getCourses = () => ajax(`${BASE_URL}/course/findAll`,{},GET);
