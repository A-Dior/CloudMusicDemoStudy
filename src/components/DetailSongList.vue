<template>
  <div v-if="show">
    <div class="SongList-Top">
      <div class="cover-img">
        <img :src="playList.coverImgUrl" width="200px" height="200px" />
      </div>
      <div class="songlist-right">
        <p class="title">{{ playList.name }}</p>
        <img :src="playList.creator.avatarUrl" class="userAvatar" />
        <a>{{ playList.creator.nickname }}</a>
        <span>{{ playList.createTime }}创建</span>
      </div>
    </div>
    <div class="SongList-Bottom">
      <ul>
        <li class="songdata-textarea">
          <span class="serial-number"></span
          ><span class="songdata-link">标题</span>
          <span class="singer-name">歌手</span>
          <span class="album-name">专辑</span>
          <span class="song-duration">时长</span>
          <!-- album 专辑名 -->
        </li>
        <li
          v-for="(Song, index) of SongList[0]"
          :key="index"
          class="songdata-textarea"
        >
          <span class="serial-number">{{
            index + 1 < 10 ? "0" + (index + 1) : index + 1
          }}</span>
          <a @dblclick="playSong(Song.id)" class="songdata-link"
            >{{ Song.name }}
          </a>
          <span class="singer-name">
            <span v-if="Song.ar.length != 1">
              <a v-for="(singer, index) of Song.ar" :key="index">
                <span v-if="index != 0">/</span>
                <span v-else></span>
                {{ Song.ar[index].name }}
              </a>
            </span>
            <span v-else>
              <a>{{ Song.ar[0].name }}</a>
            </span>
          </span>
          <span class="album-name">{{ Song.al.name }}</span>
          <span class="song-duration">{{ Song.dt }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      id: this.$route.params.id,
      playList: [], //用于保存歌单信息
      SongList: [], //用于保存歌曲
      // userList: [], //用户信息
      trackCount: this.$route.params.trackCount,
      show: false,
      offset: 0,
      number: 1,
    };
  },
  created() {
    this.getAllShow(this.id, this.offset);
    // window.addEventListener("scroll", this.lazyLoading);
  },
  methods: {
    //获取歌单信息
    getPlayList(id) {
      return new Promise((resolve, reject) => {
        api.detailPlaylist(id).then((res) => {
          this.playList = res.data.playlist;
          this.trackCount = res.data.playlist.trackCount;
          let date = new Date(res.data.playlist.createTime);
          this.playList.createTime =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1 < 10
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1) +
            "-" +
            (date.getDate() + 1 < 10 ? "0" + date.getDate() : date.getDate());
          resolve(this.playList);
        });
      });
    },
    getDetailedAllSong(id, offset) {
      return new Promise((resolve, reject) => {
        let OffSET = offset ? offset : 0;
        api.getDetailedAllSong(id, this.trackCount, OffSET).then((res) => {
          let a = 0;
          while (a < res.data.songs.length) {
            let second = res.data.songs[a].dt / 1000;
            let min =
              Math.floor(second / 60) >= 10
                ? Math.floor(second / 60)
                : "0" + Math.floor(second / 60);
            second -= 60 * min;
            let sec = second >= 10 ? Math.floor(second) : "0" + Math.floor(second);
            res.data.songs[a].dt = min + ":" + sec;
            a++;
          }
          this.SongList.push(res.data.songs);
          resolve(res.data);
        });
      });
    },
    getAllShow(id, offset) {
      Promise.all([this.getPlayList(id), this.getDetailedAllSong(id, offset)])
        .then((res) => {
          this.show = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    playSong(Songid) {
      console.log(Songid);
    },
    // lazyLoading() {
    //   let scrollTop = document.documentElement.scrollTop || document.body;
    //   let clientHeight = document.documentElement.clientHeight;
    //   let scrollHeight = document.documentElement.scrollHeight;
    //   if (scrollTop + clientHeight >= scrollHeight) {
    //     console.log(this.offset);
    //     this.offset = this.offset + 1;
    //     this.getDetailedAllSong(this.id, this.offset);
    //   }
    // },
  },
  // destoryed() {
  //   window.removeEventListener("scroll", this.lazyLoading);
  // },
};
</script>

<style>

ul {
  padding: 0;
  list-style: none;
}
.SongList-Top {
  margin-top: 20px;
}
.cover-img {
  height: 200px;
  width: 200px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #ccc;
  display: inline-block;
}
.songlist-right {
  display: inline-block;
  vertical-align: top;
}
.songlist-right * {
  margin: 0 0 10px 15px;
  display: inline-block;
  vertical-align: middle;
}
.title {
  font-weight: bold;
  font-size: 21px;
  margin: 0 0 10px 15px;
  display: block;
}

.userAvatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
}
.songdata-textarea {
  background-color: #eee;
  list-style-position: inside;
  height: 50px;
  line-height: 50px;
}
.serial-number {
  display: inline-block;
  width: 30px;
  height: 50px;
  vertical-align: top;
  padding: 0 20px;
}
.songdata-textarea:nth-child(odd) {
  background-color: #fff;
}
.singer-name {
  margin-right: 20px;
  width: 150px;
  display: inline-block;
  height: 50px;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.songdata-link {
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  width: 400px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.album-name {
  margin-right: 20px;
  width: 150px;
  display: inline-block;
  height: 50px;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.song-duration{
  display: inline-block;
  vertical-align: top;
  width: 50px;
}
</style>