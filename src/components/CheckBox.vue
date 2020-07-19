<template>
  <div class="checkbox-area">
    <label class="checkbox-area-text"><slot></slot></label>
    <label class="checkbox-area-label" :class="{'disabled': readOnly}"
           @keypress.enter.space="$emit('change', !checked)"
           :tabindex="tabindex">
      <input type="checkbox" class="checkbox-area-label-main"
             v-bind:checked="checked"
             @change="$emit('change', $event.target.checked)" :disabled="readOnly">
      <span class="checkbox-area-label-box"></span>
    </label>
  </div>
</template>

<script>
  export default {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      tabindex: {
        default: '0'
      },
      checked: Boolean,
      readOnly: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  $checkbox-size: 50px;

  .checkbox-area{
    display: flex;
    justify-content: flex-start;

    &-text{
      margin: auto 3px auto 0;
      padding: 0 3px;
      font-size: small;
    }

    .checkbox-area-label{
      display: block;
      width: $checkbox-size;
      box-sizing: border-box;
      text-align: left;
      border: 2px solid #888;
      border-radius: 3px;
      line-height: 1;
      height: $checkbox-size / 2;
      overflow: hidden;
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      transition: border-color .3s;

      &:not(.disabled){
        border-color: #5da05d;
      }

      &-main{
        display: none;

        &:checked + .checkbox-area-label-box{
          transform: translateX(100%);
          background-color: #5da05d;
        }
        &:disabled + .checkbox-area-label-box{
          background-color: #888;
        }
      }

      &-box{
        display: inline-block;
        height: $checkbox-size / 2 - 2px;
        width: 50%;
        background-color: #ddd;
        transition: transform .3s, background-color .3s;
      }
    }
  }
</style>
