import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import VueDevtools from 'nativescript-vue-devtools'

import tokenStore from './modules/tokenStore';
import userStore from './modules/userStore';
import gameStore from './modules/gameStore';

Vue.use(Vuex);
Vue.use(VueDevtools)

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    tokenStore,
    userStore,
    gameStore
  },
  strict: debug,
});

Vue.prototype.$store = store;

module.exports = store;