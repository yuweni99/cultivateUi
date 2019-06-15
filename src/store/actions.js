/**
 * 直接操作mutation，间接修改state模块
 */
import {SAVE_TOKEN,SAVE_USER_INFO,CLEAR_TOKEN,CLEAR_USER_INFO} from './mutation-types'

export default {
  //保存token
  saveToken({commit},token){
    commit(SAVE_TOKEN,{token});
  },
  saveUserInfo({commit},userInfo){
    commit(SAVE_USER_INFO,{userInfo});
  },
  clearUserInfo({commit}){
    commit(CLEAR_USER_INFO);
  },
  clearToken({commit}){
    commit(CLEAR_TOKEN);
  }
}
