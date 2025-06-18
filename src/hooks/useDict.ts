import { shallowReactive } from 'vue'
import { getDicts } from '@/api/login'

export interface DictOption {
  label: string
  value: string
}

export function useDictData<T extends string>(dictKeys: readonly T[]) {
  // 👇 使用 shallowReactive 保证外层响应式，内层结构类型不变
  const dictData: Record<T, DictOption[]> = shallowReactive({} as Record<T, DictOption[]>)
  const isLoaded = ref(false)
  const fetchDicts = async () => {
    for (const key of dictKeys) {
      try {
        const res = await getDicts(key)
        dictData[key] = res.data.map((item: any) => ({
          label: item.dictLabel,
          value: item.dictValue,
        }))
      } catch (error) {
        console.error(`加载字典 ${key} 失败`, error)
        dictData[key] = []
      }
    }
    isLoaded.value = true
  }

  fetchDicts()

  return {
    dictData,
    isLoaded,
  }
}
