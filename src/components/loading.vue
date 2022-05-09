<template>
  <div class="toast">
    <span class="load"></span>
    <span>加载中...</span>
  </div>
</template>
<script>
export default {
  wait() {
    document.querySelector(".toast").style.display = "flex";
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #4a4a4b;
  border-radius: 20px;
  color: #f0f0f0;
  font-size: 15px;
}
.load {
  display: inline-block;
  margin-bottom: 1.5rem;
  height: 20px;
  width: 20px;
  border: 3px solid transparent;
  border-top-color: white;
  border-left-color: white;
  border-bottom-color: white;
  animation: circle 1s infinite linear;
  -webkit-animation: circle 1s infinite linear; /* Safari 和 Chrome */
  border-radius: 50%;
}

@-webkit-keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>