import Vue from 'nativescript-vue';
import router from './router';
import store from './store';
import './styles.css';

// Uncomment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;
Vue.prototype.$url = function() {
  return "http://b3f1959d.eu.ngrok.io/";
}
new Vue({

  router,

  store,

}).$start();
