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
          path: 'userInfo',
          name: 'userInfo',
          component: resolve => require(['@/page/user/userInfo'], resolve)
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
          },
          {
            path: 'manageOrder',
            name: 'ManageOrder',
            component: resolve => require(['@/page/manager/ManageOrder'], resolve)
          },
          {
            path: 'manageCar',
            name: 'ManageCar',
            component: resolve => require(['@/page/manager/ManageCar'], resolve)
          },
          {
            path: 'orderDetails',
            name: 'OrderDetails',
            component: resolve => require(['@/page/manager/OrderDetails'], resolve)
          },
          {
            path: 'manageCarDetails',
            name: 'ManageCarDetails',
            component: resolve => require(['@/page/manager/carDetails'], resolve)
          }
        ]
      },
      {
        path: 'car',
        name: 'car',
        component: resolve => require(['@/page/parent'], resolve),
        children: [
          {
            path: 'carDetails',
            name: 'carDetails',
            component: resolve => require(['@/page/carDetails'], resolve)
          },
        ]
      }
    ]
  }
];

export default new Router({
  routes
});
