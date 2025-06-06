/* eslint-disable no-param-reassign */
import qs from 'qs'
import { getEnvBaseUrl } from '@/utils'
import { GetTM } from './crypto'

export type CustomRequestOptions = UniApp.RequestOptions & {
  query?: Record<string, any>
  /** 出错时是否隐藏错误提示 */
  hideErrorToast?: boolean
  /** token */
  Utoken?: string
} & IUniUploadFileOptions // 添加uni.uploadFile参数类型

// 请求基准地址
const baseUrl = getEnvBaseUrl()

const systemInfo = uni.getSystemInfoSync()

// 拦截器配置
const httpInterceptor = {
  // 拦截前触发
  invoke(options: CustomRequestOptions) {
    // 接口请求支持通过 query 参数配置 queryString
    if (options.query) {
      const queryStr = qs.stringify(options.query)
      if (options.url.includes('?')) {
        options.url += `&${queryStr}`
      } else {
        options.url += `?${queryStr}`
      }
    }
    // 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      // #ifdef H5
      // console.log(__VITE_APP_PROXY__)
      if (JSON.parse(__VITE_APP_PROXY__)) {
        // 自动拼接代理前缀
        options.url = import.meta.env.VITE_APP_PROXY_PREFIX + options.url
      } else {
        options.url = baseUrl + options.url
      }
      // #endif
      // 非H5正常拼接
      // #ifndef H5
      options.url = baseUrl + options.url
      // #endif
      // TIPS: 如果需要对接多个后端服务，也可以在这里处理，拼接成所需要的地址
    }
    // 1. 请求超时
    options.timeout = 10000 // 10s
    // 2. （可选）添加小程序端请求头标识
    options.header = {
      IsHome: 1,
      PlatForm: 'wechatApplets',
      VersionNo: systemInfo.system,
      browserVersion: systemInfo.model,
      system: systemInfo.osName,
      systemVersion: systemInfo.osVersion,
      ...options.header,
    }
    // 3. 添加 token 请求头标识    加入鉴权串
    const token = options.Utoken
    if (token) {
      const tm = GetTM()
      options.header.Utoken = token + (tm ? '.' + tm : '')
    }
  },
}

export const requestInterceptor = {
  install() {
    // 拦截 request 请求
    uni.addInterceptor('request', httpInterceptor)
    // 拦截 uploadFile 文件上传
    uni.addInterceptor('uploadFile', httpInterceptor)
  },
}
