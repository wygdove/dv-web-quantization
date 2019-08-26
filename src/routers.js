import Vue from "vue"
import VueRouter from 'vue-router'

import R_001 from './modules/nationaldebt/R-001.vue'


Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path:'/',
      redirect:'/R_001'
    },
    {
      path: '/R_001',
      component: R_001,
      name: 'R_001'
    }]
});

export default router
