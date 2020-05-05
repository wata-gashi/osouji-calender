<template>
    <div>
        <header-o id="header-o"></header-o>
        <osouji-list></osouji-list>
    </div>
</template>

<script>
  import HeaderO from '../components/HeaderO'
  import OsoujiList from '../components/OsoujiList'

  export default {
    el: 'app',

    components: {
      'header-o': HeaderO,
      'osouji-list': OsoujiList
    },
    data () {
      return {
      }
    }
  }
</script>
