<template>
    <div class="date-input">
      <span>開始日</span>
      <div class="date-input-inner">
        <select-o v-model.number="year" :show-error="isErrorYear" :reverse-label="true" :disabled="readOnly">
          <template v-slot:label-name>年</template>
          <template v-slot:default>
            <option v-for="y in getYearList" :value="y" v-text="y"></option>
          </template>
          <template v-slot:warning>年を選択してください</template>
        </select-o>
        <select-o v-model.number="month" :show-error="isErrorMonth" :reverse-label="true" :disabled="readOnly">
          <template v-slot:label-name>月</template>
          <template v-slot:default>
            <option v-for="m in getMonthList" :value="m" v-text="m"></option>
          </template>
          <template v-slot:warning>月を選択してください</template>
        </select-o>
        <select-o v-model.number="date" :show-error="isErrorDate" :reverse-label="true" :disabled="readOnly">
          <template v-slot:label-name>日</template>
          <template v-slot:default>
            <option v-for="d in getDateList" :value="d" v-text="d"></option>
          </template>
          <template v-slot:warning>日を選択してください</template>
        </select-o>
      </div>
    </div>
</template>

<script>
  import SelectO from './SelectO'

  export default {
    name: 'DateInput',
    components: {
      'select-o': SelectO
    },
    props: {
      minDate: {
        type: Date,
        required: true
      },
      inputDate: {
        type: Date,
        required: true
      },
      step: {
        type: Number,
        default: 1
      },
      readOnly: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        year: this.inputDate.getFullYear(),
        month: this.inputDate.getMonth() + 1,
        date: this.inputDate.getDate()
      }
    },
    watch: {
      inputDate: function (date) {
        this.year = date.getFullYear()
        this.month = date.getMonth() + 1
        this.date = date.getDate()
      },
      year: function () {
        this.$emit('update-year', this.year)
        this.$emit('date-error', this.isError())
      },
      month: function () {
        this.$emit('update-month', this.month)
        this.$emit('date-error', this.isError())
      },
      date: function () {
        this.$emit('update-date', this.date)
        this.$emit('date-error', this.isError())
      }
    },
    methods: {
      getDate: function () {
        return new Date(this.year, this.month - 1, this.date)
      },
      isError: function () {
        return this.isErrorYear || this.isErrorMonth || this.isErrorDate
      }
    },
    computed: {
      getYearList: function () {
        return [...Array(2).keys()].map(i => i + this.minDate.getFullYear())
      },
      getMonthList: function () {
        if (this.year === this.minDate.getFullYear()) {
          return [...Array(12 - this.minDate.getMonth()).keys()].map(i => i + this.minDate.getMonth() + 1)
        } else {
          return [...Array(12).keys()].map(i => ++i)
        }
      },
      getDateList: function () {
        let maxDate = 31
        switch (this.month) {
          case 2:
            maxDate = 28
            if (this.year % 4 === 0 && !(this.year % 100 === 0 && this.year % 400 !== 0)) {
              maxDate++
            }
            break
          case 4:
          case 6:
          case 9:
          case 11:
            maxDate = 30
        }
        let ar
        let min = 1
        if (this.year === this.minDate.getFullYear() && this.month === this.minDate.getMonth() + 1) {
          min = this.minDate.getDate()
        }
        ar = [...Array(maxDate - min + 1).keys()].map(i => i + min)
        if (this.step > 1) {
          const day = new Date(this.year, this.month - 1, min).getDay()
          if (day !== this.minDate.getDay() && min === 1) {
            min += this.minDate.getDay() - day
          }
          ar = ar.filter(date => (date - min) % this.step === 0)
        }
        return ar
      },
      isErrorYear: function () {
        return !this.getYearList.some(year => year === this.year)
      },
      isErrorMonth: function () {
        return !this.getMonthList.some(month => month === this.month)
      },
      isErrorDate: function () {
        return !this.getDateList.some(date => date === this.date)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .date-input{
    display: flex;
    flex-direction: column;

    &-inner{
      display: flex;
      margin: 0 auto;
      justify-content: space-around;
    }
  }
</style>
