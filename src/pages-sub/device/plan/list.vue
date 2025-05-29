<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '设备点检计划',
  },
}
</route>

<template>
  <view>
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <template #top>
        <wd-search
          v-model="queryParams.planCode"
          placeholder="请输入计划编号"
          cancel-txt="搜索"
          @search="handleSearch"
          @cancel="handleSearch"
        >
          <template #prefix>
            <wd-drop-menu>
              <wd-drop-menu-item title="筛选" ref="dropMenu">
                <wd-form ref="queryFormRef" :model="queryParams">
                  <wd-input label="计划名称" v-model="queryParams.planName" />
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
      <wd-card v-for="(item, index) in dataList" :key="index">
        <template #title>
          <view class="w-full flex justify-between items-center">
            <view class="font-bold">{{ item.WorkOrderCode }}</view>
          </view>
        </template>
        <wd-cell-group border>
          <wd-cell title="计划编号" :value="item.planCode" />
          <wd-cell title="计划名称" :value="item.planName" />
          <wd-cell title="计划类型" :value="item.planType" />
          <wd-cell title="频率" :value="item.frequency" />
          <wd-cell title="类型" :value="item.type" />
          <wd-cell title="状态" :value="item.status" />
          <wd-cell title="开始时间" :value="item.startDate" />
          <wd-cell title="结束时间" :value="item.endDate" />
        </wd-cell-group>
      </wd-card>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import { listPlanApi } from '@/api/device/plan'
const dataList = ref([])
const paging = ref(null)
function queryList(pageNum, pageSize) {
  const params = {
    pageNum,
    pageSize,
    ...queryParams.value,
  }
  console.log(params)
  listPlanApi(params).then((res) => {
    paging.value.complete(res.rows)
  })
}

// 查询相关
const queryFixed = {
  planCode: '',
  planName: '',
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
</script>

<style></style>
