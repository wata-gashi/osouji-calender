<template>
  <div id="footer-o">
    <input type="radio" class="tab-radio" id="1"
           value="/" v-model="inTab">
    <label class="tab-button" for="1">ホーム</label>

    <input type="radio" class="tab-radio" id="2"
           value="list" v-model="inTab">
    <label class="tab-button" for="2">おそうじリスト</label>

    <input type="radio" class="tab-radio" id="3"
           value="setting" v-model="inTab">
    <label class="tab-button" for="3">設定</label>
  </div>
</template>

<script>
  export default {
    name: 'FooterO',
    data () {
      return {
        version: '0.1.5',
        inTab: 'init'
      }
    },
    methods: {
      setVersion (data) {
        if (this.version !== data.version) {
          this.version = data.version
          this.$eventHub.$emit('show-notification')
        }
      },
      where (from) {
        let path = from.split('/')
        if (!path[1]) this.inTab = '/'
        else this.inTab = path[1]
      }
    },
    watch: {
      inTab (to, from) {
        if (from !== 'init' && to !== from) this.$router.push(to)
      }
    },
    created () {
      this.$eventHub.$on('set-version', this.setVersion)
      this.where(this.$route.path)
    }
  }
</script>
<style lang="scss" scoped>
  #footer-o{
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 4px 0;
    background-color: #1f6f00;
    color: white;
    text-align: center;
    justify-content: space-between;
  }

  .tab-radio{
    display: none;

    & + .tab-button{
      position: relative;
      margin: auto;
      padding: 10px 20px;
      font-weight: bold;
      opacity: 0.7;
      transition: .3s;

      &:after{
        position: absolute;
        content: '';
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-bottom: 3px solid white;
        transform: scaleX(0);
        transition: .3s;
      }
    }

    &:checked{
      & + .tab-button{
        opacity: 1;
        &:after{
          transform: scaleX(1);
        }
      }
    }

    &:not(:checked) + .tab-button:hover{
      opacity: 1;

      &:after{
        transform: scaleX(1);
      }
    }
  }
</style>
