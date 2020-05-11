<template>
  <div id="footer-o">
    pre-{{version}}
  </div>
</template>

<script>
  export default {
    name: 'FooterO',
    data () {
      return {
        version: '0.1.4'
      }
    },
    methods: {
      setVersion (data) {
        if (this.version !== data.version) {
          this.version = data.version
          this.$eventHub.$emit('show-notification')
        }
      }
    },
    created () {
      this.$eventHub.$on('set-version', this.setVersion)
    }
  }
</script>
