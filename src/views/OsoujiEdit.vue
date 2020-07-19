<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="title">詳細情報</div>
      <div class="btn-container">
        <check-box v-model="edit">編集:</check-box>
      </div>
      <div class="dialog-inner-elements">
        <div v-if="osouji">
          <label for="osouji-name" class="input-label" :class="{ 'error-input': $v.inputName.$error }">
            おそうじ名
          </label>
          <div class="input-field">
            <input id="osouji-name" v-model.trim="$v.inputName.$model"
                   placeholder="おそうじ名" :disabled="readOnly">
            <transition name="fade-opacity">
              <span class="error-text" v-if="$v.inputName.$error">おそうじ名を入力してください。</span>
            </transition>
          </div>
          <cycle-setting :read-only="readOnly" :min-date="startDate"
                         :cycle="cycle" :cycle-list-show="enableCycle"
                         :input-date="startDate" :number-input-data="numberInputData"
                         :select-day="selectDay"
                         @changeCls="enableCycle=$event" @changeC="cycle=$event"
                         @changeId="startDate=$event" @changeNid="numberInputData=$event"
                         @changeSd="selectDay=$event" @isDisabled="dateError=$event"
          />
        </div>
        <div v-else>
          <strong style="color: red">指定IDが見つかりません。</strong>
        </div>
      </div>
      <div class="btn-container">
        <com-button :click-event="save" :is-disabled="saveDisabled" v-if="!readOnly">保存</com-button>
        <com-button :click-event="close">閉じる</com-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ComButton from '../components/ComButton'
  import CycleSetting from '../components/CycleSetting'
  import CheckBox from '../components/CheckBox'
  import {required} from 'vuelidate/lib/validators'

  export default {
    name: 'OsoujiInfo',
    components: {
      'com-button': ComButton,
      'cycle-setting': CycleSetting,
      'check-box': CheckBox
    },
    props: ['id'],
    data () {
      return {
        readOnly: true,
        osouji: undefined,
        inputName: '',
        enableCycle: false,
        cycle: 'every',
        numberInputData: 1,
        selectDay: 0,
        startDate: {
          type: Date
        },
        dateError: false
      }
    },
    validations: {
      inputName: {
        required
      }
    },
    methods: {
      save () {
        this.$store.commit('updateOsouji', {
          osouji: {
            id: this.osouji.id,
            name: this.inputName,
            enableCycle: this.enableCycle,
            cycle: {
              type: this.cycle,
              numberInputData: this.numberInputData,
              selectDay: this.selectDay,
              startDate: this.startDate.toJSON()
            }
          },
          id: this.osouji.id
        })
        this.$router.push({name: 'list'})
      },
      close () {
        this.$router.back()
      }
    },
    computed: {
      osoujiList: function () {
        return this.$store.state.osoujiList
      },
      cycleList: function () {
        return this.$store.state.cycleList
      },
      isNumberInput: function () {
        return this.cycle !== '' && this.cycle !== this.cycleList[0].value && this.cycle !== this.cycleList[4].value
      },
      edit: {
        get () {
          return !this.readOnly
        },
        set (value) {
          this.readOnly = !value
        }
      },
      saveDisabled: function () {
        if (this.inputName) {
          return this.dateError
        }
        return true
      }
    },
    created () {
      for (let i = 0; i < this.osoujiList.length; i++) {
        let osouji = this.osoujiList[i]
        if (osouji.id === this.id) {
          this.osouji = osouji
          break
        }
      }
      if (this.osouji) {
        this.inputName = this.osouji.name
        this.enableCycle = this.osouji.enableCycle
        if (this.enableCycle) {
          this.cycle = this.osouji.cycle.type
          if (this.cycle !== 'every' && this.cycle !== 'dtd') {
            this.numberInputData = this.osouji.cycle.numberInputData
          }
          if (this.cycle === 'dtd') {
            this.selectDay = this.osouji.cycle.selectDay
          }
          this.startDate = new Date(this.osouji.cycle.startDate)
        } else {
          this.selectDay = new Date().getDay()
          const today = new Date()
          this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        }
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
