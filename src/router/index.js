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
      },
      {
        path: 'manager',
        name: 'Manager',
        component: resolve => require(['@/page/parent'], resolve),
        children: [
          {
            path: 'dishList',
            name: 'DishList',
            component: resolve => require(['@/page/manager/DishList'], resolve)
          },
          {
            path: 'userList',
            name: 'UserList',
            component: resolve => require(['@/page/manager/UserList'], resolve)
          }
        ]
      }
    ]
  }
];

export default new Router({
  routes
});
