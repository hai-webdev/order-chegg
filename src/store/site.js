import getSite from "@/api/site";
export default {
  namespaced: true,
  state: {
    data: {},
  },
  mutations: {
    SET_SITE(state, res) {
      state.data = res;
    },
  },
  actions: {
    async getSite(ctx) {
      const data = await getSite();
      ctx.commit("SET_SITE", data.site);
    },
  },
};
