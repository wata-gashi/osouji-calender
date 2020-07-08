<template>
  <div id="home">
    <div id="title">お掃除予定表</div>
    <osouji-todo></osouji-todo>
  </div>
</template>

<script>
  import OsoujiTodo from '../components/OsoujiTodo'

  export default {
    components: {
      'osouji-todo': OsoujiTodo
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";

  #home{
    @extend %root-body;
  }
</style>
