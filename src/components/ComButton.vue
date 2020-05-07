<template>
  <div class="btn" :class="{'disabled': isDisabled}"
       @click="clickEvent&&!isDisabled?$emit(clickEvent):''">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'ComButton',
    props: {
      clickEvent: String,
      isDisabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
