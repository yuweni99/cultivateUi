import axios from 'axios'
import store from '../store'

const token = store.state.token;
if (token) {
  //携带请求头
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

//上传文件工具类
export const uploadFile = (url,data) => {

  let config = {
    headers: {'Content-Type': 'multipart/form-data'}
  }; //添加请求头

  return new Promise((resolve,reject) => {
    axios.post(url, data, config)
      .then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
    });

  })

};
