<route lang="json5" type="page"></route>
<template>
  <view>
    <web-view :src="linkUrl"></web-view>
  </view>
</template>

<script lang="ts" setup>
const linkUrl = ref('')
onLoad((query) => {
  linkUrl.value = query.linkUrl
})
</script>

<style lang="scss"></style>
