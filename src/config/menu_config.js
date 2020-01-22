
const menu_config=[
  {
    path: '/',
    show: 'false',
    redirect: '/index'
  },
  {
    title: '主页',
    name: 'index',
    path: '/index',
    component: () => import('../modules/index/index')
  },
  {
    title: '账本',
    name: 'account',
    path: '/account',
    component: () => import('../modules/index/index'),
    children: [
      {
        title: '用户账本',
        name: 'userAccount',
        path: '/account/userAccount',
        component: () => import('../modules/account/userAccount')
      },
      {
        title: '账本明细',
        show: 'false',
        name: 'accountDetail',
        path: '/account/userAccount/accountDetail',
        component: () => import('../modules/account/accountDetail')
      }
    ]
  },
  {
    title: '指数基金',
    name: 'indice',
    path: '/indice',
    component: () => import('../modules/index/index'),
    children: []
  },
  {
    title: '股票',
    name: 'stock',
    path: '/stock',
    component: () => import('../modules/index/index'),
    children: [
      {
        title: '大盘',
        name: 'market',
        path: '/stock/market',
        component: () => import('../modules/stock/market')
      },
      {
        title: '长投白马股',
        name: 'whiteHorse',
        path: '/stock/whiteHorse',
        component: () => import('../modules/stock/whiteHorse')
      }
    ]
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
        component: () => import('../modules/nationaldebt/R-001')
      },
      {
        title: '国债',
        name: 'ndebt',
        path: '/nationaldebt/ndebt',
        component: () => import('../modules/nationaldebt/ndebt')
      }
    ]
  },





];


export default menu_config;

