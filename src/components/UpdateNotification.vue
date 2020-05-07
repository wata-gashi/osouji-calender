<template>
  <transition name="fade">
    <div class="update-notification" v-show="visible">
      <div class="msg">{{message}}</div>
      <div class="btn-container">
        <com-button class="btn-light"
                    @updateCache="updateCache"
                    click-event="updateCache">更新</com-button>
<!--        <com-button class="btn-light" @close="visible = false"
                    click-event="close">閉じる</com-button> !-->
      </div>
    </div>
  </transition>
</template>

<script>
  import ComButton from './ComButton'

  export default {
    name: 'UpdateNotification',
    components: {
      'com-button': ComButton
    },
    data () {
      return {
        visible: false,
        message: '新しいバージョンが配信されています。'
      }
    },
    methods: {
      showNotification () {
        this.visible = true
      },
      updateCache () {
        navigator.serviceWorker.controller.postMessage('updateCache')
        this.visible = false
        setTimeout(function () {
          location.reload()
        })
      }
    },
    created () {
      navigator.serviceWorker
        .addEventListener('message', event => {
          if (event.data.toString() === 'latestDetection') {
            this.showNotification()
          }
        })
    }
  }
</script>

<style lang="scss" scoped>
  .update-notification{
    display: inline;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(#111, 0.8);
    padding: 5px;

    .msg{
      color: white;
      font-size: 1.2em;
      text-align: center;
      font-weight: bold;
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }
  }

  .fade-enter-active, .fade-leave-active{
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
