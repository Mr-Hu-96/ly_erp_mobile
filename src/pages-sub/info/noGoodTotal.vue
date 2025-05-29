<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '不良品项汇总',
  },
}
</route>

<template>
  <view>
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <template #top>
        <wd-search
          v-model="queryParams.productName"
          placeholder="请输入产品名称"
          cancel-txt="搜索"
          @search="handleSearch"
          @cancel="handleSearch"
        >
          <template #prefix>
            <wd-drop-menu>
              <wd-drop-menu-item title="筛选" ref="dropMenu">
                <wd-form ref="queryFormRef" :model="queryParams">
                  <wd-input label="产品编号" v-model="queryParams.productCode" />
                  <wd-input label="产品规格" v-model="queryParams.productStandard" />

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
          <wd-cell title="工单编号" :value="item.workOrderCode" />
          <wd-cell title="产品名称" :value="item.productName" />
          <wd-cell title="产品编号" :value="item.productCode" />
          <wd-cell title="产品规格" :value="item.productStandard" />
          <wd-cell title="工序名称" :value="item.processName" />
          <wd-cell title="生产人员" :value="item.assigner" />
          <wd-cell title="不良品项" :value="item.defectItem" />
          <wd-cell title="工序计划数" :value="item.planQty" />
          <wd-cell title="良品数" :value="item.goodQty" />
          <wd-cell title="不良品数" :value="item.noGoodQty" />
        </wd-cell-group>
      </wd-card>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import { listWorkDetailApi } from '@/api/produce/workDetail'
const dataList = ref([])
const paging = ref(null)
function queryList(pageNum, pageSize) {
  const params = {
    pageNum,
    pageSize,
    ...queryParams.value,
  }
  console.log(params)
  listWorkDetailApi(params).then((res) => {
    paging.value.complete(res.rows)
  })
}

// 查询相关
const queryFixed = {
  productName: '',
  productCode: '',
  productStandard: '',
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
