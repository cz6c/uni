<route lang="json5">
{
  layout: 'demo',
  style: {
    navigationBarTitleText: '请求',
  },
}
</route>

<template>
  <view class="p-6 text-center">
    <view class="my-2">使用的是 laf 云后台</view>
    <view class="text-green-400">我的推荐码，可以获得佣金</view>

    <!-- #ifdef H5 -->
    <view class="my-2">
      <a class="my-2" :href="recommendUrl" target="_blank">{{ recommendUrl }}</a>
    </view>
    <!-- #endif -->

    <!-- #ifndef H5 -->
    <view class="my-2 text-left text-sm">{{ recommendUrl }}</view>
    <!-- #endif -->

    <!-- http://localhost:9000/#/pages/index/request -->
    <wd-button @click="run" class="my-6">发送请求</wd-button>
    <view class="h-16">
      <view v-if="loading">loading...</view>
      <block v-else>
        <view class="text-xl">请求数据如下</view>
        <view class="text-green leading-8">{{ JSON.stringify(data) }}</view>
      </block>
    </view>
    <wd-button type="error" @click="reset" class="my-6" :disabled="!data">重置数据</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { ProductLabelRank } from '@/service/api1'

const recommendUrl = ref('http://laf.run/signup?code=ohaOgIX')

// 适合少部分全局性的接口————多个页面都需要的请求接口，额外编写一个 Service 层
const { loading, data, run } = useRequest(() => ProductLabelRank({}), {
  immediate: true,
  initialData: [],
  dataFn: (res) => res.items.map((c) => c.keyWord),
  successCall: (data) => {
    console.log('🚀 ~ const{loading,data,run}=useRequest ~ data:', data)
  },
})

const reset = () => {
  data.value = []
}
</script>
