import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router'
import store from './store';
import IdleVue from 'idle-vue';

Vue.config.productionTip = false
Vue.config.devtools = true

const eventsHub = new Vue();

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  events:['onclick'],
  store,
  idleTime: 900000, // 15 mins
  startAtIdle: false
})


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
