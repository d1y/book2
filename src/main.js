import Vue from 'vue'
import App from './App'
import $storage from './utils/toy/storage'

Vue.config.productionTip = false

Vue.prototype.$storage = $storage

App.mpType = 'app'

const app = new Vue({
  ...App
})

// console.log(process.env)

app.$mount()
