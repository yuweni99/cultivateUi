/*
  角色管理请求接口定义
 */
import ajax from '../ajax'
import {DELETE,GET,POST,PUT} from '../requestTypes'
const BASE_URL = 'http://localhost:8080';
//保存角色许可信息
export const saveRole = (rolePermission) => ajax(`${BASE_URL}/rolePermission/batchSave`,rolePermission,POST);
//查询对应角色的许可id集合
export const findPermissionIds = (roleId) => ajax(`${BASE_URL}/rolePermission/findPermissionIds/${roleId}`,GET);

