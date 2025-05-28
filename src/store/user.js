import { defineStore } from 'pinia'
import { TouristLogin } from '@/service/api2'
import { getLocalUUID } from '@/utils/index'

export const useUserStore = defineStore(
  'user',
  () => {
    const tsbUser = reactive({
      token: '', // token信息
      userInfo: {
        isLogin: false,
        uid: '',
        userType: -3, // -1企业 -2个人 -3游客
        userInfo: {
          linkman: '游客',
          userImage: 'https://imgs.toysbear.net/SalesImg/defaultAvatar.png',
        },
        companyMember: {},
        commparnyList: [],
      }, // 用户信息
    })
    const isLogined = computed(() => tsbUser.userInfo.isLogin && tsbUser.userInfo.isLogin !== -3)
    const token = computed(() => tsbUser.token)

    // 获取游客登录
    async function getTouristToken() {
      const userId = getLocalUUID()
      const res = await TouristLogin({
        UserAccountOrUserMobile: userId,
        platForm: 'wechatApplets',
      })
      console.log('🚀 ~ getTouristToken ~ res:', res)
      if (res.isLogin) {
        setToken(res.accessToken)
        // 组装游客信息
        const userInfo = {
          ...res,
          isLogin: false,
          uid: res.userInfo.id,
        }
        setUserInfo(userInfo)
      }
    }

    function setToken(value) {
      tsbUser.token = value
    }

    function setUserInfo(value) {
      const object = JSON.parse(JSON.stringify(value))
      delete object.accessToken
      tsbUser.userInfo = object
    }

    const clearUserInfo = (msg = '登录过期，请重新登录') => {
      this.$reset()
      uni.showToast({
        title: msg,
        duration: 1000,
        icon: 'none',
        success: () => {
          setTimeout(async () => {
            await this.getTouristToken()
            uni.switchTab({ url: `/pages/index/index` })
          }, 2000)
        },
      })
    }

    return {
      tsbUser,
      isLogined,
      token,
      setToken,
      setUserInfo,
      getTouristToken,
      clearUserInfo,
    }
  },
  {
    persist: true,
  },
)
