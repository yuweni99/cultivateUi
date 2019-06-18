/*
教室管理接口请求api
 */
import ajax from '../ajax'
import {DELETE,GET,POST,PUT} from '../requestTypes'
const BASE_URL = 'http://localhost:8080';

// 分页过滤查询老師课程信息
export const getCourseTeacherPageQuery = (pageNum,pageSize,searchStudentTeaching) => ajax(`${BASE_URL}/courseTeacher/pageQuery/${pageNum}/${pageSize}`,searchStudentTeaching,POST);

//查询教师对应的课程
export const findTeacherCourse = () => ajax(`${BASE_URL}/courseTeacher/findTeacherCourse`,{},GET);
//分页查询教师对应课程
export const getPageQueryTeacherCourse = (pageNum,pageSize,searchStudentTeaching) => ajax(`${BASE_URL}/courseTeacher/pageQueryTeacherCourse/${pageNum}/${pageSize}`,searchStudentTeaching,POST);
//选择课程
export const selectCourse = (courseId) => ajax(`${BASE_URL}/courseTeacher/selectCourse/${courseId}`,{},GET);
