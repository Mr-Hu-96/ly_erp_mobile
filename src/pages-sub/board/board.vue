<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '菜单',
  },
}
</route>

<template>
  <view class="">
    <wd-card title="销售订单">
      <wd-grid :clickable="true" :column="5">
        <wd-grid-item
          v-for="(item, index) in salesData"
          :key="index"
          use-icon-slot
          :text="item.name"
        >
          <template #icon>
            <text class="text-blue-700 font-bold">{{ item.value }}</text>
          </template>
        </wd-grid-item>
      </wd-grid>
    </wd-card>
    <wd-card title="工单概括">
      <wd-grid :clickable="true" :column="3">
        <wd-grid-item
          v-for="(item, index) in workOrderData"
          :key="index"
          use-icon-slot
          :text="item.name"
        >
          <template #icon>
            <text class="text-red-600 font-bold">{{ item.value }}</text>
          </template>
        </wd-grid-item>
      </wd-grid>
    </wd-card>
  </view>
</template>

<script lang="ts" setup>
import { getOrderStatusApi } from '@/api/sales/order'
import { getWorkOrderStatusApi } from '@/api/produce/workOrder'
import { getDefectBarApi } from '@/api/produce/reportDetail'

const salesData = ref<any>([])
const workOrderData = ref<any>([])
const defectData = ref<any>([])
getData()
async function getData() {
  await Promise.all([getOrderStatusApi(), getWorkOrderStatusApi(), getDefectBarApi()]).then(
    (res) => {
      console.log(res)

      salesData.value = res[0].data
      workOrderData.value = res[1].data
      defectData.value = res[2].data
    },
  )
}
</script>
