import Vue from 'vue'
import Vuex from 'vuex'

import Test from './login'
import User from './user'
import Manager from './manager'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const Store = new Vuex.Store({
  modules: {
    Test,
    User,
    Manager
  },
  plugins: [createPersistedState()]
});

console.log('Store: ', Store)

export default Store
