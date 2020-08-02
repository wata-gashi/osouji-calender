<template>
  <div id="footer-o">
    <input type="radio" class="tab-radio" id="1"
           value="todo" v-model="inTab">
    <label class="tab-button" for="1">予定表</label>

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
        inTab: 'init'
      }
    },
    watch: {
      inTab (to, from) {
        if (from !== 'init' && to !== from && to !== this.$route.matched[0].name) this.$router.push({name: to})
      },
      $route (to, _) {
        this.inTab = to.matched[0].name
      }
    },
    created () {
      this.inTab = this.$route.matched[0].name
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
      color: white;

      &:after{
        position: absolute;
        content: '';
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-bottom: 3px solid white;
        border-radius: 2px;
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
