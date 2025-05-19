<template>
  <view class="p-6 text-center">
    <wd-button @click="run">发送请求</wd-button>
    <view class="my-6">
      <view v-if="loading">loading...</view>
      <block v-else>
        <view class="text-xl">请求数据如下</view>
        <view class="text-green leading-8">{{ JSON.stringify(data) }}</view>
      </block>
    </view>
    <wd-button type="error" @click="reset" :disabled="!data">重置数据</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { ProductLabelRank } from '@/service/api1'

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
