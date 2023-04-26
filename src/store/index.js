import Vue from "vue";
import Vuex from "vuex";
import site from "./site";
import language from "./language";
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    webUrl:"https://www.chegg88.com:8080/get_body?url=",
  },
  modules: {
    site,
    language
  },
  strict: true,
});
