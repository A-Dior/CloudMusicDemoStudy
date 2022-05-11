<template>
  <div v-if="isShow" class="search-result-box">
    <div class="search-result-top">
      <p class="search-title">搜索&nbsp;&nbsp;{{ Tosearch }}</p>
      <div></div>
    </div>
    <div class="search-option">
      <ul>
        <li v-for="option of options" :key="option.componentName">
          <button
            @click="changeComponents(option.componentName)"
            :class="
              option.first == true
                ? 'nowTab ' + option.componentName
                : option.componentName
            "
          >
            {{ option.title }}
          </button>
        </li>
      </ul>
    </div>
    <div class="search-result">
      <keep-alive>
        <component :is="nowTab" :searchValue="Tosearch"> </component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import songs from "./components/songs";
export default {
  data() {
    return {
      Tosearch: this.$route.params.value,
      isShow: true,
      options: {
        songs: {
          componentName: "songs",
          title: "单曲",
          first: true,
        },
        singer: {
          componentName: "singer",
          title: "歌手",
        },
        album: {
          componentName: "album",
          title: "专辑",
        },
        songList: {
          componentName: "songList",
          title: "歌单",
        },
        user: {
          componentName: "user",
          title: "用户",
        },
      },
      nowTab: "songs",
    };
  },
  created() {
    // this.search(this.Tosearch);
  },
  methods: {
    changeComponents(componentName) {
      this.nowTab = componentName;
      document.querySelector(".nowTab").classList.remove('nowTab')
      document.querySelector("."+componentName).classList.add("nowTab")
    },
  },
  components:{
    songs,
  },
  watch:{
      '$route'(val){
          this.Tosearch = this.$route.params.value
      }
  }
};
</script>

<style scoped>
button {
  border: none;
  background: #fff;
  display: inline-block;
  font-size: 17px;
  text-align: left;
  width: inherit;
  padding: 0;
  margin-right: 35px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: inline-block;
}
.search-title {
  font-size: 21px;
  font-weight: bold;
  /* margin-top: 10px; */
}
.nowTab {
  border-bottom: 3px solid red;
}
</style>