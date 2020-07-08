<template>
  <div class="group" :class="{'group-error': isDisabled}">
    <div class="group-title">おそうじ周期</div>
    <div class="group-inner">
      <div class="btn-container">
        <check-box v-model="innerCycleListShow" tabindex="2" :read-only="readOnly">
          <span v-if="innerCycleListShow">指定する</span>
          <span v-else>指定しない</span>
        </check-box>
      </div>
      <transition name="fade-opacity">
        <div class="cycle" v-show="innerCycleListShow">
          <div class="cycle-setting">
            <div class="input-item">
              <label for="cycle-select" class="input-label">
                周期単位
              </label>
              <div class="input-field">
                <select id="cycle-select" v-model="innerCycle" tabindex="3" :disabled="readOnly">
                  <option v-for="c in cycleList"
                          :value="c.value" v-text="c.name"></option>
                </select>
              </div>
            </div>
            <div class="input-item-reverse" v-if="isNumberInput">
              <label for="number-input" class="input-label">
                <span v-if="innerCycle===this.cycleList[1].value">
                  日置き
                </span>
                <span v-else-if="innerCycle===this.cycleList[2].value">
                  週間置き
                </span>
                <span v-else-if="innerCycle===this.cycleList[3].value">
                  ヵ月置き
                </span>
              </label>
              <div class="input-field">
                <input id="number-input" type="number" class="number-input" v-model.number="innerNumberInputData"
                       tabindex="4" :disabled="readOnly" min="1" max="999">
              </div>
            </div>
            <div v-show="warningNotNumber" class="warning">
              数値を入力してください。
            </div>
            <div class="input-item-reverse" v-if="innerCycle==='dtd'">
              <label for="select-day" class="input-label">曜日</label>
              <div class="input-field">
                <select id="select-day" v-model="innerSelectDay" tabindex="5" :disabled="readOnly">
                  <option v-for="(day, index) in $store.state.days"
                          :value="index"
                          v-text="day"></option>
                </select>
              </div>
            </div>
          </div>
          <span class="spacer-vertical"></span>
          <!--label class="input-label" :class="{'error-input': $v.inputDateRaw.$error}">
            開始日
            <input type="date" id="input-date"
                   :min="formatDate(startDate)" v-model="inputDate"
                   :step="dateStep" tabindex="7" pattern="\d{4}-\d{2}-\d{2}"
                   @input="setDate($event.target.value)" required>
            <span class="error-text" v-if="$v.inputDateRaw.$error">有効な値を入力してください。</span>
          </label-->
          <date-input :min-date="startDate" :input-date="innerInputDate" :step="dateStep" :read-only="readOnly"
                      @date-error="setDateError" @update-year="updateYear"
                      @update-month="updateMonth" @update-date="updateDate" ref="dateInput"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import CheckBox from '../components/CheckBox'
  import DateInput from '../components/DateInput'

  export default {
    name: 'CycleSetting',
    components: {
      'check-box': CheckBox,
      'date-input': DateInput
    },
    props: {
      readOnly: {
        type: Boolean,
        default: false
      },
      cycleListShow: {
        type: Boolean,
        required: true
      },
      cycle: {
        type: String,
        required: true
      },
      numberInputData: {
        type: Number,
        required: true
      },
      selectDay: {
        type: Number,
        required: true
      },
      inputDate: {
        type: Date,
        required: true
      },
      minDate: {
        type: Date,
        required: this.readOnly
      }
    },
    data () {
      return {
        today: this.getMinDay(),
        dateError: false
      }
    },
    computed: {
      cycleList: function () {
        return this.$store.state.cycleList
      },
      innerCycleListShow: {
        get () {
          return this.$props.cycleListShow
        },
        set (value) {
          this.$emit('changeCls', value)
        }
      },
      innerCycle: {
        get () {
          return this.$props.cycle
        },
        set (value) {
          this.$emit('changeC', value)
        }
      },
      innerNumberInputData: {
        get () {
          return this.$props.numberInputData
        },
        set (value) {
          if (value.length === 0 || value < 1) this.$emit('changeNid', 1)
          else if (value > 999) this.$emit('changeNid', 999)
          else this.$emit('changeNid', value)
        }
      },
      innerSelectDay: {
        get () {
          return this.$props.selectDay
        },
        set (value) {
          this.$emit('changeSd', value)
        }
      },
      innerInputDate: {
        get () {
          return this.$props.inputDate
        },
        set (value) {
          this.$emit('changeId', value)
        }
      },
      isNumberInput: function () {
        return this.innerCycle !== '' && this.innerCycle !== this.cycleList[0].value && this.innerCycle !== this.cycleList[4].value
      },
      warningNotNumber: function () {
        return typeof this.innerNumberInputData !== 'number'
      },
      startDate: function () {
        if (this.innerCycle === this.cycleList[4].value) {
          if (!isNaN(this.innerSelectDay)) {
            return this.nextDay(this.innerSelectDay)
          } else {
            return undefined
          }
        } else {
          return this.today
        }
      },
      dateStep: function () {
        return this.innerCycle === this.cycleList[4].value ? 7 : 1
      },
      isDisabled: function () {
        if (this.innerCycleListShow) {
          if (this.innerCycle !== '') {
            return this.dateError
          }
        }
        return false
      }
    },
    methods: {
      setDateError (error) {
        this.dateError = error
      },
      updateYear (year) {
        const cpy = new Date(this.innerInputDate)
        cpy.setFullYear(year)
        this.innerInputDate = cpy
      },
      updateMonth (month) {
        const cpy = new Date(this.innerInputDate)
        cpy.setMonth(month - 1)
        this.innerInputDate = cpy
      },
      updateDate (date) {
        const cpy = new Date(this.innerInputDate)
        cpy.setDate(date)
        this.innerInputDate = cpy
      },
      nextDay (day) {
        const date = new Date(this.today)
        if (date.getDay() !== day) {
          let nextDate = day - date.getDay()
          if (nextDate < 0) nextDate += 7
          date.setDate(date.getDate() + nextDate)
        }
        return date
      },
      getMinDay: function () {
        const today = new Date()
        if (this.readOnly) {
          return this.minDate < today ? this.minDate : new Date(today.getFullYear(), today.getMonth(), today.getDate())
        }
        return new Date(today.getFullYear(), today.getMonth(), today.getDate())
      }
    },
    watch: {
      isDisabled: function (disabled) {
        this.$emit('isDisabled', disabled)
      },
      innerCycle: function (data) {
        if (data === this.cycleList[4].value) {
          this.innerInputDate = this.nextDay(this.innerSelectDay)
        }
      },
      innerSelectDay: function (day) {
        this.innerInputDate = this.nextDay(day)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/input";

  .cycle{
    display: flex;
    flex-flow: column wrap;
    margin: 5px 0;
  }

  .cycle-setting{
  }

  .fade-opacity-enter-active, .fade-opacity-leave-active{
    transition: height .3s, opacity .3s;
  }
  .fade-opacity-enter, .fade-opacity-leave-to{
    opacity: 0;
  }
</style>
