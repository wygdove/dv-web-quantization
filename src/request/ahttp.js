import axios from 'axios'
import qs from 'qs'


if (process.env.NODE_ENV==='development') {
  axios.defaults.baseURL='https://www.baidu.com';
} else if (process.env.NODE_ENV==='debug') {
  axios.defaults.baseURL='https://www.ceshi.com';
} else if (process.env.NODE_ENV==='production') {
  axios.defaults.baseURL='https://www.production.com';
}

axios.defaults.timeout=10000;
axios.defaults.headers.post['Content-Type']='application/json;charset=UTF-8';



export const aget=function(url,params) {
  axios.get(url, {
    params: params
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
};





