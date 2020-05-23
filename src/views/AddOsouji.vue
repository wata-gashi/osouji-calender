<template>
  <div class="dialog">
    <div class="dialog-inner add-dialog-inner">
      <div class="title">おそうじの追加</div>
      <div class="dialog-inner-elements">
        <label class="input-label" :class="{ 'error-input': $v.osoujiName.$error }">
          おそうじ名
          <input id="text-osouji-name"
                 v-model.trim="$v.osoujiName.$model"
                 tabindex="1" placeholder="おそうじ名" autofocus>
          <span class="error-text" v-if="$v.osoujiName.$error">おそうじ名を入力してください。</span>
        </label>
        <div class="group">
          <div class="group-title">おそうじ周期</div>
          <div class="group-inner">
            <div class="btn-container-left">
              <check-box v-model="cycleListShow" tabindex="2">
                指定する:
              </check-box>
            </div>
            <transition name="fade-opacity">
              <div class="cycle-setting" v-show="cycleListShow">
                <label>
                  周期単位:
                  <select v-model="cycle" tabindex="3">
                    <option v-for="cycle in cycleList"
                            :value="cycle.value" v-text="cycle.name"></option>
                  </select>
                </label>
                <div v-if="isNumberInput">
                  <label class="cycle-input">
                    <input type="number" class="number-input"
                           v-model.number="numberInputData" tabindex="4"/>
                    <span v-if="cycle===this.cycleList[1].value">
                    日置き
                  </span>
                    <span v-else-if="cycle===this.cycleList[2].value">
                    週間置き
                  </span>
                    <span v-else-if="cycle===this.cycleList[3].value">
                    ヵ月置き
                  </span>
                  </label>
                  <div v-show="warningNotNumber" class="warning">
                    数値を入力してください。
                  </div>
                </div>
                <div v-if="cycle==='dtd'">
                  <label class="cycle-input">
                    <select v-model="selectDay" tabindex="5">
                      <option v-for="(day, index) in days"
                              :value="index"
                              v-text="day"></option>
                    </select>
                    <span>曜日</span>
                  </label>
                </div>
                <span class="spacer-vertical"></span>
                <label class="input-label" :class="{'error-input': $v.inputDateRaw.$error}">
                  開始日
                  <input type="date" id="input-date"
                         :min="formatDate(startDate)" v-model="inputDate"
                         :step="dateStep" tabindex="7" pattern="\d{4}-\d{2}-\d{2}"
                         @input="setDate($event.target.value)" required>
                  <span class="error-text" v-if="$v.inputDateRaw.$error">有効な値を入力してください。</span>
                </label>
              </div>
            </transition>
          </div>
        </div>
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
  import {required} from 'vuelidate/lib/validators'

  const minDate = (value, vm) => +vm.startDate <= +value
  const checkDay = (value, vm) => vm.cycle !== vm.cycleList[4].value || vm.selectDay === value.getDay()

  export default {
    name: 'AddOsouji',
    components: {
      'com-button': ComButton,
      'check-box': CheckBox
    },
    data () {
      return {
        osoujiName: '',
        cycle: 'every',
        cycleList: [
          {
            value: 'every',
            name: '毎日'
          },
          {
            value: 'daily',
            name: '日'
          },
          {
            value: 'weekly',
            name: '週'
          },
          {
            value: 'monthly',
            name: '月'
          },
          {
            value: 'dtd',
            name: '曜日'
          }
        ],
        cycleListShow: false,
        selectDay: new Date().getDay(),
        numberInputData: 1,
        today: this.getToday(),
        inputDateRaw: this.getToday(),
        inputDate: this.formatDate(new Date()),
        days: ['日', '月', '火', '水', '木', '金', '土']
      }
    },
    validations: {
      osoujiName: {
        required
      },
      inputDateRaw: {
        required,
        minDate,
        checkDay
      }
    },
    computed: {
      addDisabled: function () {
        if (this.osoujiName) {
          if (this.cycleListShow) {
            if (this.cycle !== '') {
              if (this.$v.inputDateRaw.minDate) {
                if (this.cycle === this.cycleList[4].value) {
                  if (this.inputDateRaw.getDay() !== this.selectDay) return true
                }
                return false
              }
            }
          } else return false
        }
        return true
      },
      isNumberInput: function () {
        return this.cycle !== '' && this.cycle !== this.cycleList[0].value && this.cycle !== this.cycleList[4].value
      },
      warningNotNumber: function () {
        return typeof this.numberInputData !== 'number'
      },
      startDate: function () {
        if (this.cycle === this.cycleList[4].value) {
          if (!isNaN(this.selectDay)) {
            return this.nextDay(this.selectDay)
          } else {
            return undefined
          }
        } else {
          return this.today
        }
      },
      dateStep: function () {
        return this.cycle === this.cycleList[4].value ? 7 : 1
      }
    },
    methods: {
      add () {
        this.$eventHub.$emit('add-osouji', {
          osoujiName: this.osoujiName
        })
        this.$router.push('/list')
      },
      close () {
        this.$router.back()
      },
      nextDay (day) {
        const date = this.getToday()
        if (date.getDay() !== day) {
          let nextDate = day - date.getDay()
          if (nextDate < 0) nextDate += 7
          date.setDate(date.getDate() + nextDate)
        }
        return date
      },
      formatDate (date) {
        return date.getFullYear() +
          (date.getMonth() + 1 < 10 ? '-0' : '-') + (date.getMonth() + 1) +
          (date.getDate() < 10 ? '-0' : '-') + date.getDate()
      },
      formatDateRaw (date) {
        return new Date(date + ' 00:00:00')
      },
      getToday: function () {
        const today = new Date()
        return new Date(today.getFullYear(), today.getMonth(), today.getDate())
      },
      setDate (value) {
        this.inputDate = value
      }
    },
    watch: {
      numberInputData: function (data) {
        if (data < 1) this.numberInputData = 1
        else if (data > 999) this.numberInputData = 999
      },
      cycle: function (data) {
        if (data === this.cycleList[4].value) {
          this.inputDate = this.formatDate(this.nextDay(this.selectDay))
        }
      },
      selectDay: function (day) {
        this.inputDate = this.formatDate(this.nextDay(day))
      },
      inputDate: function (date) {
        this.$v.inputDateRaw.$model = this.formatDateRaw(date)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .add-dialog-inner{
    height: 400px;
    overflow-y: auto;

    label{
      font-size: small;
    }
    input,select{
      font-size: large;
      margin: 2px 0;
    }

    #text-osouji-name{
      width: 12em;
    }
  }

  .cycle-setting{
    display: flex;
    flex-flow: column wrap;
    margin: 5px 0;
  }

  .cycle-input{
    display: flex;
    justify-content: flex-start;

    &:before{
      display: inline;
      content: '';
      position: relative;
      width : 6px;
      height: 6px;
      background: #1f6f00;
      border: 3px double white;
      border-radius: 50%;
      margin: auto 5px;
    }

    span{
      margin: auto 3px;
    }
  }

  .number-input{
    width: 3em;
    text-align: right;
  }

  .input-label{
    display: flex;
    flex-direction: column;
    transition: color .3s;

    & > input{
      border: none;
      border-bottom: solid 1px #777;
      transition: color .3s, border-color .3s;
      outline: none;

      &:focus{
        border-color: #1f6f00;
      }
    }
  }

  .error-input{
    color: red;

    & > input{
      color: red;
      border-color: #ff6565;

      &:focus{
        border-color: red;
      }
    }

    & > .error-text{
      color: red;
      font-size: x-small;
    }
  }

  #input-date{
    width: 10em;
  }

  .fade-opacity-enter-active, .fade-opacity-leave-active{
    transition: height .3s, opacity .3s;
  }
  .fade-opacity-enter, .fade-opacity-leave-to{
    opacity: 0;
  }
</style>
