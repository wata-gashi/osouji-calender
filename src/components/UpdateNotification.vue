<template>
  <transition name="fade">
    <div class="update-notification" v-show="visible">
      <div class="msg" v-text="message"></div>
      <div class="btn-container">
        <span class="msg">NEW: ver. {{version}}</span>
        <span class="btn-container-spacer"></span>
        <com-button class="btn-light"
                    :click-event="updateCache">更新</com-button>
      </div>
    </div>
  </transition>
</template>

<script>
  import ComButton from './ComButton'

  const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  )

  export default {
    name: 'UpdateNotification',
    components: {
      'com-button': ComButton
    },
    data () {
      return {
        version: '0.1.6',
        visible: false,
        message: '新しいバージョンが配信されています。'
      }
    },
    methods: {
      showNotification () {
        this.visible = true
      },
      updateCache () {
        setTimeout(function () {
          location.reload()
        })
      }
    },
    mounted () {
      window.setTimeout(function () {
        const xmlhttp = new XMLHttpRequest()

        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
              const jsondata = JSON.parse(xmlhttp.responseText)

              if (this.version !== jsondata.version) {
                this.version = jsondata.version
                this.showNotification()
              }
            }
          }
        }
        xmlhttp.open('GET', (isLocalhost ? '' : '/osouji-calender') + '/static/version.json')
        xmlhttp.send()
      }, 3000)
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
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }
  }

  .fade-enter-active, .fade-leave-active{
    transition: transform .3s, opacity .3s;
  }
  .fade-enter, .fade-leave-to{
    transform: translateY(100%);
    opacity: 0;
  }
</style>
