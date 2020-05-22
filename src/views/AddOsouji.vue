<template>
  <div class="dialog">
    <div class="dialog-inner add-dialog-inner">
      <div class="title">おそうじの追加</div>
      <div class="dialog-inner-elements">
        <label>おそうじ名:
          <input id="text-osouji-name"
                 v-model="osoujiName"
                 @keydown.enter="osoujiName?this.focus:''"
                 tabindex="1" autofocus>
        </label>
        <div class="group">
          <div class="group-title">おそうじ周期</div>
          <div class="group-inner">
            <div class="btn-container-left">
              <check-box v-model="cycleListShow" tabindex="2">
                指定する:
              </check-box>
            </div>
            <div class="cycle-setting" v-visible="cycleListShow">
              <label>
                周期単位:
                <select v-model="cycle" tabindex="3">
                  <option value="every">毎日</option>
                  <option value="daily">日</option>
                  <option value="weekly">週</option>
                  <option value="monthly">月</option>
                  <option value="dtd">曜日</option>
                </select>
              </label>
              <div id="number-input-area" v-if="isNumberInput">
                <label>
                  <input type="number" class="number-input"
                         v-model.number="numberInputData" tabindex="4"/>
                  <span v-if="cycle==='daily'">
                  日置き
                </span>
                  <span v-else-if="cycle==='weekly'">
                  週間置き
                </span>
                  <span v-else-if="cycle==='monthly'">
                  ヵ月置き
                </span>
                </label>
                <div v-show="warningNotNumber" class="warning">
                  数値を入力してください。
                </div>
              </div>
              <div v-if="cycle==='dtd'">
                <label>
                  <select v-model="inputData" tabindex="5">
                    <option>月</option>
                    <option>火</option>
                    <option>水</option>
                    <option>木</option>
                    <option>金</option>
                    <option>土</option>
                    <option>日</option>
                  </select>
                  曜日
                </label>
              </div>
              <label>
                開始日:
                <input type="date" :min="today">
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-container">
        <com-button :is-disabled="addDisabled"
                    :click-event="add" tabindex="6">追加</com-button>
        <span class="btn-container-spacer"></span>
        <com-button :click-event="close" tabindex="7">閉じる</com-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ComButton from '../components/ComButton'
  import CheckBox from '../components/CheckBox'

  export default {
    name: 'AddOsouji',
    components: {
      'com-button': ComButton,
      'check-box': CheckBox
    },
    data () {
      return {
        osoujiName: '',
        cycle: '',
        cycleListShow: false,
        inputData: '',
        numberInputData: 1,
        today: this.getToday()
      }
    },
    computed: {
      addDisabled: function () {
        return !this.osoujiName
      },
      isNumberInput: function () {
        return this.cycle !== '' && this.cycle !== 'every' && this.cycle !== 'dtd'
      },
      warningNotNumber: function () {
        return typeof this.numberInputData !== 'number'
      }
    },
    methods: {
      add () {
        this.$eventHub.$emit('add-osouji', {
          osoujiName: this.osoujiName
        })
        this.$router.push('/')
      },
      close () {
        this.$router.back()
      },
      getToday () {
        let date = new Date()
        return date.getFullYear() +
          (date.getMonth() + 1 < 10 ? '-0' : '-') + (date.getMonth() + 1) +
          (date.getDate() < 10 ? '-0' : '-') + date.getDate()
      }
    },
    watch: {
      numberInputData: function (data) {
        if (data < 1) this.numberInputData = 1
        else if (data > 999) this.numberInputData = 999
      }
    },
    mounted () {
      // document.getElementById('text-osouji-name').focus()
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

  #number-input-area{
    .number-input{
      width: 3em;
      text-align: right;
    }
  }
</style>
