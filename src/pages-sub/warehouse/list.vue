<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '库存余额',
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
          <wd-cell title="仓库名称" :value="item.wareName" />
          <wd-cell title="仓库编号" :value="item.wareCode" />
          <wd-cell title="库位名称" :value="item.positionName" />
          <wd-cell title="库位编号" :value="item.positionCode" />
          <wd-cell title="产品名称" :value="item.productName" />
          <wd-cell title="产品编号" :value="item.productCode" />
          <wd-cell title="产品规格" :value="item.productStandard" />
          <wd-cell title="库存数量" :value="item.inventoryQty" />
          <wd-cell title="单位" :value="item.unit" />
        </wd-cell-group>
      </wd-card>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import { listInventoryApi } from '@/api/warehouse/inventory'
const dataList = ref([])
const paging = ref(null)
function queryList(pageNum, pageSize) {
  const params = {
    pageNum,
    pageSize,
    ...queryParams.value,
  }
  listInventoryApi(params).then((res) => {
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
