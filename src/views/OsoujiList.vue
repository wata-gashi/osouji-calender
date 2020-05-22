<template>
  <div id="osouji-list-root">
    <div id="title" v-text="listName"></div>
    <div class="btn-container">
      <check-box v-model="showRemove">
        編集:
      </check-box>
<!--      <div class="checkbox-area">
        <div class="checkbox-area-text">編集:</div>
        <label class="checkbox-area-label">
          <input type="checkbox" class="checkbox-area-label-main" v-model="showRemove"/>
          <span class="checkbox-area-label-box"></span>
        </label>
      </div>-->
    </div>
    <ul class="osouji-list" v-if="osoujiList.length">
      <osouji-list-item
        v-for="osouji in osoujiList"
        :key="osouji.id"
        :osouji="osouji"
        :remove-visible="showRemove"
        @remove="removeOsouji"
      />
    </ul>
    <p v-else>
      おそうじが登録されていません。
    </p>
    <div class="btn-container">
      <com-button :click-event="open">追加</com-button>
    </div>
    <router-view name="add-dialog"></router-view>
    <router-view name="osouji-dialog" :osouji-list="osoujiList"></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import OsoujiListItem from '../components/OsoujiListItem'
import ComButton from '../components/ComButton'
import CheckBox from '../components/CheckBox'

Vue.use(VueRouter)

let nextOsoujiId = 1

export default {
  name: 'OsoujiList',
  components: {
    'osouji-list-item': OsoujiListItem,
    'com-button': ComButton,
    'check-box': CheckBox
  },
  data () {
    return {
      listName: 'おそうじリスト',
      showRemove: false,
      osoujiList: []
    }
  },
  methods: {
    addOsouji (data) {
      this.pushOsoujiList({
        id: nextOsoujiId++,
        name: data.osoujiName
      }).then(() => this.saveOsoujiList())
    },
    open () {
      this.$router.push('/list/add')
    },
    removeOsouji (id) {
      this.setOsoujiList(this.osoujiList.filter(osouji => {
        return osouji.id !== id
      })).then(() => this.saveOsoujiList())
    },
    saveOsoujiList () {
      localStorage.setItem('osoujiList', JSON.stringify(this.osoujiList))
    },
    async setOsoujiList (data) {
      this.osoujiList = data
    },
    async pushOsoujiList (data) {
      this.osoujiList.push(data)
    }
  },
  created: function () {
    const cacheOsoujiList = localStorage.getItem('osoujiList')
    if (cacheOsoujiList && cacheOsoujiList.length > 0) {
      this.setOsoujiList(JSON.parse(cacheOsoujiList)).then(() => {
        this.osoujiList.forEach(osouji => {
          osouji.id = nextOsoujiId++
        })
        this.saveOsoujiList()
      })
    }
    this.$eventHub.$on('add-osouji', this.addOsouji)
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";

  #osouji-list-root{
    @extend %root-body;
  }
</style>
