<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '工单详情',
  },
}
</route>

<template>
  <view>
    <wd-card>
      <template #title>
        <view class="w-full flex justify-between items-center">
          <view class="font-bold">{{ workOrderData.WorkOrderCode }}</view>
          <view>
            <!-- <wd-tag custom-class="space" type="danger">加急</wd-tag> -->
            <text v-if="workOrderData.status == '未开始'" class="text-green-600">
              {{ workOrderData.status }}
            </text>
            <text v-else-if="workOrderData.status == '执行中'" class="text-yellow-600">
              {{ workOrderData.status }}
            </text>
            <text v-else-if="workOrderData.status == '已完成'" class="text-blue-600">
              {{ workOrderData.status }}
            </text>
            <text v-else class="text-red-600">{{ workOrderData.status }}</text>
          </view>
        </view>
      </template>
      <view class="flex justify-between">
        <text>工单编号</text>
        <text>{{ workOrderData.workOrderCode }}</text>
      </view>
      <view class="flex justify-between py-1">
        <text>产品编号</text>
        <text class="text-blue-600">{{ workOrderData.productCode }}</text>
      </view>
      <view class="flex justify-between py-1">
        <text>产品名称</text>
        <text>{{ workOrderData.productName }}</text>
      </view>
      <view class="flex justify-between py-1">
        <text>产品规格</text>
        <text>{{ workOrderData.productStandard }}</text>
      </view>
    </wd-card>
    <wd-card v-for="item in workDetailList" :key="item.id">
      <view class="flex justify-between">
        <text>{{ item.processName }}</text>
        <text>{{ item.status }}</text>
      </view>
      <view class="flex justify-between py-1">
        <text>{{ item.processCode }}</text>
        <text>计划数：{{ item.planQty }}</text>
      </view>
      <template #footer>
        <wd-button size="small">报工</wd-button>
      </template>
    </wd-card>
  </view>
</template>

<script lang="ts" setup>
import { getWorkOrderApi } from '@/api/produce/workOrder'
import { noPageListWorkDetailApi } from '@/api/produce/workDetail'
const workOrderData = ref<any>({})
const workDetailList = ref<any>([])
onLoad((option) => {
  getWorkOrderApi(option.id).then((res) => {
    workOrderData.value = res.data
  })
  noPageListWorkDetailApi({ workOrderId: option.id }).then((res) => {
    workDetailList.value = res.data
  })
})
</script>

<style lang="scss" scoped></style>
