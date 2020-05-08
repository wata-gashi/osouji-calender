<template>
<div id="osouji-list">
  <h3 v-text="listName"></h3>
  <div class="btn-container">
    <label class="edit-button">
      <input type="checkbox" v-model="showRemove"/>
      編集
    </label>
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
      osoujiList: [
        {
          id: nextOsoujiId++,
          name: 'hoge'
        },
        {
          id: nextOsoujiId++,
          name: 'test'
        }
      ]
    }
  },
  methods: {
    AddOsouji (data) {
      this.osoujiList.push({
        id: nextOsoujiId++,
        name: data.osoujiName
      })
    },
    Open () {
      this.$router.push('add')
    },
    RemoveOsouji (id) {
      this.osoujiList = this.osoujiList.filter(osouji => {
        return osouji.id !== id
      })
    }
  },
  mounted: function () {
    this.$eventHub.$on('add-osouji', this.AddOsouji)
  }
}
</script>

<style lang="scss" scoped>
  #osouji-list{
    width: 80%;
    margin: 0 auto;
    max-width: 400px;
  }
</style>
