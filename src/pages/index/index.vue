<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view class="header-view">
    <div :style="{ height: top + 'px' }"></div>
    <view class="nav-box" :style="{ height: height + 'px' }">
      <div
        v-for="({ label, value }, i) in tabs"
        :key="i"
        :class="`tab ${value === tab ? 'on' : ''}`"
        @click="changeTab(value)"
      >
        {{ label }}
      </div>
    </view>
    <view class="search-box">
      <div class="keyword">圣诞积木</div>
      <div class="camera"></div>
      <div class="search"></div>
    </view>
  </view>
  <wd-swiper
    :list="swiperList"
    autoplay
    v-model:current="current"
    @click="handleClick"
    @change="onChange"
  ></wd-swiper>
  <!-- :style="{ marginTop: safeAreaInsets?.top + height + 'px' }" -->
  <view class="bg-white overflow-hidden pt-2 px-4">
    <view class="mt-12">
      <image src="/static/logo.svg" alt="" class="w-28 h-28 block mx-auto" />
    </view>
    <view class="text-center text-4xl main-title-color mt-4">unibest</view>
    <view class="text-center text-2xl mt-2 mb-8">最好用的 uniapp 开发模板</view>

    <view class="text-center mt-8">
      当前平台是：
      <text class="text-green-500">{{ PLATFORM.platform }}</text>
    </view>
    <view class="text-center mt-4">
      模板分支是：
      <text class="text-green-500">base</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { TestEnum } from '@/typings'
import PLATFORM from '@/utils/platform'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 获取胶囊按钮
const { height, top } = uni.getMenuButtonBoundingClientRect()
const tabs = [
  {
    label: '找产品',
    value: 1,
  },
  {
    label: '找厂商',
    value: 2,
  },
]
const tab = ref(1)
function changeTab(val) {
  tab.value = val
}

const current = ref<number>(0)

const swiperList = ref(['https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg'])
function handleClick(e) {
  console.log(e)
}
function onChange(e) {
  console.log(e)
}

// 测试 uni API 自动引入
onLoad(() => {
  console.log(TestEnum.A)
})
</script>

<style lang="scss">
.main-title-color {
  color: #d14328;
}

.header-view {
  background: linear-gradient(180deg, #daeafd, #f6f6f6);

  .nav-box {
    display: flex;
    align-items: center;
    justify-content: center;

    .tab {
      font-size: 16px;
      font-weight: 700;
      color: #333333;
      text-align: left;

      & ~ .tab {
        margin-left: 20px;
      }

      &.on {
        font-size: 21px;
        font-weight: 800;
        color: #222222;
      }
    }
  }

  .search-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 38 * 2rpx;
    margin: 12 * 2rpx;
    background: #ffffff;
    border: 1px solid #148bec;
    border-radius: 20 * 2rpx;

    .keyword {
      margin-left: 16px;
      font-size: 14px;
      font-weight: 400;
      color: #999999;
    }

    .search {
      width: 41px;
      height: 31px;
      margin-right: 8px;
      background: #148bec;
      border-radius: 16px;
    }
  }
}
</style>
