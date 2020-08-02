<template>
  <transition name="fade">
    <li class="osouji-item" @click="$emit('osoujiClick', osouji.id)">
      {{osouji.name}}
      <span class="label" v-text="labelText()"></span>
      <span class="date" v-text="nextDateText()"></span>
      <div class="remove" :target="removeVisible.toString()" @click.stop="remove">
        削除
      </div>
    </li>
  </transition>
</template>

<script>
export default {
  props: {
    osouji: {
      type: Object,
      required: true
    },
    nextDate: {
      type: Date,
      default: undefined
    },
    removeVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    remove () {
      this.$store.commit('removeOsouji', this.osouji.id)
    },
    nextDateText () {
      if (this.nextDate !== undefined) {
        return this.nextDate.toLocaleDateString() +
          '(' + this.$store.state.days[this.nextDate.getDay()] + ')'
      }
      return ''
    },
    labelText () {
      if (this.osouji.enableCycle) {
        switch (this.osouji.cycle.type) {
          case this.$store.state.cycleList[0].value:
            return '毎日'
          case this.$store.state.cycleList[1].value:
            return this.osouji.cycle.numberInputData + '日'
          case this.$store.state.cycleList[2].value:
            return this.osouji.cycle.numberInputData + '週間'
          case this.$store.state.cycleList[3].value:
            return this.osouji.cycle.numberInputData + 'ヵ月'
          case this.$store.state.cycleList[4].value:
            return this.$store.state.days[this.osouji.cycle.selectDay]
        }
      }
      return 'なし'
    }
  }
}
</script>

<style lang="scss" scoped>
  .osouji-item{
    display: flex;
    position: relative;
    padding: 7px 5px 7px 10px;
    color: #328632;
    margin-bottom: 5px;
    background: #cff6cf;
    border-left: solid 5px #377937;
    box-shadow: 1px 1px 2px rgba(#000, 0.1);
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    .remove{
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      padding: 0 15px;
      background-color: #ff6969;
      font-weight: normal;
      font-size: 1.2em;
      color: rgba(white, 0.9);
      align-items: center;
      justify-content: center;
      transition: transform .3s, opacity .3s, background-color .2s;
      opacity: 1;

      &[target="false"]{
        transform: translateX(100%);
        opacity: 0;
      }

      &[target="true"]{
        cursor: pointer;

        &:hover{
          background-color: #d01818;
        }
      }
    }

    .label{
      color: white;
      background-color: #08c875;
      font-size: 0.8em;
      padding: 0.1em 0.4em;
      border-radius: 6px;
      margin: auto 0.5em;
      white-space: nowrap;
    }

    .date{
      color: #328632;
      font-size: 0.7em;
      margin: auto 0;
      white-space: nowrap;
    }
  }
</style>
