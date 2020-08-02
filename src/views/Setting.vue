<template>
  <div id="setting">
    <div id="title">設定</div>
    <div class="button-box">
      <com-button :click-event="resetCache">キャッシュを削除</com-button>
    </div>
    <check-dialog :ok-click="resetOk" :no-click="resetNo" v-show="resetCheck">
      <template v-slot:title>確認</template>
      <template v-slot:body><p>
        本当にキャッシュを削除しますか？
      </p></template>
    </check-dialog>
  </div>
</template>

<script>
  import ComButton from '../components/ComButton'
  import CheckDialog from '../components/CheckDialog'

  export default {
    components: {
      'com-button': ComButton,
      'check-dialog': CheckDialog
    },
    data () {
      return {
        resetCheck: false
      }
    },
    methods: {
      resetCache () {
        this.resetCheck = true
      },
      resetOk () {
        this.$store.commit('resetList')
        this.resetCheck = false
      },
      resetNo () {
        this.resetCheck = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";

  #setting{
    @extend %root-body;
  }

  .button-box{
    display: flex;
    justify-content: center;
  }
</style>
