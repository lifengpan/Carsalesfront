import Vue from "vue";

import Router from "vue-router";

Vue.use(Router);

let routes = [
  {
    path: "/lfpRestaurant",
    name: "lfpRestaurant",
    component: resolve => require(["@/page/loging"], resolve)
  }
];

export default new Router({
  routes
});
