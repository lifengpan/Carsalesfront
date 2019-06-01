import Vue from 'vue'
import Vuex from 'vuex'

import Test from './login'
import User from './user'
import Manager from './manager'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Test,
    User,
    Manager
  }
});
