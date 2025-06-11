<template>
  <view class="">
    <wd-popup v-model="show" position="bottom" closable>
      <view class="text-center font-bold lh-10">工单选择</view>
      <view style="height: 80vh" class="bg-[#edf2fa]">
        <!-- 设置fixed=false代表z-paging非铺满全屏，此时z-paging高度未确定，其父view或z-paging本身必须确定宽高 -->
        <z-paging ref="paging" :fixed="false" v-model="dataList" @query="queryList">
          <template #top>
            <wd-search
              v-model="queryParams.workOrderCode"
              placeholder="请输入工单编号"
              cancel-txt="搜索"
              @search="handleSearch"
              @cancel="handleSearch"
            >
              <template #prefix>
                <wd-drop-menu>
                  <wd-drop-menu-item title="筛选" ref="dropMenu">
                    <wd-form ref="queryFormRef" :model="queryParams">
                      <wd-input label="产品名称" v-model="queryParams.productName" />
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
            <wd-cell-group border @click="() => $emits('select', item)">
              <wd-cell title="工单编号" :value="item.workOrderCode" />
              <wd-cell title="产品名称" :value="item.productName" />
            </wd-cell-group>
          </wd-card>
        </z-paging>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { listWorkOrderApi } from '@/api/produce/workOrder'
const show = defineModel<boolean>()
const dataList = ref([])
const paging = ref(null)

const $emits = defineEmits(['select'])
function queryList(pageNum, pageSize) {
  const params = {
    pageNum,
    pageSize,
    ...queryParams.value,
  }
  console.log(params)
  listWorkOrderApi(params).then((res) => {
    paging.value.complete(res.rows)
  })
}

// 查询相关
const queryFixed = {
  workOrderCode: '',
  productName: '',
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

<style lang="scss" scoped>
//
</style>
