<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="title">おそうじの追加</div>
      <div class="dialog-inner-elements">
        <label class="label">おそうじ名:
          <input id="text-osouji-name"
                 v-model="osoujiName"
                 @keydown.enter="osoujiName?add.call():''">
        </label>
      </div>
      <div class="btn-container">
        <com-button :is-disabled="addDisabled" :click-event="add">追加</com-button>
        <com-button :click-event="close">閉じる</com-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ComButton from '../components/ComButton'

  export default {
    name: 'AddOsouji',
    components: {
      'com-button': ComButton
    },
    data () {
      return {
        osoujiName: ''
      }
    },
    computed: {
      addDisabled: function () {
        return !this.osoujiName
      }
    },
    methods: {
      add () {
        this.$eventHub.$emit('add-osouji', {
          osoujiName: this.osoujiName
        })
        this.$router.back()
        // this.$router.push('/')
      },
      close () {
        this.$router.back()
      }
    },
    mounted () {
      document.getElementById('text-osouji-name').focus()
    }
  }
</script>
