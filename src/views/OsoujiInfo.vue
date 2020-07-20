<template>
  <div class="dialog">
    <div class="dialog-inner">
      <span class="title">おそうじ情報</span>
      <div class="dialog-inner-elements">
        <div v-if="isExist()">
          <table>
            <tr><th>名前</th><td v-text="name"></td></tr>
            <tr><th>周期設定</th><td v-text="dispEnableCycle"></td></tr>
            <template v-if="enableCycle">
              <tr><th>周期単位</th><td v-text="cycleType"></td></tr>
              <template v-if="notEvery">
                <tr><th>周期</th><td v-text="cycle"></td></tr>
              </template>
              <tr><th>開始日</th><td v-text="startDate"></td></tr>
            </template>
          </table>
        </div>
        <div v-else>
          <span class="warning">指定したIDのおそうじが見つかりませんでした。</span>
        </div>
      </div>
      <div class="btn-container">
        <com-button :click-event="goToEdit" v-if="isExist()">編集</com-button>
        <com-button :click-event="close">とじる</com-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ComButton from '../components/ComButton'

  export default {
    name: 'OsoujiInfo',
    components: {
      'com-button': ComButton
    },
    props: ['id'],
    data () {
      return {
        osouji: {}
      }
    },
    computed: {
      name () {
        if (this.isExist()) return this.osouji.name
        return ''
      },
      enableCycle () {
        if (this.isExist()) return this.osouji.enableCycle
        return false
      },
      dispEnableCycle () {
        if (this.isExist()) return this.osouji.enableCycle ? '指定する' : '指定しない'
        return ''
      },
      cycleType () {
        if (this.enableCycle) {
          for (let i = 0; i < this.$store.state.cycleList.length; i++) {
            let cycle = this.$store.state.cycleList[i]
            if (cycle.value === this.osouji.cycle.type) return cycle.name
          }
        }
        return ''
      },
      notEvery () {
        if (this.isExist()) return this.osouji.cycle.type !== 'every'
        return false
      },
      cycle () {
        if (this.isExist()) {
          switch (this.osouji.cycle.type) {
            case 'daily':
              return this.osouji.cycle.numberInputData + '日間隔'
            case 'weekly':
              return this.osouji.cycle.numberInputData + '週間隔'
            case 'monthly':
              return this.osouji.cycle.numberInputData + 'ヶ月間隔'
            case 'dtd':
              return this.$store.state.days[this.osouji.cycle.selectDay] + '曜日'
          }
        }
        return ''
      },
      startDate () {
        if (this.osouji) {
          let date = new Date(this.osouji.cycle.startDate)
          return date.toLocaleDateString() +
            '(' + this.$store.state.days[date.getDay()] + ')'
        }
        return ''
      }
    },
    methods: {
      isExist () {
        return Object.keys(this.osouji).length > 0
      },
      close () {
        this.$router.push({name: 'home'})
      },
      goToEdit () {
        this.$router.push({name: 'osouji', params: {id: this.id}})
      }
    },
    beforeMount () {
      this.$store.state.osoujiList.forEach(o => {
        if (o.id === this.id) this.osouji = o
      })
    }
  }
</script>

<style lang="scss" scoped>
  table{
    width: 100%;
  }
  th,td{
    padding: 5px;
  }
  th{
    text-align: right;
    width: 4.5rem;
  }
</style>
