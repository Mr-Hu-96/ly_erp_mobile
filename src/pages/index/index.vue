<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationBarTitleText: '工单',
  },
}
</route>
<template>
  <view>
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <template #top>
        <wd-search
          v-model="queryParams.personResponsible"
          placeholder="请输入工单编号"
          cancel-txt="搜索"
          @search="handleSearch"
          @cancel="handleSearch"
        >
          <template #prefix>
            <wd-drop-menu>
              <wd-drop-menu-item title="筛选" ref="dropMenu">
                <wd-form ref="queryFormRef" :model="queryParams">
                  <wd-picker
                    :columns="statusColumns"
                    prop="status"
                    label="状态"
                    v-model="queryParams.status"
                  />
                  <!-- <wd-picker
                    :columns="dateStatusColumns"
                    prop="dateStatus"
                    label="加急状态"
                    v-model="queryParams.dateStatus"
                  /> -->

                  <wd-cell-group border>
                    <wd-cell title-width="0px">
                      <view class="flex">
                        <wd-button block type="info" plain @click="queryReset">重置</wd-button>
                        <wd-button type="primary" block @click="querySubmit">查询</wd-button>
                      </view>
                    </wd-cell>
                  </wd-cell-group>
                </wd-form>
              </wd-drop-menu-item>
            </wd-drop-menu>
          </template>
        </wd-search>
      </template>
      <wd-card
        v-for="(item, index) in dataList"
        :key="index"
        @click="navigate.push('/pages-sub/workOrder/detail', { id: item.id })"
      >
        <template #title>
          <view class="w-full flex justify-between items-center">
            <view class="font-bold">{{ item.workOrderCode }}</view>
            <view>
              <!-- <wd-tag custom-class="space" type="danger">加急</wd-tag> -->
              <text v-if="item.status == '未开始'" class="text-green-600">{{ item.status }}</text>
              <text v-else-if="item.status == '执行中'" class="text-yellow-600">
                {{ item.status }}
              </text>
              <text v-else-if="item.status == '已完成'" class="text-blue-600">
                {{ item.status }}
              </text>
              <text v-else class="text-red-600">{{ item.status }}</text>
            </view>
          </view>
        </template>

        <view class="flex justify-between py-1">
          <text>产品编号</text>
          <text class="text-blue-600">{{ item.productCode }}</text>
        </view>
        <view class="flex justify-between py-1">
          <text>产品名称</text>
          <text>{{ item.productName }}</text>
        </view>
        <view class="flex justify-between py-1">
          <text>产品规格</text>
          <text>{{ item.productStandard }}</text>
        </view>
        <wd-steps :active="item.stepsIndex" align-center>
          <wd-step
            v-for="(i, j) in item.taskList"
            :key="j"
            :title="i.processName"
            :description="i.progress"
            class="min-w-[22%]"
          />
        </wd-steps>
        <wd-grid>
          <wd-grid-item use-icon-slot text="计划数" icon-size="20px">
            <template #icon>{{ item.planQty }}</template>
          </wd-grid-item>
          <wd-grid-item use-icon-slot text="良品数" icon-size="20px">
            <template #icon>{{ item.goodQty }}</template>
          </wd-grid-item>
          <wd-grid-item use-icon-slot text="不良数" icon-size="20px">
            <template #icon>{{ item.noGoodQty }}</template>
          </wd-grid-item>
          <wd-grid-item use-icon-slot text="实际数" icon-size="20px">
            <template #icon>{{ item.realQty }}</template>
          </wd-grid-item>
        </wd-grid>
      </wd-card>
    </z-paging>
    <wd-fab :gap="{ bottom: 80, right: 15 }" :z-index="1" :expandable="false">
      <template #trigger>
        <view
          class="w-[40px] h-[40px] bg-[#0083ff] rounded-full flex items-center justify-center"
          @click="scanClick"
        >
          <wd-icon name="scan" size="22px" color="#fff"></wd-icon>
        </view>
      </template>
    </wd-fab>
  </view>
</template>

<script lang="ts" setup>
import { listWorkOrderApi } from '@/api/produce/workOrder'
import { toFixedWithLimit } from '@/utils/index'
import { navigate } from '@/utils/navigate'
const dataList = ref([])
const paging = ref(null)
function queryList(pageNum, pageSize) {
  const params = {
    pageNum,
    pageSize,
    ...queryParams.value,
  }
  listWorkOrderApi(params).then((res) => {
    console.log(res)
    const _data = res.rows.map((item) => {
      let isCurrent = false
      item.stepsIndex = item.taskList.length - 1
      item.taskList.forEach((task, j) => {
        const progress = calcProgress(task.goodQty, task.planQty)
        task.progress = progress + '%'
        if ((progress !== 100 && isCurrent === false) || item.taskList.length === 1) {
          console.log('isCurrent', progress, isCurrent, item.taskList.length)

          isCurrent = true
          item.planQty = task.planQty
          item.goodQty = task.goodQty || 0
          item.noGoodQty = task.noGoodQty || 0
          item.realQty = toFixedWithLimit(item.goodQty) + toFixedWithLimit(item.noGoodQty)
          item.stepsIndex = j
        }
      })
      return item
    })
    paging.value.complete(_data)
  })
}

function calcProgress(goodQty, planQty) {
  let num = toFixedWithLimit(goodQty) / toFixedWithLimit(planQty)
  if (num > 1) {
    num = 1
  }
  return planQty ? toFixedWithLimit(num * 100) : 0
}

// 查询相关
const queryFixed = {
  personResponsible: '',
  status: '',
  dateStatus: '',
}
const queryParams = ref({ ...queryFixed })
const dropMenu = ref()
function confirmFilter() {
  dropMenu.value.close()
}
const queryReset = () => {
  queryParams.value = { ...queryFixed }
  handleSearch()
  confirmFilter()
}

const querySubmit = () => {
  handleSearch()
  confirmFilter()
}
function handleSearch() {
  paging.value.reload()
}

const statusColumns = ['未开始', '执行中', '已完成', '已结束']
const dateStatusColumns = ['未加急', '加急', '逾期']

onShow(() => {
  if (paging.value) {
    paging.value.reload()
  }
})

function scanClick() {
  // #ifdef H5
  // const config = {
  //   fps: 10,
  //   qrbox: { width: 100, height: 100 },
  //   rememberLastUsedCamera: true,
  //   // Only support camera scan type.
  //   supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  // }
  // console.log(1231, config)
  // const html5QrcodeScanner = new Html5QrcodeScanner('reader', config, /* verbose= */ false)
  // html5QrcodeScanner.render(onScanSuccess)
  onScanSuccess('447796946071040')
  // #endif
  // #ifndef H5
  // 允许从相机和相册扫码
  uni.scanCode({
    success: function (res) {
      console.log('条码类型：' + res.scanType)
      console.log('条码内容：' + res.result)
      onScanSuccess(res.result)
    },
  })
  // #endif
  function onScanSuccess(result) {
    navigate.push('/pages-sub/workOrder/detail', { id: result })
  }
}
</script>

<style></style>
