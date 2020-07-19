<template>
  <transition name="fade">
    <li class="osouji-item" @click="$emit('osoujiClick', osouji.id)">
      {{osouji.name}}
      <div class="remove" :target="removeVisible.toString()" @click.stop="remove">
        削除
      </div>
    </li>
  </transition>
</template>

<script>
export default {
  props: {
    osouji: {
      type: Object,
      required: true
    },
    removeVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    remove () {
      this.$store.commit('removeOsouji', this.osouji.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .osouji-item{
    position: relative;
    padding: 7px 5px 7px 10px;
    color: #5da05d;
    margin-bottom: 5px;
    background: #cff6cf;
    border-left: solid 5px #377937;
    box-shadow: 1px 1px 2px rgba(#000, 0.1);
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    .remove{
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      padding: 0 15px;
      background-color: #ff6969;
      font-weight: normal;
      font-size: 1.2em;
      color: rgba(white, 0.9);
      align-items: center;
      justify-content: center;
      transition: transform .3s, opacity .3s, background-color .2s;
      opacity: 1;

      &[target="false"]{
        transform: translateX(100%);
        opacity: 0;
      }

      &[target="true"]{
        cursor: pointer;

        &:hover{
          background-color: #d01818;
        }
      }
    }
  }
</style>
