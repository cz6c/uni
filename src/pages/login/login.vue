<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '登录' },
  layout: false,
}
</route>
<template>
  <!-- page-meta 只能是页面内的第一个节点 -->
  <page-meta :page-style="`overflow:${state.showRegisterType ? 'hidden' : 'visible'};`"></page-meta>
  <view class="login_box">
    <view class="img_box">
      <image
        style=" width: 100%;height: 100%"
        src="https://imgs.toysbear.net/SalesImg/logo.png"
      ></image>
    </view>
    <button
      v-if="state.isCheckBox"
      class="btn_style success"
      open-type="getPhoneNumber"
      @getphonenumber="getUserPhone"
    >
      账号快捷登录
    </button>
    <button v-else class="btn_style success" @click="getUserPhone">账号快捷登录</button>
    <button @click="toAccountLogin" class="btn_style primary">使用其他手机号</button>
    <button class="btn_style" @click="state.showRegisterType = true">注册</button>
    <view class="myCheckBox">
      <checkbox
        style="transform: scale(0.7)"
        color="#148BEC"
        @tap="changeCheckBox"
        :checked="state.isCheckBox"
      />
      <view @click="changeCheckBox" class="myCheckBox-label">我已阅读并同意</view>
      <view @click="toWebView('https://www.toysbear.com/protocolApp.html')" class="iconBox">
        <u-icon name="arrow-left-double" color="#148BEC" size="14"></u-icon>
        用户服务协议
        <u-icon name="arrow-right-double" color="#148BEC" size="14"></u-icon>
      </view>
      <view @click="toWebView('https://www.toysbear.com/sharePrivacy.html')" class="iconBox">
        <u-icon name="arrow-left-double" color="#148BEC" size="14"></u-icon>
        隐私政策
        <u-icon name="arrow-right-double" color="#148BEC" size="14"></u-icon>
      </view>
    </view>
    <wd-popup
      v-model="state.showRegisterType"
      position="bottom"
      safe-area-inset-bottom
      customStyle="padding: 24px 16px;background-color:transparent;"
      @close="state.showRegisterType = false"
    >
      <view class="btn_box">
        <view class="itemBtnO" @click="toPerson">个人账户注册</view>
        <view class="itemBtnO enterpriseColor" @click="toregister">企业账户注册</view>
      </view>
      <view class="btn_box itemBtnO closeBtn" @click="state.showRegisterType = false">取消</view>
    </wd-popup>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { AuthenticateV2, UserAffiliateCompany } from '@/service/api2'
const userStore = useUserStore()
const state = reactive({
  isCheckBox: false,
  showRegisterType: false,
})
function toWebView(url) {
  uni.navigateTo({ url: `/pages/webView/webView?linkUrl=${url}` })
}
// 去账号登录
function toAccountLogin() {
  uni.navigateTo({ url: `/pages/accountLogin/accountLogin` })
}
// 企业注册
function toregister() {
  state.showRegisterType = false
  uni.navigateTo({ url: `/pages/registerPage/registerPage` })
}
// 个人注册
function toPerson() {
  state.showRegisterType = false
  uni.navigateTo({ url: `/pages/personRegister/personRegister` })
}
function changeCheckBox() {
  state.isCheckBox = !state.isCheckBox
}
// 获取用户手机号
async function getUserPhone(e) {
  if (!state.isCheckBox) {
    return false
  }
  const code = e.detail.code
  console.log('🚀 ~ getUserPhone ~ code:', code)
  const errMsg = e.detail.errMsg
  if (errMsg === 'getPhoneNumber:ok') {
    // 用户登录，获取openId
    uni.login({
      provider: 'weixin',
      success: async ({ code: wxCode }) => {
        theLogin(code, wxCode)
      },
    })
  }
}
// 登录
async function theLogin(code, wxCode) {
  const fd = {
    rememberClient: true,
    platForm: 'wechatApplets',
    loginType: 'SalesApplets',
    loginUserType: 'Sales',
    getPhoneCode: code,
    wxCode,
    wechatUserInfo: '',
  }
  const res = await AuthenticateV2(fd)
  if (res.isLogin && res.accessToken) {
    const userType = res.userType
    userStore.setToken(res.accessToken)
    userStore.setUserInfo(res)
    if (userType === -1) {
      const popupList = res.commparnyList.filter((c) => c.companyType === 'Sales')
      if (popupList.length !== 0) {
        // 账号有公司
        if (popupList.length === 1) {
          // 只有一个角色
          userCompany(res.uid, popupList[0].companyNumber)
          return false
        }
        // 多个角色
        uni.reLaunch({
          url: '/pages/bsLoginConfirm/bsLoginConfirm',
        })
      } else {
        // 账号无公司去注册
        setTimeout(() => {
          uni.navigateTo({ url: `/pages/registerPage/registerPage` })
        }, 2000)
      }
    }
  } else {
    // 账号无公司去注册
    setTimeout(() => {
      uni.navigateTo({ url: `/pages/registerPage/registerPage` })
    }, 2000)
  }
}
// 登录选择公司
async function userCompany(userId, companyNumber) {
  const fd = {
    userId,
    companyNumber,
  }
  const res = await UserAffiliateCompany(fd)
  if (res.isLogin && res.accessToken) {
    userStore.setToken(res.accessToken)
    userStore.setUserInfo(res)
    uni.switchTab({ url: `/pages/index/index` })
  }
}
</script>

<style lang="scss" scoped>
.login_box {
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  padding-top: 200rpx;
  background: #fff;

  .myCheckBox {
    position: absolute;
    bottom: 160rpx;
    left: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 12px;

    .iconBox {
      display: flex;
      align-items: center;
      margin-left: 10rpx;
      color: #148bec;
    }
  }

  .img_box {
    width: 200rpx;
    height: 200rpx;
    margin: 0 auto;
    margin-bottom: 80rpx;
    overflow: hidden;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
  }

  .btn_style {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 600rpx;
    height: 90rpx;
    margin: 0 auto;
    margin-top: 20rpx;
    font-size: 32rpx;
    line-height: 90rpx;
    color: #666;
    text-align: center;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 44rpx;

    &::after {
      border: none;
    }

    &.primary {
      color: #fff;
      background: #148bec;
      border-color: #148bec;

      &::after {
        border: none;
      }
    }

    &.success {
      color: #fff;
      background: #37b24d;
      border-color: #37b24d;

      &::after {
        border: none;
      }
    }
  }

  .btn_box {
    background-color: #fff;
    border-radius: 15rpx;
  }

  .itemBtnO {
    padding: 28rpx 0;
    font-size: 32rpx;
    text-align: center;

    &.enterpriseColor {
      color: #148bec;
      border-top: 1rpx solid #dedede;
    }
  }

  .closeBtn {
    margin-top: 20rpx;
  }
}
</style>
