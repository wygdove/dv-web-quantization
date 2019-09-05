
const menu_config=[
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
        title: '深交一天',
        name: 'R-001',
        path: '/account/dailyaccount',
        component: () => import('../modules/account/dailyaccount'),
      },
    ]
  },





];


export default menu_config;

