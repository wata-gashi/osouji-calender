<template>
<div id="osouji-list-root">
  <div id="osouji-list-title" v-text="listName"></div>
  <div class="btn-container">
    <div class="checkbox-area">
      <label class="checkbox-area-label">
        <input type="checkbox" class="checkbox-area-label-main" v-model="showRemove"/>
        <span class="checkbox-area-label-box"></span>
      </label>
    </div>
  </div>
  <ul class="osouji-list" v-if="osoujiList.length">
    <osouji-list-item
      v-for="osouji in osoujiList"
      :key="osouji.id"
      :osouji="osouji"
      :remove-visible="showRemove"
      @remove="RemoveOsouji"
    />
  </ul>
  <p v-else>
    おそうじが登録されていません。
  </p>
  <div class="btn-container">
    <com-button :click-event="Open">追加</com-button>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import OsoujiListItem from './OsoujiListItem'
import ComButton from './ComButton'

Vue.use(VueRouter)

let nextOsoujiId = 1

export default {
  name: 'OsoujiList',
  components: {
    'osouji-list-item': OsoujiListItem,
    'com-button': ComButton
  },
  data () {
    return {
      listName: 'おそうじリスト',
      showRemove: false,
      osoujiList: []
    }
  },
  methods: {
    AddOsouji (data) {
      this.osoujiList.push({
        id: nextOsoujiId++,
        name: data.osoujiName
      })
      this.saveOsoujiList()
    },
    Open () {
      this.$router.push('add')
    },
    RemoveOsouji (id) {
      this.osoujiList = this.osoujiList.filter(osouji => {
        return osouji.id !== id
      })
      this.saveOsoujiList()
    },
    saveOsoujiList () {
      localStorage.setItem('osoujiList', JSON.stringify(this.osoujiList))
    }
  },
  created: function () {
    const cacheOsoujiList = localStorage.getItem('osoujiList')
    if (cacheOsoujiList && cacheOsoujiList.length > 0) {
      this.osoujiList = JSON.parse(cacheOsoujiList)
      this.osoujiList.forEach(osouji => {
        osouji.id = nextOsoujiId++
      })
      this.saveOsoujiList()
    }
  },
  mounted: function () {
    this.$eventHub.$on('add-osouji', this.AddOsouji)
  }
}
</script>

<style lang="scss" scoped>
  #osouji-list-root{
    width: 80%;
    margin: 40px auto auto;
    max-width: 400px;
  }

  #osouji-list-title{
    padding: 7px 0;
    font-size: x-large;
    font-weight: bold;
    color: #1f6f00;
  }
</style>
