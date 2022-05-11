<template>
  <div>
    <ul>
      <li v-for="(Song, index) of songList" :key="index">{{ Song.name }}</li>
    </ul>
  </div>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      songList: [],
      ToSearch: "",
    };
  },
  props: {
    searchValue: {
      default: "",
    },
  },
  created() {},
  methods: {
    search(value) {
      api.search(value).then((res) => {
        console.log(res.data);
        let a = 0;
        // a 用作循环和歌曲下标
        while (a < res.data.result.songs.length) {
          this.songList.push(res.data.result.songs[a]);
          a++;
        }
      });
    },
  },
  watch: {
    searchValue(newValue, oldValue) {
      console.log(newValue);
      if (newValue != "") {
        this.ToSearch = newValue;
        this.songList = [];
        this.search(this.ToSearch);
      }
    },
  },
};
</script>

<style scoped>
ul{
  list-style: none;
}
</style>