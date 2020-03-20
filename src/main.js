// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';
import Axios from 'axios';

Vue.config.productionTip = false
Vue.use(ElementUI,{size: 'mini'});
Vue.prototype.$axios = Axios;
Vue.prototype.$echarts = echarts;

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Axios,
  components: { App },
  template: '<App/>'
})
