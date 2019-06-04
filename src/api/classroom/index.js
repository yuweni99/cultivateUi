/*
教室管理接口请求api
 */
import ajax from '../ajax'
import {DELETE,GET,POST,PUT} from '../requestTypes'
const BASE_URL = 'http://localhost:8080';

// 分页过滤查询教室信息
export const getClassroomPageQuery = (pageNum,pageSize,searchClassroom) => ajax(`${BASE_URL}/classroom/pageQuery/${pageNum}/${pageSize}`,searchClassroom,POST);

//根据id查询教室信息
export const getClassroom = id => ajax(`${BASE_URL}/classroom/${id}`,{},GET);
//保存教室数据信息
export const saveClassroom = (classroom) => ajax(`${BASE_URL}/classroom/save`,classroom,POST);
//删除教室信息
export const delClassrooms = (ids) => ajax(`${BASE_URL}/classroom/dels`,ids,POST);
