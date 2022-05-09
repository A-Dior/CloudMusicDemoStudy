<template>
  <div>
    <loading></loading>
    <div v-if="this.$store.state.isLogin != null">
      <p>推荐歌单</p>
      <ul>
        <li
          v-for="item of SongList.slice(0, 10)"
          :key="item.id"
          :listid="item.id"
          @click="goDetailList(item.id,item.trackCount)"
        >
          <img :src="item.picUrl" />
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import loading from "@/components/loading";

export default {
  data() {
    return {
      SongList: [],
    };
  },
  created() {
    this.getSongList();
  },
  components: {
    loading,
  },
  computed: {},
  methods: {
    getSongList() {
        api.loginStatus().then((res) => {
          if (res.data.data.account != null) {
            api.recommendPlaylist().then((res) => {
              this.SongList = res.data.recommend;
              this.closeWait()
            });
          } else {
            api.personalized().then((res) => {
              console.log(res.data);
              this.SongList = res.data.result;
              this.closeWait()
            });
          }
        });
    },
    closeWait() {
      document.querySelector(".toast").style.display = "none";
    },
    goDetailList(id,trackCount){
      this.$router.push({path: `/detail/${id}/${trackCount}`})
    }
  },
};
</script>
<style scoped>
img {
  width: 135px;
  height: 135px;
  border-radius: 5px;
  overflow: hidden;
}
ul {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  align-content: center;
  /* justify-content: space-evenly; */
  padding: 0;
}
li {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: calc((100% - 10px) / 5);
  height: 250px;
  align-items: center;
  margin-top: 10px;
}

li p {
  width: 135px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  font-size: 15px;
}
</style>