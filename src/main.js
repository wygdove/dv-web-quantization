import Vue from 'vue';
import App from './App.vue';
import router from "./config/routers";

import CommonUtil from "./utils/CommonUtil";
// import API from './api/api';
import {post,fetch,patch,put} from './api/http';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './app.css'


Vue.use(ElementUI);


// const api=new API();


Vue.prototype.CommonUtil=CommonUtil;
// Vue.prototype.$api=api;
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;



new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

