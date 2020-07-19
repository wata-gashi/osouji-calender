<template>
  <div class="dialog">
    <div class="dialog-inner add-dialog-inner">
      <div class="title">おそうじの追加</div>
      <div class="dialog-inner-elements">
        <label for="text-osouji-name" class="input-label" :class="{ 'error-input': $v.osoujiName.$error }">
          おそうじ名
        </label>
        <div class="input-field">
          <input id="text-osouji-name"
                 v-model.trim="$v.osoujiName.$model"
                 tabindex="1" placeholder="おそうじ名" autofocus>
          <transition name="fade-opacity">
            <span class="error-text" v-if="$v.osoujiName.$error">おそうじ名を入力してください。</span>
          </transition>
        </div>
        <cycle-setting :cycle="cycle" :cycle-list-show="cycleListShow"
                       :input-date="inputDate" :number-input-data="numberInputData"
                       :select-day="selectDay"
                       @changeCls="cycleListShow=$event" @changeC="cycle=$event"
                       @changeId="inputDate=$event" @changeNid="numberInputData=$event"
                       @changeSd="selectDay=$event" @isDisabled="dateError=$event"
        />
      </div>
      <div class="btn-container">
        <com-button :is-disabled="addDisabled"
                    :click-event="add" tabindex="10">追加</com-button>
        <span class="btn-container-spacer"></span>
        <com-button :click-event="close" tabindex="11">閉じる</com-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ComButton from '../components/ComButton'
  import CheckBox from '../components/CheckBox'
  import DateInput from '../components/DateInput'
  import CycleSetting from '../components/CycleSetting'
  import {required} from 'vuelidate/lib/validators'

  export default {
    name: 'AddOsouji',
    components: {
      'com-button': ComButton,
      'check-box': CheckBox,
      'date-input': DateInput,
      'cycle-setting': CycleSetting
    },
    data () {
      return {
        osoujiName: '',
        cycle: 'every',
        cycleListShow: false,
        selectDay: new Date().getDay(),
        numberInputData: 1,
        inputDate: this.getToday(),
        dateError: false
      }
    },
    validations: {
      osoujiName: {
        required
      }
    },
    computed: {
      addDisabled: function () {
        if (this.osoujiName) {
          return this.dateError
        }
        return true
      },
      cycleList: function () {
        return this.$store.state.cycleList
      }
    },
    methods: {
      add () {
        this.$store.commit('addOsouji', {
          name: this.osoujiName,
          enableCycle: this.cycleListShow,
          cycle: this.cycleListShow ? {
            type: this.cycle,
            numberInputData: this.cycle !== 'every' && this.cycle !== 'dtd' ? this.numberInputData : -1,
            selectDay: this.cycle === 'dtd' ? this.selectDay : -1,
            startDate: this.inputDate.toJSON()
          } : {}
        })
        this.$router.push({name: 'list'})
      },
      close () {
        this.$router.back()
      },
      getToday: function () {
        const today = new Date()
        return new Date(today.getFullYear(), today.getMonth(), today.getDate())
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/input";
  .input-field > input{
    width: 12em;
  }
</style>
