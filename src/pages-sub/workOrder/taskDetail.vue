<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '报工列表',
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
    <wd-card v-for="item in reportList" :key="item.id">
      <view class="flex justify-between">
        <text>{{ item.productName }}</text>
        <text>{{ item.status }}</text>
      </view>
      <view class="flex justify-between py-1">
        <text>{{ item.priceType }}</text>
        <text>报工数：{{ item.reportQty }}</text>
      </view>
      <!-- <template #footer>
        <wd-button size="small" @click="initReport(item)">报工</wd-button>
      </template> -->
    </wd-card>
    <Add v-model="showReport" ref="addReportRef" @confirm="addReportData" />
    <view class="fixed-bottom">
      <wd-button type="success" block @click="initReport">报工</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { listWorkDetailApi } from '@/api/produce/workDetail'
import { addReportApi, listReportApi } from '@/api/produce/report'
import Add from '@/components/ReportWork/Add.vue'
const workOrderData = ref<any>({})
const reportList = ref<any>([])
const workOrderId = ref(0)
onLoad((option) => {
  workOrderId.value = option.id
  initData(workOrderId.value)
})

function initData(id) {
  listWorkDetailApi({ id }).then((res) => {
    workOrderData.value = res.rows[0] ? res.rows[0] : {}
    if (workOrderData.value.processCode) {
      listReportApi({ processCode: workOrderData.value.processCode }).then((res) => {
        reportList.value = res.rows
      })
    }
  })
}
const showReport = ref(false)
const addReportRef = ref()
function initReport() {
  showReport.value = true
  if (addReportRef.value) {
    const {
      id,
      processName,
      status,
      processId,
      goodQty,
      planQty,
      productCode,
      productName,
      productStandard,
      workOrderCode,
      workOrderId,
    } = workOrderData.value
    addReportRef.value.initData(
      { id, processName, status, processId, goodQty, planQty },
      { productCode, productName, productStandard, workOrderCode, id: workOrderId },
    )
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
