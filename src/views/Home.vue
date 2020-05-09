<template>
  <div>
    <header-o id="header-o"></header-o>
    <osouji-list></osouji-list>
    <update-notification></update-notification>
    <footer-o></footer-o>
  </div>
</template>

<script>
  import HeaderO from '../components/HeaderO'
  import OsoujiList from '../components/OsoujiList'
  import UpdateNotification from '../components/UpdateNotification'
  import FooterO from '../components/FooterO'

  export default {
    el: 'app',

    components: {
      'header-o': HeaderO,
      'osouji-list': OsoujiList,
      'update-notification': UpdateNotification,
      'footer-o': FooterO
    },
    data () {
      return {
      }
    }
  }
</script>
