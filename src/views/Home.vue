<template>
  <div>
    <header-o id="header-o"></header-o>
    <osouji-list></osouji-list>
    <update-notification></update-notification>
  </div>
</template>

<script>
  import HeaderO from '../components/HeaderO'
  import OsoujiList from '../components/OsoujiList'
  import UpdateNotification from '../components/UpdateNotification'

  export default {
    el: 'app',

    components: {
      'header-o': HeaderO,
      'osouji-list': OsoujiList,
      'update-notification': UpdateNotification
    },
    data () {
      return {
      }
    }
  }
</script>
