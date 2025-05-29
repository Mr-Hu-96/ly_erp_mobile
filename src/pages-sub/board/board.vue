<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '数据看板',
  },
}
</route>

<template>
  <view>
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
    <wd-card title="不良品分布">
      <view class="bg-white w-full h-[300px]">
        <qiun-data-charts type="pie" :opts="opts" :chartData="chartData" />
      </view>
    </wd-card>
  </view>
</template>

<script lang="ts" setup>
import { getOrderStatusApi } from '@/api/sales/order'
import { getWorkOrderStatusApi } from '@/api/produce/workOrder'
import { getDefectBarApi } from '@/api/produce/reportDetail'

const opts = {
  color: [
    '#1890FF',
    '#91CB74',
    '#FAC858',
    '#EE6666',
    '#73C0DE',
    '#3CA272',
    '#FC8452',
    '#9A60B4',
    '#ea7ccc',
  ],
  padding: [5, 5, 5, 5],
  enableScroll: false,
  extra: {
    pie: {
      activeOpacity: 0.5,
      activeRadius: 10,
      offsetAngle: 0,
      labelWidth: 15,
      border: true,
      borderWidth: 3,
      borderColor: '#FFFFFF',
      linearType: 'custom',
    },
  },
}
const salesData = ref<any>([])
const workOrderData = ref<any>([])
const defectData = ref<any>([])
const chartData = ref<any>({})
getData()
async function getData() {
  await Promise.all([getOrderStatusApi(), getWorkOrderStatusApi(), getDefectBarApi()]).then(
    (res) => {
      console.log(res)

      salesData.value = res[0].data
      workOrderData.value = res[1].data
      defectData.value = res[2].data.map((item) => {
        return {
          name: item.defect_item_name,
          value: item.qty,
        }
      })

      const defect = {
        series: [
          {
            data: defectData.value,
          },
        ],
      }
      chartData.value = defect
    },
  )
}
</script>
