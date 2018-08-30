import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import PushForm from './components/push-form.vue'

Vue.use(Element);

// WebSocket を作成
const socket = require('./websocket-host');

const app = new Vue({
  el: '#app',
  components:{
    PushForm
  }
})
