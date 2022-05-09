<template>
  <div>
    <loading></loading>
    <span v-if="Show">
      <p style="font-weight: bold;font-size:19px;margin:10px 0">官方榜</p>
      <ul v-for="items in SongList" :key="items.name">
        <div>
          <span class="img_box">
            <img :src="items.coverImgUrl" />
          </span>
          <!-- {{items}} -->
          <span class="song_li">
            <li v-for="item in items.moreSong" :key="item.songid">
              <p class="song-name">{{ item.name }}</p>
              <p class="singer-name">{{item.ar[0].name}}</p>
            </li>
          </span>
        </div>
      </ul>
    </span>
  </div>
</template>

<script>
import api from "@/api";
import loading from "@/components/loading";

export default {
  name: "leaderBoard",
  data() {
    return {
      SongList: [],
      Show: false,
      ListId: [],
      result: [],
    };
  },
  created() {
    this.getData();
  },
  components: {
    loading,
  },
  methods: {
    getSongList() {
      return new Promise((resolve, reject) => {
        api
          .leaderBoards()
          .then((res) => {
            console.log(res.data);
            let resdata = JSON.parse(JSON.stringify(res));
            for (let length = 0; length < 4; length++) {
              this.SongList.push(resdata.data.list[length]);
              this.ListId.push(resdata.data.list[length].id);
            }
            resolve(this.ListId);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getDetailedAllSong(ListId, limit, a) {
      return new Promise((resolve, reject) => {
        api.getDetailedAllSong(ListId, limit).then((res) => {
          this.SongList[a]["moreSong"] = res.data.songs;
          resolve();
        });
      }).catch((e) => {
        reject(e);
      });
    },

    async getData() {
      await this.getSongList().then((res) => {});
      for (let i = 0; i < this.SongList.length; i++) {
        this.result.push(this.getDetailedAllSong(this.ListId[i], 5, i));
      }
      Promise.all(this.result).then((res) => {
        this.Show = true;
      });
    },
  },
  watch: {
    Show: function () {
      document.querySelector(".toast").style.display = "none";
    },
  },
};
</script>
<style scoped>
li {
  list-style: none;
}
li:before{
  content: counter(sectioncount) ' ';
  counter-increment: sectioncount;
}
ul{
  display: block;
  padding: 0;
  counter-reset: sectioncount;
}
ul>div{
  height: 230px;
}
.img_box {
  width: 200px;
  height: 200px;
  display: inline-block;
}
.img_box img {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
}

.song_li{
  display: inline-block;
  margin-left: 20px;
  height: 200px;
  width: 500px;
  vertical-align: top;
}
.song_li li{
  padding: 5px 10px;
}
.song_li li:nth-child(odd){
  background-color: #eeeeee50;
  border-radius: 5px;
}
.song_li li p{
  margin: 5px 0;
  font-size: 15px;
}
.song_li li .song-name{
  text-align: left;
  display: inline-block;
}
.song_li li .singer-name{
  float: right;
  text-align: right;
  color: #bbb;
}
</style>