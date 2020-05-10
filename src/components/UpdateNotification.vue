<template>
  <transition name="fade">
    <div class="update-notification" v-show="visible">
      <div class="msg">{{message}}</div>
      <div class="btn-container">
        <com-button class="btn-light"
                    :click-event="updateCache">更新</com-button>
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
        /** if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({type: 'updateCache'})
        }**/
        setTimeout(function () {
          location.reload()
        })
      }
    },
    /** created () {
      console.log(navigator.serviceWorker)
      if (navigator.serviceWorker.controller) {
        const { port1, port2 } = new MessageChannel()
        port1.onmessage = event => { if (event.data.toString() === 'latestDetection') this.showNotification() }
        navigator.serviceWorker.controller.postMessage('init', [port2])
      }
    },**/
    mounted () {
      this.$eventHub.$on('show-notification', this.showNotification)
      /** if (navigator.serviceWorker.controller) {
        navigator.serviceWorker
          .addEventListener('message', event => {
            console.log('test1')
            if (event.data.type === 'latestDetection') {
              console.log('test2')
              this.showNotification()
            }
          })
        navigator.serviceWorker.controller.postMessage({type: 'updateCheck'})
      }**/
    }
  }
</script>

<style lang="scss">
  .update-notification{
    display: inline;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(#111, 0.8);
    padding: 5px;
    z-index: 10;

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
