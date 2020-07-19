<template>
  <div class="select-o">
    <div v-if="showError" class="error-text">
      <slot name="warning"></slot>
    </div>
    <label :for="id" class="label" :class="{'label-reverse': reverseLabel}">
      <slot name="label-name"></slot>
    </label>
    <div class="select-field">
      <select :id="id" :ref="id" :value="selectValue"
              @change="$emit('change', $event.target.value)" :disabled="disabled">
        <slot></slot>
      </select>
      <div class="select-box">
        <span class="select-label" v-text="display"></span>
        <span class="select-mark"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SelectO',
    model: {
      prop: 'selectValue',
      event: 'change'
    },
    props: {
      selectValue: [String, Number],
      showError: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      reverseLabel: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        id: null,
        display: '',
        selectDom: null
      }
    },
    methods: {
      updateDisplay (dom) {
        if (dom !== null && dom !== undefined) {
          this.display = dom.options[dom.selectedIndex].text
        }
      }
    },
    watch: {
      selectDom: function (value) {
        this.updateDisplay(value)
      },
      selectValue: function () {
        this.updateDisplay(this.selectDom)
      }
    },
    mounted () {
      this.id = 'select-o-' + this._uid
      this.$nextTick(function () {
        this.selectDom = this.$refs[this.id]
      })
    }
  }
</script>

<style lang="scss" scoped>
  .select-o{
    position: relative;
    display: inline-flex;
    font-size: large;
    margin: auto 2px;

    .label{
      order: 0;
      font-size: small;
      transition: color .3s;
      margin: auto 0.3rem;
    }

    .label-reverse{
      order: 2;
    }

    .select-field{
      order: 1;
      position: relative;
      display: inline-flex;

      .select-box{
        order: 0;
        display: inline-flex;
        position: absolute;
        top: 0; right: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        box-sizing: border-box;
        border: none;
        border-bottom: solid 1px #777;
        transition: color .3s, border-color .3s, opacity .3s, background-color .3s;
        outline: none;
        background-color: white;

        .select-label{
          position: relative;
          top: 0; left: 0;
          text-align: center;
          width: 100%;
          margin: auto 0;
          padding-right: 1rem;
          box-sizing: border-box;
        }

        .select-mark{
          position: absolute;
          top: 0.6rem; right: 0.6rem;
          content: '';
          border-bottom: 2px solid;
          border-left  : 2px solid;
          width : 0.3rem;
          height: 0.3rem;
          transform: rotate(-45deg);
          transition: transform 0.3s;
        }
      }

      select{
        order: 1;
        opacity: 0;
        position: relative;
        z-index: 3;
        border: none;
        border-bottom: 1px solid;
        padding-right: 1rem;
        font-size: large;
        margin: 0;

        &:focus + .select-box{
          border-color: #1f6f00;
        }

        &:disabled + .select-box{
          background-color: #ddd;
          opacity: 0.8;
          & > .select-label,& > .select-mark{
            color: #444;
          }
        }

        &:hover:not(:disabled) + .select-box{
          & > .select-mark{
            transform: rotate(315deg);
          }
        }
      }
    }

    .error-text{
      position: absolute;
      display: inline-flex;
      left: 0;
      top: 100%;
      min-width: 100px;
      margin: 10px auto 0;
      padding: 3px;
      color: red;
      font-weight: bold;
      font-size: x-small;
      background-color: white;
      border: red 1px solid;
      border-radius: 4px;
      box-sizing: border-box;
      z-index: 5;

      &:before, &:after{
        display: block;
        content: '';
        position: absolute;
        left: 5px;
        top: -7px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 5px 7px 5px;
        border-color: transparent transparent red transparent;
      }
      &:after{
        left: 6px;
        top: -6px;
        border-style: solid;
        border-width: 0 4px 6.5px 4px;
        border-color: transparent transparent white transparent;
      }

      & ~ .label{
        color: red;
      }

      & ~ .select-field{
        .select-box{
          border-color: #ff6565;

          .select-label,.select-mark{
            color: red;
          }
        }

        select:focus + .select-box{
          border-color: red;
        }
      }
    }
  }
</style>
