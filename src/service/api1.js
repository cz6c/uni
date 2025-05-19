import { http } from '@/utils/http'
import { getEnvBaseUrl } from '@/utils'

// 请求基准地址
const baseUrl = getEnvBaseUrl()

/** POST 请求 */
export const GetSystemDateNew = (data) => {
  return http.post(baseUrl + '/auth/TokenAuth/GetSystemDate', data)
}

/** POST 请求 */
export const ProductLabelRank = (data) => {
  return http.post(baseUrl + '/product/TsbProduct/ProductLabelRank', data)
}
