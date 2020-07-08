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
