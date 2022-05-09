<template>
  <div id="app">
    <topNav
      :id="id"
      :token="token"
      :username="username"
      :avatar_src="avatar_src"
    ></topNav>
    <!-- <span>
      <button @click="$router.push({path:'/'})">Go to Home</button>
      <button @click="$router.push({path:'/user'})">User</button>
    </span> -->
    <!-- <router-view></router-view> -->
    <login-page @getUser="sendUser(arguments)"></login-page>
    <div id="center-page">
      <leftNav></leftNav>
      <keep-alive>
        <router-view id="center-page-right" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view id="center-page-right" v-if="!$route.meta.keepAlive"></router-view>

    </div>
    <button @click="LogOut" style="float: right">登出账户</button>
  </div>
</template>

<script>
import topNav from "@/components/topNav";
import LoginPage from "@/pages/Login/LoginPage";
import leftNav from "@/components/leftNav";
import api from "@/api";
import global from "@/Global";
export default {
  name: "App",
  data() {
    return {
      id: "",
      token: "",
      username: "",
      avatar_src: "",
    };
  },
  components: {
    topNav,
    LoginPage,
    leftNav,
  },
  created() {
    this.checkLogin();
  },
  methods: {
    async checkLogin() {
      await api.loginStatus().then((res) => {
        if (res.data.data.account != null) {
          this.$store.state.isLogin = true;
          this.$data.id = res.data.data.account.id;
          this.$data.token = res.data.data.account.token;
          this.$data.username = res.data.data.profile.nickname;
          this.$data.avatar_src = res.data.data.profile.avatarUrl;
        } else {
          this.$store.state.isLogin = false;
          console.log(this.$store.state.isLogin);
          console.log("未登录");
          this.$data.username = "";
          this.$data.avatar_src = "";
        }
      });
    },
    async LogOut() {
      await api.loginOut().then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          // document.cookie = "";
          // document.cookie = "";
          document.cookie =
            "__remember_me=;expires=Thu, 01 Jan 1970 00:00:00 UTC;MUSIC_U=;expires=Thu, 01 Jan 1970 00:00:00 UTC;__csrf=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          console.log("退出成功");
          location.reload();
        }
      });
      this.checkLogin();
    },
    sendUser(value) {
      this.$data.username = value[0];
      this.$data.avatar_src = value[1];
    },
    personalized() {
      api.personalized().then((res) => {});
    },
  },
};

window.onload = function () {
  getSize();
};
let getSize = function () {
  document.querySelector("#center-page").style.width = window.screen.width;
  document.querySelector("#Basic-components").style.height =
    window.screen.height -
    document.querySelector("#contain").offsetHeight -
    30 +
    "px";
  document.querySelector("#center-page").style.height =
    window.screen.height -
    document.querySelector("#contain").offsetHeight +
    "px";
};
window.onresize = function () {
  document.querySelector("#Basic-components").style.height =
    window.screen.height -
    document.querySelector("#contain").offsetHeight -
    30 +
    "px";
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  /* margin-top: 60px; */
}
#loginPage {
  display: none;
  position: absolute;
  left: 35%;
  top: 30%;
}
#center-page {
  display: flex;
}
#center-page-right {
  width: 80%;
  float: right;
  text-align: left;
  margin-left: 22%;
}
</style>
