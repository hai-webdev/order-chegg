<template>
  <header class="header-container">
    <div class="head-box max-center">
      <div class="left-layout">
        <router-link to="/" class="logo">
          <span>{{ title }}</span>
        </router-link>
        <nav class="nav-list">
          <a
            :href="item.linkurl"
            class="nav-item"
            v-for="item in navList"
            :key="item.id"
            >{{ $store.state.language.language==="cn" ? item.title : item.entitle }}</a
          >
        </nav>
      </div>
      <div class="right-layout">
        <div class="language">
          <a @click="changeLanguage">{{
            $store.state.language.language === "cn" ? "English" : "中文"
          }}</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import getList from "@/api/list";
export default {
  data() {
    return {
      title: "",
      navList: [],
    };
  },
  async created() {
    await this.$store.dispatch("site/getSite");
    this.title = this.$store.state.site.data.title;
    const navsData = await getList("nav_link");
    this.navList = navsData.rslist;
  },
  methods: {
    changeLanguage() {
      const language = this.$store.state.language.language;
      console.log(language);
      if (language === "cn") {
        this.$store.commit("language/SET_LANGUAGE", "en");
      } else {
        this.$store.commit("language/SET_LANGUAGE", "cn");
      }
    },
  },
};
</script>

<style scoped>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
}
.head-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}
.left-layout {
  display: flex;
  align-items: center;
}
.logo {
  font-size: 32px;
  color: #fff;
  margin-right: 50px;
}
.nav-item {
  color: #fff;
  margin-right: 40px;
}
.nav-item:hover {
  color: #00c785;
}
.language a {
  color: #fff;
  cursor: pointer;
}
.language a:hover {
  color: #00c785;
}
@media screen and (max-width: 768px) {
  .logo {
    font-size: 14px;
    margin-right: 25px;
  }
  .nav-item {
    font-size: 12px;
    margin-right: 10px;
  }
  .language a {
    font-size: 12px;
  }
}
</style>