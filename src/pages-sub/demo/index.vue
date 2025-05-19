<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '代码示例（分包）' },
}
</route>

<template>
  <view class="text-center">
    <view class="text-green-500">
      分包页面
      <!-- #ifdef H5 -->
      <text class="m-8">http://localhost:9000/#/pages-sub/demo/index</text>
      <!-- #endif -->

      <!-- #ifndef H5 -->
      <text class="my-2 text-left text-sm">/pages-sub/demo/index</text>
      <!-- #endif -->
    </view>
    <wd-cell title="请求" is-link to="/pages-sub/demo/request/index" />
    <wd-cell title="toast" is-link @click="showToast" />
    <wd-cell title="confirm" is-link @click="confirm" />
  </view>
</template>

<script lang="ts" setup>
import { useToast, useMessage } from 'wot-design-uni'

const toast = useToast()

function showToast() {
  toast.show('提示信息')
}

const message = useMessage()

function confirm() {
  message
    .confirm({
      title: '标题',
      // msg: '提示文案',
    })
    .then(() => {
      console.log('点击了确定按钮')
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })
}
</script>

<style lang="scss" scoped>
//
</style>
