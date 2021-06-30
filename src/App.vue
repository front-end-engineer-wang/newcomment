<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">首页</router-link>
      <button class="app-but" @click="clear">清除本地缓存数据</button>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    clear() {
      localStorage.removeItem("newList");
      alert("成功，页面重置,");
      location.reload();
    },
  },
};
</script>
<style lang="scss" >
#nav {
  text-align: center;
}
.app-but {
  margin-left: 100px;
}
</style>
