<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '任务',
  },
}
</route>

<template>
  <view>
    <z-paging ref="paging" v-model="dataList" @query="queryList">
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
                  <wd-picker
                    :columns="statusColumns"
                    prop="status"
                    label="状态"
                    v-model="queryParams.status"
                  />
                  <wd-picker
                    :columns="priorityColumns"
                    prop="priority"
                    label="加急状态"
                    v-model="queryParams.priority"
                  />

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
        @click="navigate.push('/pages-sub/workOrder/taskDetail', { id: item.id })"
      >
        <template #title>
          <view class="w-full flex justify-between items-center">
            <view class="font-bold">{{ item.workOrderCode }}</view>
            <!-- <view>
              <wd-tag custom-class="space" type="danger">加急</wd-tag>
              <text class="text-green-600">进行中</text>
            </view> -->
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
        <view class="flex justify-between py-1">
          <text>工序名称</text>
          <text>{{ item.processName }}</text>
        </view>

        <view class="flex justify-between py-1">
          <text>计划结束时间</text>
          <text>{{ item.planEndDate }}</text>
        </view>
        <view class="flex justify-between py-1">
          <text>计划数</text>
          <text>{{ item.planQty }}</text>
        </view>
        <!-- <wd-grid>
          <wd-grid-item use-icon-slot text="计划数" icon-size="20px">
            <template #icon>{{ item.planQty }}</template>
          </wd-grid-item>
          <wd-grid-item use-icon-slot text="良品数" icon-size="20px">
            <template #icon>{{ item.GoodQty }}</template>
          </wd-grid-item>
          <wd-grid-item use-icon-slot text="不良数" icon-size="20px">
            <template #icon>{{ item.NoGoodQty }}</template>
          </wd-grid-item>
          <wd-grid-item use-icon-slot text="实际数" icon-size="20px">
            <template #icon>{{ item.RealQty }}</template>
          </wd-grid-item>
          <wd-grid-item use-icon-slot text="合格率" icon-size="20px">
            <template #icon>{{ item.RealQty }}</template>
          </wd-grid-item>
        </wd-grid> -->
        <!-- <wd-select-picker
          label="分配列表"
          v-model="peValue"
          :columns="columnsPe"
          filterable
        ></wd-select-picker> -->
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
import { navigate } from '@/utils/navigate'
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
  workOrderCode: '',
  status: '',
  priority: '',
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

const statusColumns = ['未开始', '进行中', '已完成', '已取消']
const priorityColumns = ['未加急', '加急', '逾期']

const peValue = ref([])
const columnsPe = ref<Record<string, any>>([
  {
    value: '101',
    label: '张工',
  },
  {
    value: '102',
    label: '李工',
  },
  {
    value: '103',
    label: '王工',
  },
  {
    value: '104',
    label: 'admin',
  },
  {
    value: '105',
    label: 'leo',
  },
  {
    value: '106',
    label: 'ada',
  },
  {
    value: '107',
    label: 'jethro',
  },
  {
    value: '108',
    label: 'gary',
  },
  {
    value: '109',
    label: 'coco',
  },
  {
    value: '110',
    label: '娜美',
  },
  {
    value: '111',
    label: '索隆',
  },
  {
    value: '112',
    label: '乔巴',
  },
])
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
    navigate.push('/pages-sub/workOrder/taskDetail', { id: result })
  }
}
</script>

<style></style>
