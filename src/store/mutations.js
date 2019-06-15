/*
  直接修改state模块
 */
import {SAVE_TOKEN,SAVE_USER_INFO,CLEAR_USER_INFO,CLEAR_TOKEN} from './mutation-types'
export default {
  [SAVE_TOKEN](state,{token}){
    state.token = token;
  },
  [SAVE_USER_INFO](state,{userInfo}){
    state.userInfo = userInfo;
  },
  [CLEAR_USER_INFO](state){
    state.userInfo = {};
  },
  [CLEAR_TOKEN](state){
    state.token = '';
  },
}
