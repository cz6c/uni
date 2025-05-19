<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '分包页面 标题' },
}
</route>

<template>
  <view class="text-center">
    <!-- #ifdef H5 -->
    <view class="m-8">http://localhost:9000/#/pages-sub/demo/index</view>
    <!-- #endif -->

    <!-- #ifndef H5 -->
    <view class="my-2 text-left text-sm">/pages-sub/demo/index</view>
    <!-- #endif -->
    <view class="text-green-500">分包页面demo</view>
  </view>
</template>

<script lang="ts" setup>
// code here
</script>

<style lang="scss" scoped>
//
</style>
