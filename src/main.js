import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

Vue.use(Antd);

router.beforeEach(({ path }, from, next) => {
  if (path === '/') {
    return next('/lfpRestaurant')
  }
  console.log('beforeEach')
  console.log(store)
  console.log(store.getters.AUTH_TOKEN)
  console.log(store.state, store.state.Test, store.state.Test.auth, store.state.Test.auth.token)
  const isLogin = Boolean(store.getters.AUTH_TOKEN) || Boolean(store.state.Test.auth.token)
  const URL = isLogin ? '/DESK/User/dishmenu' : '/lfpRestaurant'
  const isNext = (isLogin && URL !== path && path === '/lfpRestaurant') || (!isLogin && URL !== path)
  if (isNext) {
    next(URL)
  } else {
    next()
  }
})

let instance = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

console.log(instance)