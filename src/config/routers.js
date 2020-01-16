import Vue from "vue"
import VueRouter from 'vue-router'
import menu_config from "./menu_config"


Vue.use(VueRouter);



const routes=[
  {
    path: '/',
    component: () => import('../modules/index/layout'),
    children: menu_config
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
});


export default router
