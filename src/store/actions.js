/**
 * 直接操作mutation，间接修改state模块
 */
import {SAVE_TOKEN,USER_INFO} from './mutation-types'

export default {
  //保存token
  saveToken({commit},token){
    commit(SAVE_TOKEN,{token});
  }
}
