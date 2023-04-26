<template>
  <div class="home-container">
    <Header />
    <main class="main-container">
      <div class="main-box max-center">
        <h1 class="page-title">Chegg Answer</h1>
        <form class="form-box" @submit.prevent="getAnswer">
          <input type="text" v-model="form.link" :placeholder="$store.state.language.language === 'cn' ? 'Chegg题目链接' : 'Chegg question link'" />
          <input
            type="text"
            v-model="form.code"
            :placeholder="$store.state.language.language === 'cn' ? '请输入答案提取码' : 'Enter unlock code'"
          />
          <button type="submit">
            {{
              $store.state.language.language === "cn"
                ? "立即提取答案"
                : "Extract answers now"
            }}
          </button>
        </form>
        <p class="time-left" v-if="date.day">
          <template v-if="date.day > 0">
            {{ $store.state.language.language === "cn" ? '查询码剩余' : 'Query code remaining'}}：<span>{{ date.day }}</span
            >天<span>{{ date.hours }}</span
            >时<span>{{ date.minutes }}</span
            >分<span>{{ date.seconds }}</span
            >秒
          </template>
          <template v-else> 查题码：已过期 </template>
        </p>
        <a :href="buyLink" class="buy">{{
          $store.state.language.language === "cn"
            ? "购买查题码"
            : "Buy Chegg Card"
        }}</a>
        <p class="note" v-html="$store.state.language.language === 'cn' ? note : enNote"></p>
      </div>
    </main>
    <div class="adv-list max-center" v-if="imgs">
      <Adv :imgs="imgs" />
    </div>
  </div>
</template>

<script>
import Header from "@/Layout/Header";
import Adv from "@/components/Adv";

import search from "@/api/search";
import login from "@/api/login";
import postForm from "@/api/postForm";
import layout from "@/api/layout";
// import links from "@/api/links";

import timeFormat from "@/utils/timeFormat";

export default {
  data() {
    const code = this.$route.query.code;
    return {
      imgs: [],
      note: "",
      enNote:"",
      buyLink: "",
      form: {
        link: "",
        code: code || "",
      },
      times: null,
      date: {
        day: "",
        hours: "",
        minutes: "",
        seconds: "",
      },
    };
  },
  async created() {
    await this.verifyCode();
    await this.$store.dispatch("site/getSite");
    this.imgs = this.$store.state.site.data.adv_img.pictures;
    this.note = this.$store.state.site.data.note.note;
    this.enNote = this.$store.state.site.data.note.en_note;
    this.buyLink = this.$store.state.site.data.note.linkurl;
  },
  methods: {
    async getAnswer() {
      await this.verifyCode();
      const { link } = this.form;
      if (!link) {
        this.$message({
          message: "请输入Chegg题目链接",
          type: "warning",
        });
        return;
      }
      this.$router.push({
        name:"Content",
        query:{
          link
        }
      });
    },
    async verifyCode() {
      const { code } = this.form;
      if (!code) {
        this.$message({
          message: "请输入答案提取码",
          type: "warning",
        });
        return;
      }
      if (code.length !== 16) {
        this.$message({
          message: "请输入正确的16位数的提取码",
          type: "warning",
        });
        return;
      }
      const searchResult = await search(code);
      if (!searchResult.rslist) {
        this.$message({
          message: "请输入正确的16位数的提取码",
          type: "error",
        });
        this.form.code = "";
        return;
      }
      if (searchResult.rslist.length !== 1) {
        this.$message({
          message: "提取码冲突，请联系管理员重新获取",
          type: "warning",
        });
        return;
      }
      const item = searchResult.rslist[0];
      if (!item.first_date || item.first_date === "0000-00-00 00:00:00") {
        const loginData = await login();
        const first_date = timeFormat();
        if (!loginData) {
          return;
        }
        const postFormResult = await postForm({
          tid: item.id,
          title: item.title,
          first_date,
          card_type: item.card_type,
        });
        if (!postFormResult) {
          return;
        }
      } else {
        // 如果有初始时间的话
        const currentDate = +new Date();
        const firstDate = +new Date(item.first_date);
        const duration = Number(item.card_type);
        if (currentDate > firstDate + duration) {
          this.$message({
            message: "提取码已过期，请联系管理员续费",
            type: "error",
          });
          return;
        }
      }

      const firstDate = +new Date(item.first_date);
      const duration = Number(item.card_type);

      this.times = setInterval(() => {
        const currentDate = +new Date();
        const date = firstDate + duration - currentDate;
        const dayParams = 1000 * 3600 * 24;
        const hoursParams = 1000 * 3600;
        const minutesParams = 1000 * 60;
        // 60秒 * 60分 * 24小时
        const day = Math.floor(date / dayParams);
        const hours = Math.floor((date - day * dayParams) / hoursParams);
        const minutes = Math.floor(
          (date - day * dayParams - hours * hoursParams) / minutesParams
        );
        const seconds = Math.floor(
          (date -
            day * dayParams -
            hours * hoursParams -
            minutes * minutesParams) /
            1000
        );
        this.date.day = day;
        this.date.hours = hours.toString().padStart(2, 0);
        this.date.minutes = minutes.toString().padStart(2, 0);
        this.date.seconds = seconds.toString().padStart(2, 0);
      }, 1000);
      await layout();
    },
  },
  components: {
    Header,
    Adv,
  },
};
</script>

<style scoped lang="less">
.time-left {
  text-align: center;
  color: #fff;
  margin: 20px;
  span {
    padding: 0 3px;
  }
}
.main-container {
  background: #0f1daf;
  background-image: linear-gradient(180deg, #0f1daf, #5b6afe);
  padding-top: 200px;
  padding-bottom: 50px;
}
.main-box {
  max-width: 980px;
}
.page-title {
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 50px;
}
input {
  width: 100%;
  height: 58px;
  outline: none;
  border: none;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 18px;
  padding-left: 15px;
  box-sizing: border-box;
}
input::placeholder {
  font-size: 18px;
  color: #999;
}
.buy,
button {
  width: 100%;
  height: 58px;
  font-size: 18px;
  border-radius: 6px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #00c785;
  color: #fff;
}
.buy:hover,
button:hover {
  background-color: #00b97b;
}
button {
  margin-bottom: 25px;
}
.buy {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  margin: 0 auto;
}
.note {
  text-align: center;
  color: #fff;
  padding: 20px 0;
  line-height: 1.7;
}
.adv-list {
  position: relative;
  top: -30px;
  background-color: #fff;
  border-radius: 20px;
  padding: 30px;
  box-sizing: border-box;
  margin-bottom: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
@media screen and (max-width: 768px) {
  .main-container {
    padding-top: 100px;
  }
  .page-title {
    font-size: 28px;
    margin-bottom: 30px;
  }
  input {
    height: 44px;
    border-radius: 4px;
    margin-bottom: 7px;
    font-size: 14px;
    padding-left: 10px;
  }
  input::placeholder {
    font-size: 14px;
  }
  .buy,
  button {
    height: 44px;
    font-size: 14px;
    border-radius: 4px;
  }
  .time-left {
    text-align: center;
    color: #fff;
    margin: 10px 0 20px;
    font-size: 13px;
    span {
      padding: 0 3px;
    }
  }
  .note {
    font-size: 13px;
  }
  .adv-list {
    padding: 15px;
    border-radius: 6px;
    &.max-center {
      width: calc(100% - 10px);
    }
  }
}
</style>