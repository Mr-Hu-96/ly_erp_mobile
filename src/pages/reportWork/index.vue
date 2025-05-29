<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '报工',
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
                  <wd-picker
                    :columns="dateStatusColumns"
                    prop="dateStatus"
                    label="加急状态"
                    v-model="queryParams.dateStatus"
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
        <view class="grid grid-cols-2 gap-3 p-3">
          <view class="card bg-blue-500">
            <text class="title">工资总计</text>
            <text class="value">{{ data.salary }}</text>
          </view>

          <view class="card bg-pink-500">
            <text class="title">审批/总计</text>
            <text class="value">{{ data.approved }}/{{ data.total }}</text>
          </view>

          <view class="card bg-yellow-500">
            <text class="title">总数/良品/不良</text>
            <text class="value">{{ data.count }}/{{ data.good }}/{{ data.bad }}</text>
          </view>

          <view class="card bg-green-500">
            <text class="title">不良率</text>
            <text class="value">{{ data.badRate }}%</text>
          </view>
        </view>
      </template>
      <wd-card v-for="(item, index) in dataList" :key="index">
        <!-- <template #title>
          <view class="w-full flex justify-between items-center">
            <view class="font-bold">{{ item.workOrderCode }}</view>
          </view>
        </template> -->
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
          <text>工序编号</text>
          <text>{{ item.processCode }}</text>
        </view>
        <view class="flex justify-between py-1">
          <text>工序名称</text>
          <text>{{ item.processName }}</text>
        </view>
        <view class="flex justify-between py-1">
          <text>工序状态</text>
          <text>{{ item.processStatus }}</text>
        </view>
        <view class="flex justify-between py-1">
          <text>生产人员</text>
          <text>{{ item.productUser }}</text>
        </view>

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
          <wd-grid-item use-icon-slot text="报工数" icon-size="20px">
            <template #icon>{{ item.reportQty }}</template>
          </wd-grid-item>
          <wd-grid-item use-icon-slot text="达标率" icon-size="20px">
            <template #icon>{{ item.rateStandard }}</template>
          </wd-grid-item>
        </wd-grid>
      </wd-card>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import { listReportApi } from '@/api/produce/report'
const dataList = ref([])
const paging = ref(null)
function queryList(pageNum, pageSize) {
  const params = {
    pageNum,
    pageSize,
    ...queryParams.value,
  }
  listReportApi(params).then((res) => {
    paging.value.complete(res.rows)
  })
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

const statusColumns = ['未开始', '进行中', '已完成', '已取消']
const dateStatusColumns = ['未加急', '加急', '逾期']

const data = reactive({
  salary: 123712,
  approved: 232,
  total: 492,
  count: 10020,
  good: 8290,
  bad: 1983,
  badRate: 10,
})
</script>

<style scoped>
.card {
  @apply rounded-lg p-4 flex flex-col text-white shadow-md;
}

.title {
  @apply text-sm font-bold;
}

.value {
  @apply text-lg mt-1;
}
</style>
