<template>
  <div class="dialog">
    <div class="dialog-inner">
      <h3>おそうじの追加</h3>
      <p>test</p>
      <div class="btn-container">
        <a class="btn" @click="add">追加</a>
        <a class="btn" @click="close">閉じる</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddOsouji',
  methods: {
    add () {
      this.$eventHub.$emit('add-osouji')
      this.$router.back()
      // this.$router.push('/')
    },
    close () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog{
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(#222, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;

    &-inner{
      background-color: white;
      padding: 30px;
      width: 300px;
    }
  }
</style>
