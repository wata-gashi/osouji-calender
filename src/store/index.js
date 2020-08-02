import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let nextOsoujiId = 1

export default new Vuex.Store({
  state: {
    osoujiList: [],
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
    days: ['日', '月', '火', '水', '木', '金', '土']
  },
  mutations: {
    resetList (state) {
      state.osoujiList = []
      this.commit('saveOsoujiList')
    },
    initOsoujiList (state, data) {
      this.dispatch('setOsoujiList', data).then(() => {
        state.osoujiList.forEach(osouji => {
          osouji.id = nextOsoujiId++
        })
        this.commit('saveOsoujiList')
      })
    },
    saveOsoujiList (state) {
      localStorage.setItem('osoujiList', JSON.stringify(state.osoujiList))
    },
    _setOsoujiList (state, data) {
      state.osoujiList = data
    },
    _pushOsoujiList (state, data) {
      state.osoujiList.push(data)
    },
    addOsouji (state, data) {
      this.dispatch('pushOsoujiList', {
        id: nextOsoujiId++,
        name: data.name,
        enableCycle: data.enableCycle,
        cycle: data.cycle
      }).then(() => this.commit('saveOsoujiList'))
    },
    removeOsouji (state, id) {
      this.dispatch('setOsoujiList', state.osoujiList.filter(osouji => {
        return osouji.id !== id
      })).then(() => this.commit('saveOsoujiList'))
    },
    updateOsouji (state, data) {
      const index = state.osoujiList.findIndex(o => o.id === data.id)
      if (index >= 0) {
        state.osoujiList.splice(index, 1, data.osouji)
        this.commit('saveOsoujiList')
      }
    }
  },
  actions: {
    setOsoujiList ({commit}, data) {
      commit('_setOsoujiList', data)
    },
    pushOsoujiList ({commit}, data) {
      commit('_pushOsoujiList', data)
    }
  },
  modules: {
  }
})
