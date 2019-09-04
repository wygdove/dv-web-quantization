

var pathModules='../modules/';


const menu_config=[
  {
    title: "主页",
    name: 'mainpage',
    path: '/',
    redirect: '/nationaldebt/R-001'
  },
  {
    title: "债券",
    name: 'bond',
    path: '/nationaldebt',
    children: [
      {
        title: "国债",
        name: 'ndebt',
        path: '/nationaldebt/ndebt',
        component: () => import('../modules/nationaldebt/ndebt')
      },
      {
        title: "深交1天期",
        name: 'R-001',
        path: '/nationaldebt/R-001',
        component: () => import('../modules/nationaldebt/R-001')
      },
    ]
  },
  {
    title: "账本",
    name: 'account',
    path: '/account',
    children: [
      {
        title: "日账单",
        name: 'dailyaccount',
        path: '/account/dailyaccount',
        component: () => import('../modules/account/dailyaccount')
      },
    ]
  },

];

export default menu_config;
