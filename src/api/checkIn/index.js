/*
教室管理接口请求api
 */
import ajax from '../ajax'
import {DELETE,GET,POST,PUT} from '../requestTypes'
const BASE_URL = 'http://localhost:8080';

// 学生签到
export const studentCheck = (teachingId) => ajax(`${BASE_URL}/checkIn/studentCheck/${teachingId}`,{},GET);

//老师发起签到
export const teacherSendCheck = (signIn) => ajax(`${BASE_URL}/checkIn/teacherSendCheck`,signIn,POST);

