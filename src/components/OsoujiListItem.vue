<template>
  <transition name="fade">
    <li class="osouji-item" @click="bodyClick">
      {{osouji.name}}
      <div class="remove" :target="removeVisible.toString()"
           @click="removeClick($event)">
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
    },
    removeClick (event) {
      this.$emit('remove', this.osouji.id)
      event.stopPropagation()
    }
  }
}
</script>
