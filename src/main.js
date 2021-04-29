import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";
import './assets/tailwind.scss'

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "MainMenu",
      component: () => import("../src/components/MainMenu") },
    {
      path: "/GameBoard",
      name: "GameBoard",
      props: true,
      component: () =>
        import("../src/components/GameBoard.vue")
    }
  ]
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
