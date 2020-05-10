<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="title">詳細情報</div>
      <div class="dialog-inner-elements">
        <div v-if="osouji">
          <label>
            名前:<input v-model="inputName" disabled>
          </label>
        </div>
        <div v-else>
          <strong style="color: red">指定IDが見つかりません。</strong>
        </div>
      </div>
      <div class="btn-container">
        <com-button :click-event="close">閉じる</com-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ComButton from '../components/ComButton'

  export default {
    name: 'OsoujiInfo',
    props: {
      osoujiList: Array
    },
    components: {
      'com-button': ComButton
    },
    data () {
      return {
        osouji: undefined,
        inputName: ''
      }
    },
    methods: {
      close () {
        this.$router.back()
      }
    },
    created () {
      for (let i = 0; i < this.osoujiList.length; i++) {
        let osouji = this.osoujiList[i]
        if (osouji.id === this.$route.params.id) {
          this.osouji = osouji
          break
        }
      }
      if (this.osouji) {
        this.inputName = this.osouji.name
      }
    }
  }
</script>
