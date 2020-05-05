<template>
<li class="osouji-item">
  {{osouji.name}}
</li>
</template>

<script>
export default {
  props: {
    osouji: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
