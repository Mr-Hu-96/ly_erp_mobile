<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '出库单',
  },
}
</route>

<template>
  <view>
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <template #top>
        <wd-search
          v-model="queryParams.outWarehouseCode"
          placeholder="请输入出库单号"
          cancel-txt="搜索"
          @search="handleSearch"
          @cancel="handleSearch"
        >
          <template #prefix>
            <wd-drop-menu>
              <wd-drop-menu-item title="筛选" ref="dropMenu">
                <wd-form ref="queryFormRef" :model="queryParams">
                  <wd-input label="出库类型" v-model="queryParams.outWarehouseType" />
                  <wd-input label="供应商" v-model="queryParams.supplier" />

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
          <wd-cell title="出库单号" :value="item.outWarehouseCode" />
          <wd-cell title="出库类型" :value="item.outWarehouseType" />
          <wd-cell title="出库时间" :value="item.outWarehouseDate" />
          <wd-cell title="备注" :value="item.remark" />
          <wd-cell title="审批状态" :value="item.auditStatus" />
          <wd-cell title="供应商" :value="item.supplier" />
          <wd-cell title="仓库" :value="item.wareName" />
        </wd-cell-group>
      </wd-card>
    </z-paging>
    <wd-fab :gap="{ bottom: 80, right: 15 }" :expandable="false">
      <template #trigger>
        <view
          class="w-[40px] h-[40px] bg-[#0083ff] rounded-full flex items-center justify-center"
          @click="scanClick"
        >
          <wd-icon name="add" size="22px" color="#fff"></wd-icon>
        </view>
      </template>
    </wd-fab>
  </view>
</template>

<script lang="ts" setup>
import { listOutApi } from '@/api/warehouse/outWarehouse'
import { navigate } from '@/utils/navigate'
const dataList = ref([])
const paging = ref(null)
function queryList(pageNum, pageSize) {
  const params = {
    pageNum,
    pageSize,
    ...queryParams.value,
  }
  console.log(params)
  listOutApi(params).then((res) => {
    paging.value.complete(res.rows)
  })
}

// 查询相关
const queryFixed = {
  outWarehouseCode: '',
  outWarehouseType: '',
  supplier: '',
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

function scanClick() {
  navigate.push('/pages-sub/outWarehouse/edit')
}
</script>

<style></style>
