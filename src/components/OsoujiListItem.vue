<template>
  <transition name="fade">
    <li class="osouji-item">
      {{osouji.name}}
      <div class="remove" :target="removeVisible.toString()"
           @click="$emit('remove', osouji.id)">
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
  }
}
</script>

<style lang="scss" scoped>

</style>
