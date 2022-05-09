<template>
  <div id="index-Page">
    <div class="topMenu">
      <button
        v-for="item of topMenu"
        class="tabButton"
        :key="item.componentName"
        :class="[item.first == true ? 'nowTab' : '', item.componentName]"
        @click="changeComponents(item.componentName)"
      >
        {{ item.title }}
      </button>
    </div>
    <keep-alive>
      <component :is="nowTab"></component>
    </keep-alive>
  </div>
</template>

<script>
import leaderBoard from "./components/leaderBoard";
import recommend from "./components/recommend";

export default {
  data() {
    return {
      topMenu: {
        recommend: {
          componentName: "recommend",
          title: "个性推荐",
          first: true,
        },
        leaderBoard: {
          componentName: "leaderBoard",
          title: "排行榜",
        },
      },
      nowTab: "recommend",
    };
  },
  methods: {
    changeComponents(Tabnames) {
      this.nowTab = Tabnames;
      document.querySelector(".nowTab").classList.remove("nowTab");
      document.querySelector("." + Tabnames).classList.add("nowTab");
    },
  },
  components: {
    leaderBoard,
    recommend,
  },
  watch: {},
  // name:"recommend"
};
</script>
<style scoped>
button {
  border: none;
  background-color: #fff;
  height: 50px;
  font-size: 18px;
  padding: 0;
  margin: 0 15px 0 0;
  line-height: 60px;
}
.nowTab {
  font-weight: bold;
  border-bottom: red 2px solid;
}
</style>