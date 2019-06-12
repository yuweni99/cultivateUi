/*
教室管理接口请求api
 */
import ajax from '../ajax'
import {DELETE,GET,POST,PUT} from '../requestTypes'
const BASE_URL = 'http://localhost:8080';

// 分页过滤查询老師课程信息
export const getCourseTeacherPageQuery = (pageNum,pageSize,searchStudentTeaching) => ajax(`${BASE_URL}/courseTeacher/pageQuery/${pageNum}/${pageSize}`,searchStudentTeaching,POST);

//查询教师对应的课程
export const getCourses = () => ajax(`${BASE_URL}/courseTeacher/findAll`,{},GET);
