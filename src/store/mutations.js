/*
  直接修改state模块
 */
import {SAVE_TOKEN,USER_INFO} from './mutation-types'
export default {
  [SAVE_TOKEN](state,{token}){
    console.log(token,state)
    state.token = token;
  }
}
