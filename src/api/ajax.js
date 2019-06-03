import axios from 'axios'
import {DELETE,GET,POST,PUT} from './requestTypes'
//携带cookie
axios.defaults.withCredentials = true;


export default function ajax(url,data,method = GET) {

  return new Promise((resolve,reject) =>{


    let promise;

    switch (method) {
      case GET: {
        promise = sendGetReq(data,url);
        break;
      }
      case POST:{
        promise = sendPostReq(data,url);
        break;
      }
      case PUT:{
        promise = sendPutReq(data,url);
        break;
      }
      case DELETE:{
        promise = sendDeleteReq(data,url);
        break;
      }
    }

    promise.then(response => {
      //成功回调
      resolve(response.data);
    }).catch(error => {
      reject(error);
    })


  })

}


//发送get请求
const sendGetReq = (data,url) => {
  //发送get请求
  let params = '';
  //拼接参数

  Object.keys(data).forEach( key => {
    params += key + '=' + data[key] + '&';
  });

  //去掉最后对于的&
  if(params){
    params = params.substring(0,params.length-1);
  }

  return axios.get(url + '?' + params);
};

//发送post请求
const sendPostReq = (data,url) => {
//发送post请求
  return axios.post(url,data);
};

//发送delete请求
const sendDeleteReq = (data,url) => {
  return axios.delete(url,data);
};

//发送put请求
const sendPutReq = (data,url) => {
  return axios.put(url,data);
};
