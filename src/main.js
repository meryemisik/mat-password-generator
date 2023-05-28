import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue/lib'

Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
