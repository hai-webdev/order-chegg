export default {
  namespaced: true,
  state: {
    language:"cn"
  },
  mutations: {
    SET_LANGUAGE(state, data) {
      state.language = data;
    },
  },
  actions: {

  },
};
