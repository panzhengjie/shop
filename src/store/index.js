import VueX from 'vuex';
import Vue from 'vue';
Vue.use(VueX);
import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
export default new VueX.Store({
  state,
  actions,
  mutations,
  getters
})
