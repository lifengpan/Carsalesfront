import Vue from 'vue';

import Router from 'vue-router';

Vue.use(Router);

let routes = [
  {
    path: '/lfpRestaurant',
    name: 'lfpRestaurant',
    component: resolve => require(['@/page/loging'], resolve)
  },
  {
    path: '/DESK',
    name: 'DESK',
    component: resolve => require(['@/page/index'], resolve),
    children: [
      {
        path: 'User',
        name: 'DeskUser',
        component: resolve => require(['@/page/parent'], resolve),
        children: [{
          path: 'dishmenu',
          name: 'dishmenu',
          component: resolve => require(['@/page/user/dishmenu'], resolve)
        }, {
          path: 'orderList',
          name: 'OrderList',
          component: resolve => require(['@/page/user/OrderList'], resolve)
        }, {
          path: 'test',
          name: 'test',
          component: resolve => require(['@/page/Flowchart'], resolve)
        }]
      }
    ]
  }
];

export default new Router({
  routes
});
