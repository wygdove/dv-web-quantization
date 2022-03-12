const axios = require('axios');
import config from './config';
import { Message } from 'element-ui';



axios.interceptors.request.use(
	config => {
    config.headers['X-Requested-With']='XMLHttpRequest';
    // config.headers['Access-Control-Allow-Origin']='true';
    // config.headers['Accept']='application/json';
    if(config.url.startsWith("/jisilu")) {
      config.url = config.url + '?___jsl=LST___t=' + new Date().getTime();
    }else {
      config.url = config.url + '?num=' + new Date().getTime() + (Math.random()*1000).toFixed();
    }
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);


axios.interceptors.response.use(function(response) {
  if(response&&response.config&&response.config.url&&
    response.config.url.startsWith("/api/")&&response.data) {
    var res=response.data;
    if(res.code==="000000"&&res.result) {
      return response;
    } else {
      var msg="操作失败！";
      if(res&&res.message!=="") {
        msg=res.message;
      }
      Message({type:'error',message:msg,showClose:true,duration:5000});
      return;
    }
  }
  return response;
},function(error) {
	console.error(error);
});







/**
 * 封装get方法
 */
export function fetch(url,params={}) {
	return new Promise(
	  (resolve,reject) => {
		axios.get(config.baseURL+url,{
      params:params
    },config)
		.then(response => {
		  if(response&&response.data) {
        resolve(response.data);
      }
		})
		.catch(err => {
			reject(err)
		})
	})
}


/**
 * 封装post请求
 */
export function post(url,data = {}) {
  return new Promise((resolve,reject) => {
    axios.post(config.baseURL+url,data)
      .then(response => {
        if(response&&response.data) {
          resolve(response.data);
        }
      },err => {
        reject(err)
      })
  })
}


/**
 * 封装patch请求
 */
export function patch(url,data = {}) {
	return new Promise((resolve,reject) => {
		axios.patch(config.baseURL+url,data,config)
		.then(response => {
      if(response&&response.data) {
        resolve(response.data);
      }
		},err => {
			reject(err)
		})
	})
}


/**
 * 封装put请求
 */
export function put(url,data = {}) {
	return new Promise((resolve,reject) => {
		axios.put(config.baseURL+url,data,config)
		.then(response => {
      if(response&&response.data) {
        resolve(response.data);
      }
		},err => {
			reject(err)
		})
	})
}
