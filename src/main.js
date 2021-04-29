import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";
import './assets/tailwind.css'

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
      path: "/GameMenu",
      name: "GameMenu",
      props: true,
      component: () =>
        import("../src/components/GameMenu.vue")
    }
  ]
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
