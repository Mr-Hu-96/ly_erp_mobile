<template>
  <wd-datetime-picker v-model="internalValue" v-bind="restProps"></wd-datetime-picker>
</template>

<script lang="ts" setup>
// 定义 Props 和 Emits
interface Props {
  modelValue: any // 外部绑定的值，格式化日期字符串
  format?: string // 日期格式
  [key: string]: any // 支持传递额外属性给 wd-datetime-picker
}

// 默认 Props
const props: Props = defineProps({
  modelValue: {
    type: [String, Array],
    required: true,
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD', // 默认格式
  },
})

// 工具函数：格式化时间
const formatDateTime = (timestamp: number | number[], format: string): string | string[] => {
  if (typeof timestamp === 'object') {
    const _arr = []
    timestamp.forEach((item) => {
      const date = new Date(item)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      _arr.push(
        format
          .replace('YYYY', year.toString())
          .replace('MM', month)
          .replace('DD', day)
          .replace('HH', hours)
          .replace('mm', minutes)
          .replace('ss', seconds),
      )
    })
    return _arr
  } else {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds)
  }
}

// 工具函数：解析时间字符串
const parseDateTime = (dateTimeStr: string | any, format: string): number | number[] => {
  const regex = format
    .replace('YYYY', '(\\d{4})')
    .replace('MM', '(\\d{2})')
    .replace('DD', '(\\d{2})')
    .replace('HH', '(\\d{2})')
    .replace('mm', '(\\d{2})')
    .replace('ss', '(\\d{2})')
  if (typeof dateTimeStr === 'object') {
    const _arr = []
    dateTimeStr.forEach((element) => {
      const match = new RegExp(regex).exec(element)

      if (!match) {
        _arr.push('') // 如果解析失败，返回当前时间戳
      } else {
        const [_, year, month, day, hours = '0', minutes = '0', seconds = '0'] = match
        _arr.push(
          new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day),
            parseInt(hours),
            parseInt(minutes),
            parseInt(seconds),
          ).getTime(),
        )
      }
    })
    return _arr
  } else {
    const match = new RegExp(regex).exec(dateTimeStr)

    if (!match) return Date.now() // 如果解析失败，返回当前时间戳

    const [_, year, month, day, hours = '0', minutes = '0', seconds = '0'] = match
    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes),
      parseInt(seconds),
    ).getTime()
  }
}

// 绑定内部值
const { modelValue, format, ...restProps } = toRefs(props)

const internalValue = computed<number | number[]>({
  get() {
    return parseDateTime(modelValue.value, format.value) // 外部值转为时间戳
  },
  set(newValue) {
    const formattedValue = formatDateTime(newValue, format.value) // 时间戳转为格式化字符串
    emit('update:modelValue', formattedValue) // 更新外部绑定值
  },
})

// 确认事件处理
const emit = defineEmits(['update:modelValue'])
</script>
