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
            :class="option.first == true ? 'nowTab '+ option.componentName: option.componentName"
          >
            {{ option.title }}
          </button>
        </li>
      </ul>
    </div>
    <div class="search-result">
      <keep-alive>
        <component :is="nowTab">

        </component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      Tosearch: this.$route.params.value,
      isShow: true,
      songList: [],
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
    this.search(this.Tosearch);
  },
  methods: {
    changeComponents(componentName) {
      this.nowTab = componentName;
      document.querySelector(".nowTab").classList.remove('nowTab')
      document.querySelector("."+componentName).classList.add("nowTab")
    },
    search(value) {
      api.search(value).then((res) => {
        let a = 0;
        // a 用作循环和歌曲下标
        while (a < res.data.result.songs.length) {
          this.songList.push(res.data.result.songs[a]);
          a++;
        }
      });
    },
  },
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