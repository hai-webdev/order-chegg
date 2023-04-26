<template>
  <div class="adv-container">
    <a :href="img.link" v-for="(img, index) in imgs" :key="index">
      <img :src="img.filename" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    imgs: {
      type: Array,
      required:true
    },
  },
};
</script>

<style scoped lang="less">
.adv-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  a{
    display: block;
    width: 48%;
    img{
      width: 100%;
      display: block;
    }
    transition: .6s;
    &:hover{
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
  }
}
@media screen and (max-width:768px) {
  .adv-container{

    a{
      width: 100%;
      margin-bottom: 20px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
}
</style>