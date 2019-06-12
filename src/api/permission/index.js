/*
许可管理接口请求api
 */
import ajax from '../ajax'
import {DELETE,GET,POST,PUT} from '../requestTypes'
const BASE_URL = 'http://localhost:8080';

//查询所有的许可信息
export const getPermissions = () => ajax(`${BASE_URL}/permission/findAll`,{},GET);
//获取许可详细信息
export const getPermission = (id) => ajax(`${BASE_URL}/permission/${id}`,{},GET);
//保存许可详细信息
export const savePermission  = (permission) => ajax(`${BASE_URL}/permission/save`,permission,POST);
//删除许可信息
export const delPermission = (id) => ajax(`${BASE_URL}/permission/${id}`,{},DELETE);
