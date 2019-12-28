const axios = require('axios')
import config from './config';




axios.interceptors.request.use(
	config => {
    config.headers['X-Requested-With']='XMLHttpRequest';
		if(!sessionStorage.tokenId) {
			sessionStorage.tokenId='';
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);


axios.interceptors.response.use(function(response) {
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
export function j_post(url,data = {}) {
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
