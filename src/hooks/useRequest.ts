import { UnwrapRef } from 'vue'

type IUseRequestOptions<T> = {
  /** 是否立即执行 */
  immediate?: boolean
  /** 初始化数据 */
  initialData?: T
  /** 接口数据处理函数 */
  dataFn?: (res: T) => T
  /** 获取数据成功后的回调函数 */
  successCall?: (data: UnwrapRef<T>) => void
  /** 获取数据失败后的回调函数 */
  errorCall?: (err: any) => void
}

/**
 * useRequest是一个定制化的请求钩子，用于处理异步请求和响应。
 * @param func 一个执行异步请求的函数，返回一个包含响应数据的Promise。
 * @param options 包含请求选项的对象。
 * @param options.immediate 是否立即执行请求，默认为true。
 * @param options.initialData 初始化数据，默认为undefined。
 * @param options.dataFn 接口数据处理函数，默认为undefined。
 * @param options.successCall 获取数据成功后的回调函数，默认为undefined。
 * @param options.errorCall 获取数据失败后的回调函数，默认为undefined。
 * @returns 返回一个对象{loading, data, run}，包含请求的加载状态、响应数据和手动触发请求的函数。
 */
export default function useRequest<T>(
  func: () => Promise<IResData<T>>,
  options: IUseRequestOptions<T>,
) {
  const { immediate = true, initialData, dataFn, successCall, errorCall } = options
  const loading = ref(false)
  const data = ref<T>(initialData)
  const run = async () => {
    if (loading.value) return
    loading.value = true
    return func()
      .then((res) => {
        const { code, item } = res
        if (code === 200) {
          data.value = (dataFn ? dataFn(item) : item) as UnwrapRef<T>
          loading.value = false
          successCall && successCall(data.value)
          return data.value
        }
      })
      .catch((err) => {
        errorCall && errorCall(err)
      })
      .finally(() => {
        loading.value = false
      })
  }

  immediate && run()
  return { loading, data, run }
}
