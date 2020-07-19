<template>
  <div class="btn" :class="{'disabled': isDisabled}"
       @click="click" @keypress.enter.space="click" :tabindex="tabindex">
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
      },
      tabindex: {
        type: String,
        default: '0'
      }
    },
    methods: {
      click () {
        return this.clickEvent && !this.isDisabled ? this.clickEvent.call() : ''
      }
    }
  }
</script>
<style lang="scss" scoped>
  .btn{
    border: none;
    background-color: #2c3e50;
    color: white;
    padding: 10px 20px;
    margin: 3px;
    transition: all 200ms ease-in-out;
    text-decoration: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:not(.disabled):hover{
      background-color: #42b983;
    }
  }
  .disabled{
    background-color: #444444;
    opacity: 0.5;
  }
  .btn-light{
    background-color: #6792ba;
  }
</style>
