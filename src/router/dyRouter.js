import Dymain from '@/layout/dymain'

export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path:'',
    component: Dymain,
    hidden: true,
    children: [
      // 此处放大音平台路由
      {
        name:'Home',
        path: '/home',
        component: (resolve) => require(['@/views/dy/panorama/index'], resolve),
        meta: {
          showMainBanner: true
        }
      }, {
        name:'stationstore',
        path: '/stationstore',
        component: (resolve) => require(['@/views/dy/stationstore'], resolve),
        meta: {
          title: '站店听音-我的',
          keepAlive: true,
          showMainBanner: true
        }
      },{
        name:'StationStoreEdit',
        path: '/stationStoreEdit/:id',
        component: (resolve) => require(['@/views/dy/stationstore/stationStoreEdit'], resolve),
        meta: {
          showMainBanner: true
        }
      },{
        name:'stationStoreQuestion',
        path: '/stationStoreQuestion',
        component: (resolve) => require(['@/views/dy/stationstore/stationStoreQuestion'], resolve),
        meta: {
          title: '站店听音-我的',
          keepAlive: true,
          showMainBanner: true
        }
      },{
        name:'StationStoreQuestionEdit',
        path: '/stationStoreQuestionEdit/:type/:id/:applyId',
        component: (resolve) => require(['@/views/dy/stationstore/stationStoreQuestionEdit'], resolve),
        meta: {
          showMainBanner: true
        }
      },
      {
        name: 'auditionMain',
        path: '/auditionMain',
        component: (resolve) => require(['@/views/dy/audition/auditionMain'],resolve),
        meta: {
          title: '站店听音-主页',
          keepAlive: true,
          showMainBanner:true
        }
      },
      {
        name: 'auditionMy',
        path: '/auditionMy',
        component: (resolve) =>  require(['@/views/dy/audition/auditionMy'],resolve),
        meta: {
          title: '站店听音-我的',
          keepAlive: true,
          showMainBanner:true
        }
      },
      {
        name: 'auditionPrompt',
        path: '/auditionPrompt',
        component: (resolve) =>  require(['@/views/dy/audition/auditionPrompt'],resolve),
        meta: {
          title: '站店听音-无权限',
          keepAlive: true,
          showMainBanner:true
        }
      },
      {
        name: 'auditionPrecise',
        path: '/auditionPrecise',
        component: (resolve) =>  require(['@/views/dy/audition/auditionPrecise.vue'],resolve),
        meta: {
          title: '站店听音-精准推音',
          keepAlive: true,
          showMainBanner:true
        }
      },
      {
        name: 'ReportList',
        path: '/reportList',
        component: () =>
          import('@/views/dy/shareCenter/report-center/ReportList.vue'),
        meta: {
          title: '报表列表',
          keepAlive: true,
          showMainBanner: true
        }
      }, {
        name: 'ReportHome',
        path: '/reportHome',
        component: () =>
          import('@/views/dy/shareCenter/report-center/ReportHome'),
        meta: {
          title: '报表首页',
          keepAlive: true,
          showMainBanner: true
        }
    },

      // 工作流路由
      {
        name: 'WorkFlow',
        path: '/workflow/:id?',
        component: () =>
          import('@/views/workflow/index.vue'),
        meta: {
          showMainBanner: true
        }
      }, {
        name: 'Add',
        path: '/add/:id1?/:id2?/:indentyId?',
        component: () =>
          import('@/views/workflow/add/index.vue'),
        meta: {
          showMainBanner: true
        }
      },
      {
        path: '/permission',
        component: () => import('@/views/dy/permissionApplication/index'),
        name: 'Permission',
        meta: { title: '权限申请',showMainBanner:false },
      },

      {
        path: '/unsatisfyAnalysis/customerQuery',
        component: () => import('@/views/dy/unsatifyAnalysis/customerQuery'),
        name: 'CustomerQuery',
        meta: { title: '客群查询', showMainBanner: true },
      },

      {
        path: '/unsatisfyAnalysis/customerAnalysis',
        component: () => import('@/views/dy/unsatifyAnalysis/customerAnalysis'),
        name: 'CustomerAnalysis',
        meta: { title: '客群分析', showMainBanner: true },
      },
      {
        path: '/panorama/complaint-index',
        component: () => import('@/views/dy/panorama/ComplaintIndex'),
        name: 'ComplaintIndex',
        meta: { title: '工信部投诉视图', showMainBanner: true },
      }
      

    ]
  },
   
];
