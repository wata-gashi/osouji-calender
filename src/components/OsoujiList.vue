<template>
<div id="osouji-list">
  <h3 v-text="listName"></h3>
  <ul class="osouji-list" v-if="osoujiList.length">
    <osouji-list-item
      v-for="osouji in osoujiList"
      :key="osouji.id"
      :osouji="osouji"
    />
  </ul>
  <p v-else>
    おそうじが登録されていません。
  </p>
  <div class="btn-container">
    <router-link :to="{ name: 'add' }" class="btn">追加</router-link>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import OsoujiListItem from './OsoujiListItem'

Vue.use(VueRouter)

let nextOsoujiId = 1

export default {
  name: 'OsoujiList',
  components: {
    'osouji-list-item': OsoujiListItem
  },
  data () {
    return {
      listName: 'おそうじリスト',
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
    AddOsouji () {
      this.osoujiList.push({
        id: nextOsoujiId++,
        name: 'addOsouji'
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
