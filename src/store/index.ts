import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import Test from "./modules/test"

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Test
  }
});
