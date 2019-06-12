/*
  课程管理请求接口定义
 */
import ajax from '../ajax'
import {DELETE,GET,POST,PUT} from '../requestTypes'
const BASE_URL = 'http://localhost:8080';
// 获取上课时间集合
export const getAltTimes = () => ajax(`${BASE_URL}/altTimeService/findAll`,{},GET);
