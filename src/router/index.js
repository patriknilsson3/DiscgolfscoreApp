import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../components/Home';
import Game from '../components/Game';
import CreateGame from '../components/CreateGame';
import SignUp from '../components/SignUp';

const router = new VueRouter({
  pageRouting: true,
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/createGane',
      component: CreateGame,
      meta: {
        title: 'CreateGame',
      },
    }, 
    {
      path: '/signUp',
      component: SignUp,
      meta: {
        title: 'SignUp',
      },
    },  
    {
      path: '/game',
      component: Game,
      meta: {
        title: 'Game',
      },
    },
    {path: '*', redirect: '/home'},
  ],
});

router.replace('/home');

module.exports = router;
