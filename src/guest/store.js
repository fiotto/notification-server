import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dialogVisible: false,
    detail: ''
  },
  getters: {
    dialogVisible: function(state){
      return state.dialogVisible;
    },
    detail: function(state){
      return state.detail;
    }
  },
  actions: {
  },
  mutations: {
    dialogVisible: function(state, visible, detail){
      state.dialogVisible = visible.visible;
      state.detail = visible.detail;
    }
  }
})
