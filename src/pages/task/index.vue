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
      <wd-card v-for="(item, index) in dataList" :key="index">
        <template #title>
          <view class="w-full flex justify-between items-center">
            <view class="font-bold">{{ item.WorkOrderCode }}</view>
            <!-- <view>
              <wd-tag custom-class="space" type="danger">加急</wd-tag>
              <text class="text-green-600">进行中</text>
            </view> -->
          </view>
        </template>
        <view class="flex justify-between">
          <text>工单编号</text>
          <text>{{ item.workOrderCode }}</text>
        </view>
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
</script>

<style></style>
