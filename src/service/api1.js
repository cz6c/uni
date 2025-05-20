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

export const GetAdvertisementList = (data) => {
  return http.post(baseUrl + '/synthesis/TsbAdManage/GetAdvertisementList', data)
}

export const NewProductList = (data) => {
  return http.post(baseUrl + '/product/TsbProductNew/NewProductList', data)
}

export const SaleHotProductList = (data) => {
  return http.post(baseUrl + '/product/TsbProductNew/SaleHotProductList', data)
}

export const PrefreProductList = (data) => {
  return http.post(baseUrl + '/product/TsbProductNew/PrefreProductList', data)
}

export const GetProductionAreaList = (data) => {
  return http.post(baseUrl + '/user/ProductionArea/GetProductionAreaList', data)
}
