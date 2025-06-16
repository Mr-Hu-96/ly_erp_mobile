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
          <view class="font-bold">{{ workOrderData.workOrderCode }}</view>
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
        <wd-button size="small" @click="initReport(item)">报工</wd-button>
      </template>
    </wd-card>
    <Add v-model="showReport" ref="addReportRef" @confirm="addReportData" />
  </view>
</template>

<script lang="ts" setup>
import { getWorkOrderApi } from '@/api/produce/workOrder'
import { noPageListWorkDetailApi } from '@/api/produce/workDetail'
import { addReportApi } from '@/api/produce/report'
import Add from '@/components/ReportWork/Add.vue'
const workOrderData = ref<any>({})
const workDetailList = ref<any>([])
const workOrderId = ref(0)
onLoad((option) => {
  workOrderId.value = option.id
  initData(workOrderId.value)
})

function initData(id) {
  getWorkOrderApi(id).then((res) => {
    workOrderData.value = res.data
  })
  noPageListWorkDetailApi({ workOrderId: id }).then((res) => {
    workDetailList.value = res.data
  })
}
const showReport = ref(false)
const addReportRef = ref()
function initReport(row) {
  console.log(row, workOrderData.value)
  showReport.value = true
  if (addReportRef.value) {
    addReportRef.value.initData(row, workOrderData.value)
  }
}
function addReportData(data) {
  console.log(data)
  const { defectList, standardProgressTime, ...formData } = JSON.parse(JSON.stringify(data))
  const { alreadyQty, goodQty, noGoodQty, planQty } = formData
  if (goodQty + noGoodQty > planQty - alreadyQty) {
    return uni.showToast({
      title: '请勿填写超出计划数减已报工数！',
      icon: 'error',
    })
  }
  // const params = {
  //   defectList,
  //   formData,
  //   standardProgressTime,
  // }
  const params = { ...formData, produceReportExt: {} }
  params.defectList = defectList.map((item) => {
    const { defectItemName, defectItemCode, qty } = item
    return { defectItemName, defectItemCode, qty }
  })
  params.standard =
    standardProgressTime.hour +
    '小时' +
    standardProgressTime.min +
    '分' +
    standardProgressTime.sec +
    '秒'
  addReportApi(params).then((response) => {
    uni.showToast({
      title: '新增成功',
      icon: 'success',
    })
    showReport.value = false
  })
}
</script>

<style lang="scss" scoped></style>
