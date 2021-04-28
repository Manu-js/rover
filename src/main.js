import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Config",
      component: () => import("../src/components/Config") },
    {
      path: "/GameMenu",
      name: "GameMenu",
      component: () =>
        import("../src/components/GameMenu.vue")
    },
    {
      path: "/ScoreBoard",
      name: "ScoreBoard",
      component: () =>
        import("../src/components/ScoreBoard.vue")
    }
  ]
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
