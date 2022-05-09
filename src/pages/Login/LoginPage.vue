<template>
  <div id="loginPage">
    <div id="loginPageTop">
      <i @click="Close" class="iconfont icon-guanbi"></i>
    </div>
    <div id="loginPageCenter">
      <span
        ><i class="iconfont icon-shouji"></i>
        <input
          type="text"
          placeholder="请输入你的手机号"
          v-model.trim="phone"
          autofocus="autofocus"
          @blur="CheckPhone(phone)"
      /></span>
      <span
        ><i class="iconfont icon-jiesuo"></i
        ><input
          type="password"
          placeholder="请输入你的密码"
          v-model="password"
          @keyup.enter="Login"
      /></span>
    </div>
    <p class="error" style="height: 25px; margin: 15px 0">
      {{ error_tips }}
    </p>
    <div id="loginPageBottom">
      <button @click="Login">登录</button>
      <button @click="Register">注册</button>
    </div>
  </div>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      phone: "",
      password: "",
      CheckPhonePass: false,
      error_tips: "",
      username: "",
      avatar_src: "",
    };
  },
  methods: {
    Close() {
      document.querySelector("#loginPage").style.display = "none";
      // console.log(document.querySelector('input[type="password"]').value);
      document.querySelector('input[type="password"]').value = "";
      this.$data.error_tips = "";
    },
    Login() {
      if (this.$data.CheckPhonePass == true) {
        api.checkIsReg(this.$data.phone).then((res) => {
          if (res.data.hasPassword == false) {
            this.$data.error_tips = "该手机号尚未注册";
          } else {
            api.loginByPhone(this.$data.phone, this.$data.password).then((res) => {
                if (res.data.msg) {
                  this.$data.error_tips = res.data.msg;
                } else {
                  console.log(res.data);
                  this.$emit(
                    "getUser",
                    res.data.profile.nickname,
                    res.data.profile.avatarUrl
                  );
                  this.$store.state.isLogin = true;
                  this.$store.state.cookie = res.data.cookie;
                  document.querySelector("#loginPage").style.display = "none";
                  location.reload()
                }
              });
          }
        });
      }
    },
    Register() {},
    CheckPhone(phone) {
      let exp = /^1[345789]\d{9}$/;
      if (exp.test(phone)) {
        this.$data.CheckPhonePass = true;
        this.$data.error_tips = "";
        //  document.querySelector(".error").style.display="none"
      } else {
        this.$data.CheckPhonePass = false;
        this.$data.error_tips = "请输入正确的11位手机号";
        // document.querySelector(".error").style.display="block"
      }
    },
  },
  watch: {},
};
</script>
<style scoped>
input,
button {
  border: none;
}
input:focus {
  outline: none;
}
input::placeholder {
  color: #999;
}
#loginPage {
  background-color: #fff;
  width: 400px;
  height: 300px;
  box-shadow: 5px 5px 20px 5px #eee;
}
#loginPageTop {
  width: 100%;
  height: 50px;
}
#loginPageTop i {
  float: right;
  margin-top: 15px;
  margin-right: 15px;
  color: #999;
  font-size: 19px;
}
.error {
  color: red;
}
#loginPageCenter span {
  display: inline-block;
  width: 260px;
  height: 40px;
  border: 1px rgb(216, 216, 216) solid;
  border-radius: 5px 5px 0 0;
  line-height: 40px;
}
#loginPageCenter span:nth-last-of-type(1) {
  border-radius: 0 0 5px 5px;
  border-top: 0;
}

#loginPageCenter span i {
  float: left;
  margin-left: 10px;
}
#loginPageBottom {
  margin: 0 auto;
  width: 260px;
}
#loginPageBottom button {
  width: 100%;
  height: 40px;
  background: none;
}
#loginPageBottom button:nth-of-type(1) {
  background-color: rgb(234, 72, 72);
  border-radius: 5px;
  color: #fff;
}
</style>