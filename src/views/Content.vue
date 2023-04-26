<template>
  <div class="content-container">
    <img v-if="banner" :src="banner.filename" class="banner" />
    <div class="html" v-html="resultHTML"></div>
  </div>
</template>

<script>
import links from "@/api/links";
export default {
  data() {
    return {
      banner: "",
      link: "",
      resultHTML:""
    };
  },
  async created() {
    await this.$store.dispatch("site/getSite");
    this.banner = this.$store.state.site.data.adv_img.banner;
    console.log(this.$route.query.link);
    this.resultHTML = await links(this.$route.query.link);
    console.log(this.resultHTML);
  },
};
</script>

<style lang="less" scoped>
.content-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.banner {
  display: block;
  max-width: 100%;
  margin: 0 auto 10px;
}
.html {
  width: 100%;
  flex: 1;
  border: 5px solid #ccc;
  box-sizing: border-box;
}
</style>