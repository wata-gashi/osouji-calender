<template>
  <div class="dialog">
    <div class="dialog-inner">
      <h3>おそうじの追加</h3>
      <label>
        <input v-model="osoujiName" placeholder="名前">
      </label>
      <div class="btn-container">
        <com-button @add="add" :is-disabled="addDisabled" click-event="add">追加</com-button>
        <com-button @close="close" click-event="close">閉じる</com-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ComButton from '../components/ComButton'

  export default {
    name: 'AddOsouji',
    components: {
      'com-button': ComButton
    },
    data () {
      return {
        osoujiName: ''
      }
    },
    computed: {
      addDisabled: function () {
        return !this.osoujiName
      }
    },
    methods: {
      add () {
        this.$eventHub.$emit('add-osouji', {
          osoujiName: this.osoujiName
        })
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
