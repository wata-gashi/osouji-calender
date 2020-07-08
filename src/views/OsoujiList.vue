<template>
  <div id="osouji-list-root">
    <div id="title" v-text="listName"></div>
    <div class="btn-container">
      <check-box v-model="showRemove">
        削除:
      </check-box>
    </div>
    <ul class="osouji-list" v-if="osoujiList.length">
      <osouji-list-item v-for="osouji in osoujiList"
        :key="osouji.id" :osouji="osouji"
        :remove-visible="showRemove"
        @osoujiClick="$router.push({name: 'osouji', params: {id: $event}})"
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
    <router-view name="oi"></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import OsoujiListItem from '../components/OsoujiListItem'
import ComButton from '../components/ComButton'
import CheckBox from '../components/CheckBox'

Vue.use(VueRouter)

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
      showRemove: false
    }
  },
  computed: {
    osoujiList: function () {
      return this.$store.state.osoujiList
    }
  },
  methods: {
    open () {
      this.$router.push({name: 'add'})
    },
    removeOsouji (id) {
      this.$store.commit('removeOsouji', id)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";

  #osouji-list-root{
    @extend %root-body;
  }
</style>
