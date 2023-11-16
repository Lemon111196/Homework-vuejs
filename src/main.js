import Vue from 'vue'
import App from './App.vue'
import router from './router/routes'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { setInteractionMode } from "vee-validate";
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
import "@/assets/scss/global.scss"
import store from '@/store';
setInteractionMode("passive");

const options = {};
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Toast, options)
Vue.config.productionTip = false
router.beforeEach((to, __, next) => {
  const localToken = localStorage.getItem("token");
  if (localToken) {
    store.dispatch("verifyAuth", localStorage);
    if (to.name.includes("login") || to.name.includes("register")) {
      next({ name: 'note-list' })
    } else {
      next();
    }
  } else {
    if (to.meta.auth) {
      next({ name: "login" });
    } else {
      next();
    }
  }
  // console.log(to.meta);//là route hiện tại
  // // console.log(from);//là route trước khi vào
  // console.log(next);
  // if (to.meta.isAuth) {
  //   return
  // }else{
  //   next();
  // }
  next();//phải có thì route mới chạy đc

});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
