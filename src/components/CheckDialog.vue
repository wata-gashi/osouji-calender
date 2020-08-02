<template>
  <div class="dialog">
    <div class="dialog-inner">
      <span class="title"><slot name="title"></slot></span>
      <div class="dialog-inner-elements">
        <slot name="body"></slot>
      </div>
      <div class="btn-container btn-container-centering">
        <com-button :click-event="noClick">いいえ</com-button>
        <com-button :click-event="okClick">はい</com-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ComButton from './ComButton'

  export default {
    name: 'CheckDialog',
    components: {
      'com-button': ComButton
    },
    props: {
      okClick: {
        type: Function,
        required: true
      },
      noClick: {
        type: Function,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
