// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/index.js'
import utils from './utils/index.js'
import swiper from '../static/js/swiper.min.js'
import axios from 'axios'

//引入设置全局变量js
import globalConst from './config/global_const.js';
Vue.prototype.$api=api
Vue.prototype.$utils=utils
Vue.prototype.$swiper=swiper
Vue.prototype.$http = axios
//Vue.prototype.mui=mui
Vue.prototype.img_URL = 'http://cdn-fpub.fenqihui.com/'
Vue.config.productionTip = false

Object.keys(globalConst).forEach((key)=>{
    Vue.prototype[key] = globalConst[key];
})

/* eslint-disable no-new */
var vueScope=new Vue({
  el: '#app',
  router,
  
  api,
  utils,
  swiper,
  axios,
//mui,
  template: '<App/>',
  components: { App },
  methods: {
    clickTest(){
      console.log("调用了");
    }
  },
  watch:{
    $route(){
     $('body,html').animate({
          scrollTop: 0
        },0);
    }
  }
})
//vueScope.clickTest()
