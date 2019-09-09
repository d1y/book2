import Vue from 'vue'
import App from './App'

import Utils from './utils'
console.log(Utils)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})

// console.log(process.env)

app.$mount()
