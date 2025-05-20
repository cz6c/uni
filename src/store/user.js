import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { TouristLogin } from '@/service/api2'
import { getLocalUUID } from '@/utils/index'

const initState = { nickname: '', avatar: '' }

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({ ...initState })

    const setUserInfo = (val) => {
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }
    const isLogined = computed(() => !!userInfo.value.token)

    const tsbUser = reactive({
      token: '', // token信息
      userInfo: {
        isLogin: false,
        uid: '',
        userType: -3, // -1企业 -2个人 -3游客
        userInfo: {
          linkman: '游客',
        },
      }, // 用户信息
    })

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
        setUserInfot(userInfo)
      }
    }

    function setToken(value) {
      tsbUser.token = value
    }

    function setUserInfot(value) {
      const object = JSON.parse(JSON.stringify(value))
      delete object.accessToken
      tsbUser.userInfo = object
    }

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      isLogined,
      tsbUser,
      getTouristToken,
    }
  },
  {
    persist: true,
  },
)
