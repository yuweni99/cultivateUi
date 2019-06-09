/*
上课时间管理接口请求api
 */
import ajax from '../ajax'
import {DELETE,GET,POST,PUT} from '../requestTypes'
const BASE_URL = 'http://localhost:8080';

// 分页过滤查询教室信息
export const getAlternativeTimePageQuery = (pageNum,pageSize,searchAlternativeTime) => ajax(`${BASE_URL}/altTimeService/pageQuery/${pageNum}/${pageSize}`,searchAlternativeTime,POST);

//根据id查询教室信息
export const getAlternativeTime = id => ajax(`${BASE_URL}/altTimeService/${id}`,{},GET);
//保存教室数据信息
export const saveAlternativeTime = (classroom) => ajax(`${BASE_URL}/altTimeService/save`,classroom,POST);
//删除教室信息
export const delAlternativeTimes = (ids) => ajax(`${BASE_URL}/altTimeService/dels`,ids,POST);

