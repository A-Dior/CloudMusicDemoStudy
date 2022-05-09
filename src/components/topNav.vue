<template>
  <div id="contain">
    <div id="top-nav">
      <router-link to="/home" id="home">网易云音乐demo</router-link>
      <span id="TopNav-center">
        <a @click="Back" class="clickEvent iconfont icon-xiangzuojiantou"> </a>
        <a @click="Next" class="clickEvent iconfont icon-xiangyoujiantou"> </a>
        <span class="search">
          <i class="icon-Magnifier iconfont"></i>
          <input type="text" placeholder="张学友" />
        </span>
      </span>
      <span id="TopNav-right" @click="loginPage()">
        <img :src="avatar_src?avatar_src:avatar_default" class="avatar" />
        <span v-if="!username"><a>未登录</a></span>
        <span v-else>{{ username }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar_default:require("../assets/avatar_default.jpg")
    };
  },
  props: {
    id:{
      default:''
    }, 
    token:{
      default:''
    },
    username:{
      default: ""
    },
    avatar_src:{
      default: require('../assets/avatar_default.jpg')
    }
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    Next() {
      this.$router.go(1);
    },
    loginPage() {
      document.querySelector("#loginPage").style.display = "block";
    },
  },
  components: {
  },
};

</script>


<style scoped>
a {
  text-decoration: none;
}
.iconfont {
  color: #fff;
}
#contain{
  width: 100%;
  height: 60px;
}
#top-nav {
  width: 100%;
  height: 60px;
  background-color: rgb(236, 65, 65);
  line-height: 60px;
  position: fixed;
}
#home {
  float: left;
  color: #fff;
  margin-left: 30px;
  max-width: 20%;
  min-width: 125px;
  text-align: left;
}
#TopNav-center {
  width: 250px;
  height: 60px;
  float: left;
  margin-left: 5%;
}
#TopNav-center > * {
  margin: 0 2px;
}
.clickEvent {
  border-radius: 50%;
  background-color: rgba(10, 10, 10, 0.2);
  width: 25px;
  height: 25px;
  display: inline-block;
  line-height: 25px;
  font-size: 13px;
}
.search {
  width: 160px;
  height: 25px;
  background-color: rgba(10, 10, 10, 0.2);
  display: inline-block;
  /* line-height: 60px; */
  border-radius: 30px;
  vertical-align: middle;
}
.search > i {
  float: left;
  padding-left: 5px;
  line-height: 25px;
}
.search > input {
  border: none;
  float: right;
  width: 130px;
  background-color: rgba(10, 10, 10, 0);
  color: #fff;
  line-height: 25px;
}
.search > input::placeholder {
  color: #ccc;
}
input:focus {
  outline: none;
}
#TopNav-right{
  height: 100%;
  width: 190px;
  display: inline-block;
  float: right;
  margin-right: 10%;
  color: #eee;
}
#TopNav-right:hover{
  color: #fff;
}
#TopNav-right > img{
  width: 35px;
  height: 35px;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  vertical-align: middle;
  margin-right: 5%;
}
</style>