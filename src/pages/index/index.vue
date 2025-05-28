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
  <!-- :style="{ marginTop: safeAreaInsets?.top + height + 'px' }" -->
  <view class="bg-#f5f5f5 overflow-hidden">
    <wd-sticky>
      <view class="header-view w-screen">
        <div :style="{ height: top + 'px' }"></div>
        <view class="nav-box center" :style="{ height: height + 'px' }">
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
          <div class="search mr-1">
            <i class="custom-icon custom-icon-search"></i>
          </div>
        </view>
      </view>
    </wd-sticky>
    <view class="px-3 pb-3">
      <!-- banner -->
      <wd-swiper
        :list="swiperList"
        value-key="img"
        autoplay
        v-model:current="current"
        :height="127"
        @click="handleClick"
        @change="onChange"
      ></wd-swiper>
      <!-- 金刚区 -->
      <view class="classification mt-2.5 py-5 bg-#ffffff border-rd-4" v-if="jinGangArr.length > 0">
        <swiper
          class="h-17 box-border"
          :autoplay="false"
          :display-multiple-items="5"
          @change="changeSwiper"
        >
          <swiper-item v-for="(item, i) in jinGangArr" :key="i">
            <view class="center flex-col">
              <BaseImage :src="item.img" width="72rpx" height="72rpx" />
              <view class="className ellipsis">{{ item.coreName }}</view>
            </view>
          </swiper-item>
        </swiper>
        <view class="slide" v-if="jinGangArr.length > 5">
          <view class="slide-bar">
            <view class="slide-show" :style="{ marginLeft: `${slideLeft}rpx` }"></view>
          </view>
        </view>
      </view>
      <!-- 行业新品 -->
      <view class="new_product products_card mt-2.5 h-40">
        <view class="dt">
          <view>行业新品</view>
          <view class="new">海量最新产品</view>
        </view>
        <view class="list">
          <view v-for="(item, i) in newProductList" :key="i">
            <view class="center flex-col">
              <BaseImage :src="item.imageUrl" width="192rpx" height="162rpx" />
              <view class="mt-1 text-3.25 font-700 color-#f51e12">
                ￥{{ item.price && item.price.toFixed(2) }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 行业热销 -->
      <view class="flex mt-2.5 h-33">
        <view class="hot_product products_card">
          <view class="dt">行业热销</view>
          <view class="list" v-if="hotProductList.length">
            <view v-for="(item, i) in hotProductList" :key="i">
              <view class="center flex-col">
                <BaseImage :src="item.imageUrl" width="135rpx" height="114rpx" />
                <view class="mt-1 text-3.25 font-700 color-#f51e12">
                  ￥{{ item.price && item.price.toFixed(2) }}
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="ds_product products_card">
          <view style="width: 100%; height: 100%" v-if="firstProductList[0]">
            <view class="dt">{{ firstProductList[0].prefredName.substr(0, 4) }}</view>
            <view v-for="(item, i) in firstProductList" :key="i">
              <view class="center flex-col">
                <BaseImage :src="item.imageUrl" width="135rpx" height="114rpx" />
                <view class="mt-1 text-3.25 font-700 color-#f51e12">
                  ￥{{ item.price && item.price.toFixed(2) }}
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="cr_product products_card">
          <view style="width: 100%; height: 100%" v-if="secondProductList[0]">
            <view class="dt">{{ secondProductList[0].prefredName.substr(0, 4) }}</view>
            <view v-for="(item, i) in secondProductList" :key="i">
              <view class="center flex-col">
                <BaseImage :src="item.imageUrl" width="135rpx" height="114rpx" />
                <view class="mt-1 text-3.25 font-700 color-#f51e12">
                  ￥{{ item.price && item.price.toFixed(2) }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 展厅产地 -->
      <view class="hall_org mt-2.5 pb-2.5" v-if="hallList.length > 0">
        <view class="hall pt-2.5">
          <view class="dt">
            <view>澄海玩具展厅</view>
          </view>
          <view class="hall_swiper">
            <swiper class="swiper" :autoplay="true" :circular="true">
              <swiper-item v-for="(arr, i) in hallList" :key="i">
                <view class="halls">
                  <view class="item halls-item">
                    <template v-if="arr[0]">
                      <BaseImage
                        :src="arr[0] && arr[0].img"
                        width="214rpx"
                        height="202rpx"
                        radius="12rpx"
                      />
                      <view class="name ellipsis">
                        {{ arr[0] && (arr[0].adTitle || arr[0].companyName) }}
                      </view>
                    </template>
                  </view>
                  <view class="item halls-item">
                    <template v-if="arr[1]">
                      <BaseImage
                        :src="arr[1] && arr[1].img"
                        width="214rpx"
                        height="202rpx"
                        radius="12rpx"
                      />
                      <view class="name ellipsis">
                        {{ arr[1] && (arr[1].adTitle || arr[1].companyName) }}
                      </view>
                    </template>
                  </view>
                  <view class="items">
                    <view class="item halls-item">
                      <template v-if="arr[2]">
                        <BaseImage
                          :src="arr[2] && arr[2].img"
                          width="212rpx"
                          height="94rpx"
                          radius="12rpx"
                        />
                        <view class="name ellipsis">
                          {{ arr[2] && (arr[2].adTitle || arr[2].companyName) }}
                        </view>
                      </template>
                    </view>
                    <view class="item halls-item">
                      <template v-if="arr[3]">
                        <BaseImage
                          :src="arr[3] && arr[3].img"
                          width="212rpx"
                          height="94rpx"
                          radius="12rpx"
                        />
                        <view class="name ellipsis">
                          {{ arr[3] && (arr[3].adTitle || arr[3].companyName) }}
                        </view>
                      </template>
                    </view>
                  </view>
                </view>
              </swiper-item>
            </swiper>
          </view>
        </view>
        <view class="org pt-2.5">
          <view class="dt">
            <view>全国产地</view>
          </view>
          <view class="org_swiper">
            <swiper class="swiper" :autoplay="true" :circular="true" :display-multiple-items="3">
              <swiper-item v-for="(item, i) in orgList" :key="i">
                <view class="item org-item">
                  <BaseImage
                    :src="item.areaImage"
                    width="100%"
                    height="106rpx"
                    radius="12rpx"
                    fit="aspectFill"
                  />
                  <view class="name ellipsis">{{ item.title }}</view>
                </view>
              </swiper-item>
            </swiper>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { TestEnum } from '@/typings'
import {
  GetAdvertisementList,
  NewProductList,
  SaleHotProductList,
  PrefreProductList,
  GetProductionAreaList,
} from '@/service/api1'
import { GetCoreAreaList } from '@/service/api2'
import BaseImage from '@/components/BaseImage/index.vue'
import { generateCombinations } from '@/utils/arr'

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
const { data: swiperList } = useRequest(
  () =>
    GetAdvertisementList({
      adPosition: 76,
      adType: 0,
      platform: 'WeChat',
      roleName: 'Sales',
    }),
  {
    immediate: true,
    initialData: [],
    dataFn: (res) => res.advertisementList,
    successCall: (data) => {
      console.log('🚀 ~ const{loading,data,run}=useRequest ~ data:', data)
    },
  },
)
function handleClick(e) {
  console.log(e)
}
function onChange(e) {
  console.log(e)
}

const slideLeft = ref(0)
const { data: jinGangArr } = useRequest(
  () =>
    GetCoreAreaList({
      coreAreaType: 9,
      adapt: 'app',
    }),
  {
    immediate: true,
    initialData: [],
  },
)
function changeSwiper(e) {
  console.log('🚀 ~ changeSwiper ~ e:', e)
  // 当前的激活索引
  const length = jinGangArr.value.length
  const redundant = length - 5 // 多余的滑块
  const slideRatio = 22 / redundant
  slideLeft.value = slideRatio * e.detail.current
}

const { data: newProductList } = useRequest(
  () =>
    NewProductList({
      maxCount: 3,
    }),
  {
    immediate: true,
    initialData: [],
  },
)
const { data: hotProductList } = useRequest(
  () =>
    SaleHotProductList({
      maxCount: 2,
    }),
  {
    immediate: true,
    initialData: [],
  },
)
const { data: firstProductList } = useRequest(
  () =>
    PrefreProductList({
      type: 0,
    }),
  {
    immediate: true,
    initialData: [],
  },
)
const { data: secondProductList } = useRequest(
  () =>
    PrefreProductList({
      type: 1,
    }),
  {
    immediate: true,
    initialData: [],
  },
)

const hallList = computed(() => generateCombinations(bHallList.value, 2, mHallList.value, 2))
const { data: bHallList } = useRequest(
  () =>
    GetAdvertisementList({
      adPosition: 99,
      adType: 0,
      platform: 'WeChat',
      roleName: 'Sales',
    }),
  {
    immediate: true,
    initialData: [],
    dataFn: (res) => res.advertisementList,
  },
)
const { data: mHallList } = useRequest(
  () =>
    GetAdvertisementList({
      adPosition: 100,
      adType: 0,
      platform: 'WeChat',
      roleName: 'Sales',
    }),
  {
    immediate: true,
    initialData: [],
    dataFn: (res) => res.advertisementList,
  },
)

const { data: orgList } = useRequest(
  () =>
    GetProductionAreaList({
      areaType: 1,
    }),
  {
    immediate: true,
    initialData: [],
  },
)

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
  padding-bottom: 12 * 2rpx;
  background: linear-gradient(180deg, #daeafd, #f6f6f6);

  .nav-box {
    .tab {
      font-size: 16px;
      font-weight: 700;
      color: #333333;

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
    margin: 12 * 2rpx 12 * 2rpx 0;
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
      display: flex;
      align-items: center;
      justify-content: center;
      width: 82rpx;
      height: 62rpx;
      font-size: 28rpx;
      color: #ffffff;
      background: #148bec;
      border-radius: 32rpx;
    }
  }
}

.classification {
  .className {
    width: 100%;
    margin-top: 20rpx;
    font-size: 24rpx;
    color: #333;
    text-align: center;
  }
  .slide {
    height: 4rpx;
    margin-top: 10rpx;
    .slide-bar {
      width: 44rpx;
      height: 4rpx;
      margin: 0 auto;
      background: #dedede;
      border-radius: 2rpx;
      .slide-show {
        width: 22rpx;
        height: 4rpx;
        background: #999999;
        border-radius: 2rpx;
        transition: margin-left 0.1s ease;
      }
    }
  }
}

.products_card {
  box-sizing: border-box;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 15rpx;

  .dt {
    display: flex;
    align-items: center;
    width: 100%;
    padding-bottom: 20rpx;
    overflow: hidden;
    font-size: 30rpx;
    font-weight: 700;
    color: #333333;
    text-overflow: ellipsis;
    white-space: ellipsis;

    .new {
      box-sizing: border-box;
      width: 76 * 2rpx;
      height: 19 * 2rpx;
      padding: 4rpx 10rpx;
      margin-left: 20rpx;
      font-size: 22rpx;
      font-weight: 400;
      color: #ffffff;
      background: #f63a38;
      border-radius: 16rpx 8rpx 8rpx 4rpx;
    }
  }

  .list {
    display: flex;
    justify-content: space-between;
  }
}

.new_product {
  background: linear-gradient(180deg, #ffeded, #ffffff 16%);
}

.hot_product {
  width: 168 * 2rpx;
  height: 100%;
  margin-right: 20rpx;
}

.ds_product {
  width: 83 * 2rpx;
  height: 100%;
  margin-right: 20rpx;
}

.cr_product {
  width: 83 * 2rpx;
  height: 100%;
}

.hall_org {
  background: #ffffff;
  border-radius: 15rpx;

  .dt {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx;
    padding-top: 0;
    font-size: 32rpx;
    font-weight: 700;
    color: #333333;
  }

  .item {
    position: relative;

    .name {
      position: absolute;
      bottom: 0;
      left: 0;
      box-sizing: border-box;
      width: 100%;
      padding-bottom: 14rpx;
      padding-left: 14rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #ffffff;
      text-shadow: 0px 0px 20rpx 0px #000000;
    }
  }

  .hall_swiper {
    height: 202rpx;
    padding: 0 16rpx;

    .halls {
      display: flex;

      .halls-item {
        width: 214rpx;

        & + .halls-item {
          margin-left: 16rpx;
        }
      }

      .items {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 202rpx;
        margin-left: 16rpx;

        .halls-item {
          margin-left: 0rpx;
        }
      }
    }
  }

  .org_swiper {
    height: 106rpx;
    padding: 0 8rpx;

    .swiper {
      height: 100%;

      .org-item {
        box-sizing: border-box;
        padding: 0 8rpx;
      }
    }
  }
}
</style>
