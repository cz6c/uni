<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '我的' },
}
</route>
<template>
  <view class="page_me">
    <view>
      <view class="headbg">
        <view class="img_box">
          <BaseImage :src="userInfo.userImage" />
        </view>
        <view class="right">
          <view v-if="userType != -3">
            <p class="right-item userName">{{ userInfo.linkman }}</p>
            <p class="right-item" v-if="userType == -1">
              <text class="cType">公司</text>
              <text class="cName">{{ companyInfo.companyName }}</text>
              <!-- 8.普通用户 1.体验用户 2.VIP用户 3.SVIP用户 4.尊享VIP用户 -->
              <image class="vipType" :src="vipLogo"></image>
            </p>
          </view>
          <view class="loninBtn" v-if="userType == -3" @click="tologin">
            <span class="btn">登录/注册</span>
            <u-icon name="arrow-right" color="#fff"></u-icon>
          </view>
        </view>
      </view>
      <wd-cell-group border customClass="mt-2.5">
        <wd-cell title="个人信息" is-link to="/pagesMe/personalData/personalData" />
        <wd-cell
          v-if="userType == -1"
          title="修改公司资料"
          is-link
          to="/pagesMe/companyData/companyData"
        />
      </wd-cell-group>

      <wd-cell-group border customClass="mt-2.5">
        <wd-cell title="关于我们" is-link to="/pagesMe/aboutUs/aboutUs" />
        <wd-cell title="联系我们" value="0754-89671122" is-link to="/pagesMe/aboutUs/aboutUs" />
        <wd-cell title="代码示例（分包）" is-link to="/pages-sub/demo/index" />
      </wd-cell-group>

      <wd-cell-group border customClass="mt-2.5">
        <wd-cell
          v-if="userType == -1"
          title="切换角色"
          is-link
          to="/pagesMe/bsLoginConfirm/bsLoginConfirm"
        />
        <wd-cell v-if="userType !== -3" title="退出登录" is-link @click="logout" />
      </wd-cell-group>
    </view>
    <view class="ml-4">wx的openid:</view>
    <view class="ml-4">{{ openId }}</view>
  </view>
</template>

<script lang="ts" setup>
import BaseImage from '@/components/BaseImage/index.vue'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const openId = ref('')
const userInfo = computed(() => userStore.tsbUser.userInfo.userInfo)
const userType = computed(() => userStore.tsbUser.userInfo.userType)
const companyInfo = computed(() => userStore.tsbUser.userInfo.commparnyList[0])
const companyMember = computed(() => userStore.tsbUser.userInfo.companyMember)
const vipLogo = computed(() => {
  let url = ''
  switch (companyMember.value.memberId) {
    case 8:
      url = 'https://imgs.toysbear.net/SalesImg/c_vip1.png'
      break
    case 1:
      url = 'https://imgs.toysbear.net/SalesImg/c_vip2.png'
      break
    case 2:
      url = 'https://imgs.toysbear.net/SalesImg/c_vip3.png'
      break
    case 3:
      url = 'https://imgs.toysbear.net/SalesImg/c_vip4.png'
      break
    case 4:
      url = 'https://imgs.toysbear.net/SalesImg/c_vip5.png'
      break
  }
  return url
})

function tologin() {
  uni.navigateTo({ url: '/pages/login/login' })
}
function logout() {
  uni.showModal({
    title: '确认退出当前账号？',
    success: (res) => {
      if (res.confirm) {
        userStore.clearUserInfo('退出成功')
      }
    },
  })
}
</script>

<style lang="scss" scoped>
.page_me {
  background-color: #f5f5f5;
  .headbg {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 210rpx;
    padding: 50rpx 36rpx;
    background: linear-gradient(90deg, #3486ff 4%, #54b2ff 99%);
    .img_box {
      width: 110rpx;
      height: 110rpx;
      overflow: hidden;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0rpx 3rpx 6rpx 0rpx rgba(0, 0, 0, 0.1);
    }

    .right {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding-left: 40rpx;
      font-size: 28rpx;
      color: #fff;
      .right-item + .right-item {
        margin-top: 18rpx;
      }
      .cType {
        width: 66rpx;
        height: 36rpx;
        padding: 2rpx 10rpx;
        margin-right: 8rpx;
        font-size: 22rpx;
        background: #16c1e5;
        border-radius: 15rpx;
      }
      .cName {
        display: inline-block;
        max-width: 350rpx;
        overflow: hidden; /* 超出部分隐藏 */
        text-overflow: ellipsis; /* 超出部分文字以...显示 */
        white-space: nowrap; /* 不换行 */
        vertical-align: top;
      }
      .vipType {
        width: 34rpx;
        height: 34rpx;
        margin-top: 4rpx;
        margin-left: 12rpx;
        vertical-align: top;
      }
      .userName {
        font-size: 40rpx;
      }
      .loninBtn {
        display: flex;
        align-items: center;
        font-size: 40rpx;
        color: #ffffff;
        .btn {
          margin-right: 24rpx;
        }
      }
    }
  }
}
</style>
