import Vue from 'vue'
import Vuex from 'vuex'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element);
Vue.use(Vuex);

import Notification from './components/notification.vue'
import store from './store'

// WebSocket を作成
const socket = require('./websocket-guest');
// メッセージを Listen する
socket.addEventListener('message', (event) => {
    app.notification(JSON.parse(event.data));
});

let app;
document.addEventListener('DOMContentLoaded', function() {
  const div = document.createElement('div');
  div.innerHTML = '<notification></notification>';
  document.body.appendChild(div);

  app = new Vue({
    el: div,
    store,
    components:{
      Notification
    },
    methods: {
      test: function(){
        this.$notify({
          message: 'This is a message that does not automatically close',
          type: 'success'
        });
      },
      notification: function(data){
        let massage = {
          type: data.type,
          summary: data.summary,
          detail: data.detail
        }

        this.$notify({
          message: massage.summary,
          type: 'success',
          onClick: () => {
            this.$store.commit('dialogVisible', {
              visible: true,
              detail: data.detail
            });
          }
        });
      }
    }
  })
});
