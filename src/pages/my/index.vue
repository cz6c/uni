<route lang="json5">
{
  style: {
    navigationBarTitleText: '我的',
  },
}
</route>

<template>
  <view class="bg-white overflow-hidden px-3">
    <wd-button @click="goSub">代码示例（分包）</wd-button>
  </view>
</template>

<script lang="ts" setup>
function goSub() {
  uni.navigateTo({ url: '/pages-sub/demo/index' })
}
</script>

<style lang="scss" scoped>
.test-css {
  // mt-4=>1rem=>16px;
  margin-top: 16px;
}
</style>
