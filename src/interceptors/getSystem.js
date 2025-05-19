import { GetSystemDateNew } from '@/service/api1'
import { useUserStore } from '@/store'

let timeID = null
const func = () => {
  clearInterval(timeID)
  return new Promise((resolve) => {
    GetSystemDateNew().then((res) => {
      const { code, item, msg } = res
      if (code === 200) {
        const str = item.systemCode
        if (!str) {
          uni.removeStorageSync('systemCode')
          clearInterval(timeID)
          return false
        }
        const code = str.slice(0, str.length - 3)
        const wait = str.slice(15)
        uni.setStorageSync('systemCode', code)
        timeID = setInterval(() => {
          func()
        }, wait * 1000)
        resolve()
      } else {
        uni.removeStorageSync('systemCode')
        clearInterval(timeID)
        useUserStore().clearUserInfo()
      }
    })
  })
}
export default func
