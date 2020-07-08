<template>
  <div>
    <ul class="osouji-list" v-if="getTodoList.length">
      <template v-for="obj in getTodoList">
        <li v-text="obj.nextDate.toLocaleDateString()"></li>
        <osouji-list-item :key="obj.osouji.id" :osouji="obj.osouji"/>
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
        return list
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
      }
    }
  }
</script>

<style scoped>

</style>
