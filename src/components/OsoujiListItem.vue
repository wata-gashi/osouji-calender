<template>
  <transition name="fade">
    <li class="osouji-item" @click="bodyClick">
      {{osouji.name}}
      <div class="remove" :target="removeVisible.toString()"
           @click.stop="$emit('remove', osouji.id)">
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
    bodyClick () {
      this.$router.push({
        name: 'osouji',
        params: {
          id: this.osouji.id
        }})
    }
  }
}
</script>
