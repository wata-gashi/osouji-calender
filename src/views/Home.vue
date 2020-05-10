<template>
  <div>
    <header-o id="header-o"></header-o>
    <osouji-list :osouji-list="osoujiList"
                 :list-func="{setOsoujiList, pushOsoujiList}"></osouji-list>
    <update-notification></update-notification>
    <footer-o></footer-o>
    <router-view name="add-dialog"></router-view>
    <router-view name="osouji-dialog" :osouji-list="osoujiList"></router-view>
  </div>
</template>

<script>
  import HeaderO from '../components/HeaderO'
  import OsoujiList from '../components/OsoujiList'
  import UpdateNotification from '../components/UpdateNotification'
  import FooterO from '../components/FooterO'

  export default {
    components: {
      'header-o': HeaderO,
      'osouji-list': OsoujiList,
      'update-notification': UpdateNotification,
      'footer-o': FooterO
    },
    data () {
      return {
        osoujiList: []
      }
    },
    methods: {
      async setOsoujiList (data) {
        console.log('set')
        this.osoujiList = data
      },
      async pushOsoujiList (data) {
        console.log('push')
        this.osoujiList.push(data)
      }
    }
  }
</script>
