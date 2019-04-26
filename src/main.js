// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'
import jsCookie from 'js-cookie'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'

import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import './assets/reset.css'
import './assets/iconfont.css'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

Vue.prototype.$cookie = jsCookie

Vue.use(VueAwesomeSwiper, {})
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.use(VueLazyload, {
    preLoad: 1,
    loading: require('./assets/images/default.png'),
    error: require('./assets/images/default.png')
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
