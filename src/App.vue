<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import './main.less';

  body {
    background-color: #fca400;
  }

  .flianGroup .vux-no-group-title {
    display: flex;
    align-items: center;
  }


</style>
