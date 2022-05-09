<template>
  <div id="Basic-components">
    <ul>
      <li
        v-for="(item, key) in BasicComponents"
        :key="key"
        @click="go(item.router)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import recommend from "@/pages/DiscoverMusic/index";

export default {
  data() {
    return {
      BasicComponents: {
        DiscoverMusic: {
          router: "/",
          title: "发现音乐",
        },
        Follow: {
          router: "/follow",
          title: "关注 ",
        },
      },
    };
  },
  components: {
    recommend,
  },
  methods: {
    go(ip) {
      this.$router.push({ path: ip });
    },
  },
};


</script>

<style scoped>
#Basic-components{
    width: 20%;
    list-style: none;
    position: fixed;
    top: 60px;
    border-right: 1px solid #ccc;
}
#Basic-components ul{
    list-style: none;
    padding: 0;
    margin: 0;
}
#Basic-components ul li{
    margin: 10px 0;
}
</style>