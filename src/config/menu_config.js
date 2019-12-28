
const menu_config=[
  {
    path: '/',
    redirect: '/index',
    show: 'false'
  },
  {
    title: '主页',
    name: 'index',
    path: '/index',
    component: () => import('../modules/index/index')
  },
  {
    title: '债券',
    name: 'nationaldebt',
    path: '/nationaldebt',
    component: () => import('../modules/index/index'),
    children: [
      {
        title: '深交一天',
        name: 'R-001',
        path: '/nationaldebt/R-001',
        component: () => import('../modules/nationaldebt/R-001'),
      },
      {
        title: '国债',
        name: 'ndebt',
        path: '/nationaldebt/ndebt',
        component: () => import('../modules/nationaldebt/ndebt'),
      }
    ]
  },
  {
    title: '账本',
    name: 'account',
    path: '/account',
    component: () => import('../modules/index/index'),
    children: [
      {
        title: '日账单',
        name: 'dailyaccount',
        path: '/account/dailyaccount',
        component: () => import('../modules/account/dailyaccount'),
      },
      {
        title: '账本配置',
        name: 'classConfig',
        path: '/account/accountConfig/classConfig',
        component: () => import('../modules/account/accountConfig/classConfig'),
      },
    ]
  },





];


export default menu_config;

