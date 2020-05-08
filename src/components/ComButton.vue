<template>
  <div class="btn" :class="{'disabled': isDisabled}"
       @click="clickEvent&&!isDisabled?clickEvent.call():''">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'ComButton',
    props: {
      clickEvent: Function,
      isDisabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
