/*
教室管理接口请求api
 */
import ajax from '../ajax'
import {DELETE,GET,POST,PUT} from '../requestTypes'
const BASE_URL = 'http://localhost:8080';

// 分页过滤查询教室信息
export const getStudentTeachingPageQuery = (pageNum,pageSize,searchStudentTeaching) => ajax(`${BASE_URL}/studentTeaching/pageQuery/${pageNum}/${pageSize}`,searchStudentTeaching,POST);
//预定课程
export const fixInAdvanceTeaching = (studentTeachingId,status) => ajax(`${BASE_URL}/studentTeaching/updateStatusById/${studentTeachingId}/${status}`,{},GET);
//查看学生课程相关信息
export const findBeInterrelated = (id) => ajax(`${BASE_URL}/studentTeaching/${id}`,{id},GET);
