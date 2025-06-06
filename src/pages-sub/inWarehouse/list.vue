<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '入库单',
  },
}
</route>

<template>
  <view>
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <template #top>
        <wd-search
          v-model="queryParams.warehouseCode"
          placeholder="请输入入库单号"
          cancel-txt="搜索"
          @search="handleSearch"
          @cancel="handleSearch"
        >
          <template #prefix>
            <wd-drop-menu>
              <wd-drop-menu-item title="筛选" ref="dropMenu">
                <wd-form ref="queryFormRef" :model="queryParams">
                  <wd-input label="入库类型" v-model="queryParams.warehouseType" />
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
      <wd-card
        v-for="(item, index) in dataList"
        :key="index"
        @click="navigate.push('/pages-sub/inWarehouse/edit', { warehouseId: item.id })"
      >
        <template #title>
          <view class="w-full flex justify-between items-center">
            <view class="font-bold">{{ item.WorkOrderCode }}</view>
          </view>
        </template>
        <wd-cell-group border>
          <wd-cell title="入库单号" :value="item.warehouseCode" />
          <wd-cell title="入库类型" :value="item.warehouseType" />
          <wd-cell title="入库时间" :value="item.warehouseDate" />
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
          <wd-icon name="scan" size="22px" color="#fff"></wd-icon>
        </view>
      </template>
    </wd-fab>
    <!-- #ifdef H5 -->
    <view id="reader" style="width: 300px; margin: 20px auto"></view>
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import { listInWarehouseApi } from '@/api/warehouse/inWarehouse'
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode'
import { getRecordCheckApi } from '@/api/record/record'
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
  listInWarehouseApi(params).then((res) => {
    paging.value.complete(res.rows)
  })
}

// 查询相关
const queryFixed = {
  warehouseCode: '',
  warehouseType: '',
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
function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  console.log(`Code matched = ${decodedText}`, decodedResult)
}
function scanClick() {
  // #ifdef H5
  const config = {
    fps: 10,
    qrbox: { width: 100, height: 100 },
    rememberLastUsedCamera: true,
    // Only support camera scan type.
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  }
  console.log(1231, config)
  const html5QrcodeScanner = new Html5QrcodeScanner('reader', config, /* verbose= */ false)
  html5QrcodeScanner.render(onScanSuccess)
  // #endif
  // #ifndef H5
  // 允许从相机和相册扫码
  uni.scanCode({
    success: function (res) {
      console.log('条码类型：' + res.scanType)
      console.log('条码内容：' + res.result)
      getRecordCheckApi({ id: res.result, type: '采购入库' }).then((_res) => {
        navigate.push('/pages-sub/inWarehouse/edit', { id: res.result })
      })
      // .catch((_err) => {
      //   uni.showToast({
      //     title: '扫码错误',
      //     icon: 'error',
      //   })
      // })
    },
  })
  // #endif
}
</script>

<style></style>
