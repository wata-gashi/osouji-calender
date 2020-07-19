<template>
  <div>
    <ul class="osouji-list" v-if="Object.keys(getTodoList).length">
      <template v-for="(value, name) in getTodoList">
        <li v-text="name"></li>
        <osouji-list-item :key="osouji.id" :osouji="osouji" @osoujiClick="" v-for="osouji in value"></osouji-list-item>
      </template>
    </ul>
  </div>
</template>

<script>
  import OsoujiListItem from './OsoujiListItem'

  export default {
    name: 'OsoujiTodo',
    components: {
      'osouji-list-item': OsoujiListItem
    },
    computed: {
      osoujiList: function () {
        return this.$store.state.osoujiList
      },
      getTodoList: function () {
        const list = []
        if (this.osoujiList.length > 0) {
          list.push({
            osouji: this.osoujiList[0],
            nextDate: this.getNextDate(this.osoujiList[0])
          })
          for (let i = 1; i < this.osoujiList.length; i++) {
            const oso = {
              osouji: this.osoujiList[i],
              nextDate: this.getNextDate(this.osoujiList[i])
            }
            if (oso.nextDate === undefined) {
              list.splice(0, 0, oso)
              continue
            }
            for (let j = 0; j < i; j++) {
              if (oso.nextDate.valueOf() < list[j].nextDate.valueOf()) {
                list.splice(j, 0, oso)
                break
              } else if (j === i - 1) {
                list.splice(i, 0, oso)
              }
            }
          }
        }
        const todoList = {}
        list.forEach(data => {
          const date = this.afterWhen(data.nextDate)
          let li = todoList[date]
          if (li === undefined) li = []
          li.push(data.osouji)
          todoList[date] = li
        })
        return todoList
      }
    },
    methods: {
      getNextDate (osouji) {
        const today = this.getToday()
        if (!osouji.enableCycle || osouji.cycle.type === 'every') return today
        const nextDate = new Date(osouji.cycle.startDate)
        while (nextDate.valueOf() < today.valueOf()) {
          switch (osouji.cycle.type) {
            case 'daily':
              nextDate.setDate(nextDate.getDate() + osouji.cycle.numberInputData)
              break
            case 'weekly':
              nextDate.setDate(nextDate.getDate() + 7 * osouji.cycle.numberInputData)
              break
            case 'monthly':
              nextDate.setMonth(nextDate.getMonth() + osouji.cycle.numberInputData)
              break
            case 'dtd':
              nextDate.setDate(nextDate.getDate() + 7)
          }
        }
        return nextDate
      },
      getToday () {
        const today = new Date()
        return new Date(today.getFullYear(), today.getMonth(), today.getDate())
      },
      afterWhen (date) {
        const today = this.getToday()
        if (date.getTime() === today.getTime()) return '今日'
        else if (date > today) {
          let between = date.getTime() - today.getTime()
          between /= 1000
          between /= 86400
          if (between === 1) return '明日'
          else if (between === 2) return '明後日'
          else if (between <= 31) {
            if (between % 7 === 0) return (between / 7) + '週間後'
            return between + '日後'
          }
          return date.toLocaleDateString() + '(' + this.$store.state.days[date.getDay()] + ')'
        }
        return 'error'
      },
      clickOsouji (id) {

      }
    }
  }
</script>

<style scoped>

</style>
