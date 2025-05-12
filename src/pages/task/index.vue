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
          <text>{{ item.WorkOrderCode }}</text>
        </view>
        <view class="flex justify-between py-1">
          <text>产品编号</text>
          <text class="text-blue-600">{{ item.ProductCode }}</text>
        </view>
        <view class="flex justify-between py-1">
          <text>产品名称</text>
          <text>{{ item.ProductName }}</text>
        </view>
        <view class="flex justify-between py-1">
          <text>产品规格</text>
          <text>个</text>
        </view>
        <view class="flex justify-between py-1">
          <text>计划时间</text>
          <text>{{ item.PlanEndDate }}</text>
        </view>

        <wd-grid>
          <wd-grid-item use-icon-slot text="计划数" icon-size="20px">
            <template #icon>{{ item.PlanQty }}</template>
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
        </wd-grid>
        <wd-select-picker
          label="分配列表"
          v-model="peValue"
          :columns="columnsPe"
          filterable
        ></wd-select-picker>
      </wd-card>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
const dataList = ref([])
const paging = ref(null)
function queryList(pageNum, pageSize) {
  const params = {
    pageNum,
    pageSize,
    ...queryParams.value,
  }
  console.log(params)

  paging.value.complete([
    {
      DynamicProperties: {},
      FinishedProduct: null,
      WorkOrder_Id: 2512,
      WorkOrderCode: 'GD202502240001',
      Product_Id: 2117,
      ProductCode: 'CP20240724004',
      ProductName: '零件',
      ProductStandard: null,
      Unit_Id: 1,
      AssociatedForm: null,
      Status: '1',
      PlanStartDate: '2025-02-24 00:00:00',
      PlanEndDate: '2025-03-27 23:59:59',
      PlanQty: 100,
      RealQty: 0,
      GoodQty: 0,
      NoGoodQty: 0,
      ReportTime: null,
      ProductionSchedule:
        '[{"Sequence":"1","Process_Id":"1745","ProcessLine_Id":"1872","ProcessName":"螺丝-切削","ReportQty":"0/100","PercentNum":"0.00%","PlanEndDate":"2025-03-27T23:59:59","WorkOrderList_id":"6816","WorkOrder_Id":"2512","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"100","GoodQty":"0","type":"工序"},{"Sequence":"2","Process_Id":"1746","ProcessLine_Id":"1872","ProcessName":"螺丝-打磨","ReportQty":"0/100","PercentNum":"0.00%","PlanEndDate":"2025-03-27T23:59:59","WorkOrderList_id":"6817","WorkOrder_Id":"2512","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"100","GoodQty":"0","type":"工序"},{"Sequence":"3","Process_Id":"1747","ProcessLine_Id":"1872","ProcessName":"螺丝-抛光","ReportQty":"0/100","PercentNum":"0.00%","PlanEndDate":"2025-03-27T23:59:59","WorkOrderList_id":"6818","WorkOrder_Id":"2512","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"100","GoodQty":"0","type":"工序"}]',
      ActualStartDate: null,
      ActualEndDate: null,
      Remark: null,
      CreateDate: '2025-02-24 11:06:13',
      CreateID: 4363,
      Creator: '郑工',
      Modifier: null,
      ModifyDate: null,
      ModifyID: null,
      FromType: null,
      Priority: null,
      ProcessLine_Id: 1872,
      LastStaus: null,
      Production_WorkOrderList: null,
      Production_WorkOrderMaterialList: null,
    },
    {
      DynamicProperties: {},
      FinishedProduct: null,
      WorkOrder_Id: 2511,
      WorkOrderCode: 'GD202502200003',
      Product_Id: 2424,
      ProductCode: 'CP20250116001',
      ProductName: '螺丝',
      ProductStandard: '8mm',
      Unit_Id: 1032,
      AssociatedForm: null,
      Status: '3',
      PlanStartDate: '2025-02-20 00:00:00',
      PlanEndDate: '2025-02-20 23:59:59',
      PlanQty: 30,
      RealQty: 32,
      GoodQty: 30,
      NoGoodQty: 2,
      ReportTime: null,
      ProductionSchedule:
        '[{"Sequence":"1","Process_Id":"1745","ProcessLine_Id":"1871","ProcessName":"螺丝-切削","ReportQty":"30/30","PercentNum":"100.00%","PlanEndDate":"2025-02-18T23:59:59","WorkOrderList_id":"6813","WorkOrder_Id":"2511","NoGoodQty":"6","NoApprovGoodQty":"0","ApprovGoodQty":"30","PlanQty":"30","ReportTime":"2025-02-20T16:18:25","Status":"3","GoodQty":"30","type":"工序"},{"Sequence":"2","Process_Id":"1746","ProcessLine_Id":"1871","ProcessName":"螺丝-打磨","ReportQty":"30/30","PercentNum":"100.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6814","WorkOrder_Id":"2511","NoGoodQty":"2","NoApprovGoodQty":"0","ApprovGoodQty":"30","PlanQty":"30","ReportTime":"2025-02-20T16:22:05","Status":"3","GoodQty":"30","type":"工序"},{"Sequence":"3","Process_Id":"1747","ProcessLine_Id":"1871","ProcessName":"螺丝-抛光","ReportQty":"30/30","PercentNum":"100.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6815","WorkOrder_Id":"2511","NoGoodQty":"2","NoApprovGoodQty":"0","ApprovGoodQty":"30","PlanQty":"30","ReportTime":"2025-02-20T16:22:09","Status":"3","GoodQty":"30","type":"工序"}]',
      ActualStartDate: '2025-02-20 16:13:56',
      ActualEndDate: '2025-02-20 16:22:09',
      Remark: null,
      CreateDate: '2025-02-20 16:12:55',
      CreateID: 4389,
      Creator: '单锡辉',
      Modifier: '郑工',
      ModifyDate: '2025-03-04 14:42:24',
      ModifyID: 4363,
      FromType: null,
      Priority: null,
      ProcessLine_Id: 1871,
      LastStaus: '1',
      Production_WorkOrderList: null,
      Production_WorkOrderMaterialList: null,
    },
    {
      DynamicProperties: {},
      FinishedProduct: null,
      WorkOrder_Id: 2510,
      WorkOrderCode: 'GD202502200002',
      Product_Id: 2423,
      ProductCode: 'CP20241230001',
      ProductName: 'LED电源',
      ProductStandard: null,
      Unit_Id: 9,
      AssociatedForm: null,
      Status: '2',
      PlanStartDate: '2025-02-20 00:00:00',
      PlanEndDate: '2025-02-20 23:59:59',
      PlanQty: 100,
      RealQty: 0,
      GoodQty: 0,
      NoGoodQty: 0,
      ReportTime: null,
      ProductionSchedule:
        '[{"Sequence":"1","Process_Id":"1355","ProcessLine_Id":"1870","ProcessName":"贴片","ReportQty":"91/110","PercentNum":"82.73%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6801","WorkOrder_Id":"2510","NoGoodQty":"1","NoApprovGoodQty":"0","ApprovGoodQty":"91","PlanQty":"110","ReportTime":"2025-02-20T09:18:55","Status":"2","GoodQty":"91","type":"工序"},{"Sequence":"2","Process_Id":"1769","ProcessLine_Id":"1870","ProcessName":"插件","ReportQty":"100/100","PercentNum":"100.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6802","WorkOrder_Id":"2510","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"100","PlanQty":"100","ReportTime":"2025-02-24T14:30:13","Status":"3","GoodQty":"100","type":"工序"},{"Sequence":"3","Process_Id":"1770","ProcessLine_Id":"1870","ProcessName":"浸锡","ReportQty":"100/100","PercentNum":"100.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6803","WorkOrder_Id":"2510","NoGoodQty":"6","NoApprovGoodQty":"0","ApprovGoodQty":"100","PlanQty":"100","ReportTime":"2025-02-20T09:29:39","Status":"3","GoodQty":"100","type":"工序"},{"Sequence":"4","Process_Id":"1771","ProcessLine_Id":"1870","ProcessName":"剪尾线","ReportQty":"0/100","PercentNum":"0.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6804","WorkOrder_Id":"2510","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"100","GoodQty":"0","type":"工序"},{"Sequence":"5","Process_Id":"1772","ProcessLine_Id":"1870","ProcessName":"补焊","ReportQty":"0/100","PercentNum":"0.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6805","WorkOrder_Id":"2510","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"100","GoodQty":"0","type":"工序"},{"Sequence":"7","Process_Id":"1773","ProcessLine_Id":"1870","ProcessName":"初次功能测试","ReportQty":"0/100","PercentNum":"0.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6806","WorkOrder_Id":"2510","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"100","GoodQty":"0","type":"工序"},{"Sequence":"8","Process_Id":"1774","ProcessLine_Id":"1870","ProcessName":"装入外壳","ReportQty":"0/100","PercentNum":"0.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6807","WorkOrder_Id":"2510","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"100","GoodQty":"0","type":"工序"},{"Sequence":"9","Process_Id":"1775","ProcessLine_Id":"1870","ProcessName":"耐压测试","ReportQty":"0/100","PercentNum":"0.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6808","WorkOrder_Id":"2510","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"100","GoodQty":"0","type":"工序"},{"Sequence":"10","Process_Id":"1776","ProcessLine_Id":"1870","ProcessName":"老化测试","ReportQty":"0/100","PercentNum":"0.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6809","WorkOrder_Id":"2510","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"100","GoodQty":"0","type":"工序"},{"Sequence":"11","Process_Id":"1777","ProcessLine_Id":"1870","ProcessName":"成品测试","ReportQty":"0/100","PercentNum":"0.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6810","WorkOrder_Id":"2510","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"100","GoodQty":"0","type":"工序"},{"Sequence":"12","Process_Id":"1260","ProcessLine_Id":"1870","ProcessName":"包装入库","ReportQty":"0/100","PercentNum":"0.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6811","WorkOrder_Id":"2510","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"100","GoodQty":"0","type":"工序"},{"Sequence":"6","Process_Id":"1645","ProcessLine_Id":"1870","ProcessName":"外协-拉丝众旺","ReportQty":"0/100","PercentNum":"0.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6812","WorkOrder_Id":"2510","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"100","GoodQty":"0","type":"工序"}]',
      ActualStartDate: '2025-02-20 09:16:21',
      ActualEndDate: null,
      Remark: null,
      CreateDate: '2025-02-20 09:16:12',
      CreateID: 4363,
      Creator: '郑工',
      Modifier: '冯世春',
      ModifyDate: '2025-02-24 14:33:36',
      ModifyID: 4426,
      FromType: null,
      Priority: 2,
      ProcessLine_Id: 1870,
      LastStaus: '1',
      Production_WorkOrderList: null,
      Production_WorkOrderMaterialList: null,
    },
    {
      DynamicProperties: {},
      FinishedProduct: null,
      WorkOrder_Id: 2509,
      WorkOrderCode: 'GD202502200001',
      Product_Id: 2116,
      ProductCode: 'CP20240724003',
      ProductName: '压铸件',
      ProductStandard: '403',
      Unit_Id: 1,
      AssociatedForm: null,
      Status: '2',
      PlanStartDate: '2025-02-20 00:00:00',
      PlanEndDate: '2025-03-05 23:59:59',
      PlanQty: 10,
      RealQty: 0,
      GoodQty: 0,
      NoGoodQty: 0,
      ReportTime: null,
      ProductionSchedule:
        '[{"Sequence":"1","Process_Id":"1240","ProcessLine_Id":"1869","ProcessName":"压铸","ReportQty":"10/10","PercentNum":"100.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6794","WorkOrder_Id":"2509","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"10","PlanQty":"10","ReportTime":"2025-02-20T08:52:41","Status":"3","GoodQty":"10","type":"工序"},{"Sequence":"2","Process_Id":"1437","ProcessLine_Id":"1869","ProcessName":"刮毛刺","ReportQty":"10/10","PercentNum":"100.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6795","WorkOrder_Id":"2509","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"10","PlanQty":"10","ReportTime":"2025-03-03T09:40:03","Status":"3","GoodQty":"10","type":"工序"},{"Sequence":"3","Process_Id":"1439","ProcessLine_Id":"1869","ProcessName":"车","ReportQty":"10/10","PercentNum":"100.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6796","WorkOrder_Id":"2509","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"10","PlanQty":"10","ReportTime":"2025-03-03T09:40:12","Status":"3","GoodQty":"10","type":"工序"},{"Sequence":"4","Process_Id":"1440","ProcessLine_Id":"1869","ProcessName":"钻","ReportQty":"10/10","PercentNum":"100.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6797","WorkOrder_Id":"2509","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"10","PlanQty":"10","ReportTime":"2025-03-03T09:40:18","Status":"3","GoodQty":"10","type":"工序"},{"Sequence":"5","Process_Id":"1258","ProcessLine_Id":"1869","ProcessName":"铣","ReportQty":"10/10","PercentNum":"100.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6798","WorkOrder_Id":"2509","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"10","PlanQty":"10","ReportTime":"2025-03-03T09:40:28","Status":"3","GoodQty":"10","type":"工序"},{"Sequence":"6","Process_Id":"1252","ProcessLine_Id":"1869","ProcessName":"电镀","ReportQty":"0/10","PercentNum":"0.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6799","WorkOrder_Id":"2509","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"10","GoodQty":"0","type":"工序"},{"Sequence":"7","Process_Id":"1243","ProcessLine_Id":"1869","ProcessName":"氧化","ReportQty":"0/10","PercentNum":"0.00%","PlanEndDate":"2025-02-20T23:59:59","WorkOrderList_id":"6800","WorkOrder_Id":"2509","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"10","GoodQty":"0","type":"工序"}]',
      ActualStartDate: '2025-02-20 08:51:45',
      ActualEndDate: null,
      Remark: null,
      CreateDate: '2025-02-20 08:51:42',
      CreateID: 4363,
      Creator: '郑工',
      Modifier: null,
      ModifyDate: null,
      ModifyID: null,
      FromType: null,
      Priority: null,
      ProcessLine_Id: 1869,
      LastStaus: '1',
      Production_WorkOrderList: null,
      Production_WorkOrderMaterialList: null,
    },
    {
      DynamicProperties: {},
      FinishedProduct: null,
      WorkOrder_Id: 2508,
      WorkOrderCode: 'GD202502190001',
      Product_Id: 2115,
      ProductCode: 'CP20240724002',
      ProductName: '螺丝',
      ProductStandard: '2-56 (0.086-56)',
      Unit_Id: 1,
      AssociatedForm: null,
      Status: '2',
      PlanStartDate: '2025-02-19 00:00:00',
      PlanEndDate: '2025-03-05 23:59:59',
      PlanQty: 10000,
      RealQty: 0,
      GoodQty: 0,
      NoGoodQty: 0,
      ReportTime: null,
      ProductionSchedule:
        '[{"Sequence":"1","Process_Id":"1745","ProcessLine_Id":"1868","ProcessName":"螺丝-切削","ReportQty":"0/10000","PercentNum":"0.00%","PlanEndDate":"2025-03-05T23:59:59","WorkOrderList_id":"6791","WorkOrder_Id":"2508","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"10000","GoodQty":"0","type":"工序"},{"Sequence":"2","Process_Id":"1746","ProcessLine_Id":"1868","ProcessName":"螺丝-打磨","ReportQty":"0/10000","PercentNum":"0.00%","PlanEndDate":"2025-03-05T23:59:59","WorkOrderList_id":"6792","WorkOrder_Id":"2508","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"10000","GoodQty":"0","type":"工序"},{"Sequence":"3","Process_Id":"1747","ProcessLine_Id":"1868","ProcessName":"螺丝-抛光","ReportQty":"0/10000","PercentNum":"0.00%","PlanEndDate":"2025-03-05T23:59:59","WorkOrderList_id":"6793","WorkOrder_Id":"2508","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"10000","GoodQty":"0","type":"工序"}]',
      ActualStartDate: '2025-02-19 14:15:06',
      ActualEndDate: null,
      Remark: null,
      CreateDate: '2025-02-19 14:14:16',
      CreateID: 4365,
      Creator: 'contoso',
      Modifier: '郑工',
      ModifyDate: '2025-02-20 08:51:58',
      ModifyID: 4363,
      FromType: null,
      Priority: null,
      ProcessLine_Id: 1868,
      LastStaus: '1',
      Production_WorkOrderList: null,
      Production_WorkOrderMaterialList: null,
    },
    {
      DynamicProperties: {},
      FinishedProduct: null,
      WorkOrder_Id: 2507,
      WorkOrderCode: 'GD202502180001',
      Product_Id: 2426,
      ProductCode: 'CP20250218001',
      ProductName: 'G116ASD',
      ProductStandard: null,
      Unit_Id: 1032,
      AssociatedForm: null,
      Status: '3',
      PlanStartDate: '2025-02-18 00:00:00',
      PlanEndDate: '2025-02-18 23:59:59',
      PlanQty: 1000,
      RealQty: 1000,
      GoodQty: 1000,
      NoGoodQty: 0,
      ReportTime: null,
      ProductionSchedule:
        '[{"Sequence":"1","Process_Id":"1778","ProcessLine_Id":"1867","ProcessName":"工序1","ReportQty":"1000/1000","PercentNum":"100.00%","PlanEndDate":"2025-02-18T23:59:59","WorkOrderList_id":"6790","WorkOrder_Id":"2507","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"1000","PlanQty":"1000","ReportTime":"2025-02-18T14:54:16","Status":"3","GoodQty":"1000","type":"工序"}]',
      ActualStartDate: '2025-02-18 14:48:37',
      ActualEndDate: '2025-02-19 09:28:08',
      Remark: null,
      CreateDate: '2025-02-18 14:45:15',
      CreateID: 4365,
      Creator: 'contoso',
      Modifier: null,
      ModifyDate: null,
      ModifyID: null,
      FromType: null,
      Priority: 0,
      ProcessLine_Id: 1867,
      LastStaus: null,
      Production_WorkOrderList: null,
      Production_WorkOrderMaterialList: null,
    },
    {
      DynamicProperties: {},
      FinishedProduct: null,
      WorkOrder_Id: 2506,
      WorkOrderCode: 'GD202502140001',
      Product_Id: 2116,
      ProductCode: 'CP20240724003',
      ProductName: '压铸件',
      ProductStandard: '403',
      Unit_Id: 1,
      AssociatedForm: null,
      Status: '2',
      PlanStartDate: '2025-02-14 00:00:00',
      PlanEndDate: '2025-02-14 23:59:59',
      PlanQty: 1500,
      RealQty: 0,
      GoodQty: 0,
      NoGoodQty: 0,
      ReportTime: null,
      ProductionSchedule:
        '[{"Sequence":"1","Process_Id":"1240","ProcessLine_Id":"1865","ProcessName":"压铸","ReportQty":"1500/1500","PercentNum":"100.00%","PlanEndDate":"2025-02-14T23:59:59","WorkOrderList_id":"6783","WorkOrder_Id":"2506","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"1500","PlanQty":"1500","ReportTime":"2025-02-14T15:27:25","Status":"3","GoodQty":"1500","type":"工序"},{"Sequence":"2","Process_Id":"1437","ProcessLine_Id":"1865","ProcessName":"刮毛刺","ReportQty":"1/1500","PercentNum":"0.07%","PlanEndDate":"2025-02-14T23:59:59","WorkOrderList_id":"6784","WorkOrder_Id":"2506","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"1","PlanQty":"1500","ReportTime":"2025-02-19T09:28:52","Status":"2","GoodQty":"1","type":"工序"},{"Sequence":"3","Process_Id":"1439","ProcessLine_Id":"1865","ProcessName":"车","ReportQty":"150/1500","PercentNum":"10.00%","PlanEndDate":"2025-02-14T23:59:59","WorkOrderList_id":"6785","WorkOrder_Id":"2506","NoGoodQty":"2","NoApprovGoodQty":"150","ApprovGoodQty":"0","PlanQty":"1500","ReportTime":"2025-02-19T14:18:47","Status":"2","GoodQty":"150","type":"工序"},{"Sequence":"4","Process_Id":"1440","ProcessLine_Id":"1865","ProcessName":"钻","ReportQty":"0/1500","PercentNum":"0.00%","PlanEndDate":"2025-02-14T23:59:59","WorkOrderList_id":"6786","WorkOrder_Id":"2506","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"1500","GoodQty":"0","type":"工序"},{"Sequence":"5","Process_Id":"1258","ProcessLine_Id":"1865","ProcessName":"铣","ReportQty":"0/1500","PercentNum":"0.00%","PlanEndDate":"2025-02-14T23:59:59","WorkOrderList_id":"6787","WorkOrder_Id":"2506","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"1500","GoodQty":"0","type":"工序"},{"Sequence":"6","Process_Id":"1252","ProcessLine_Id":"1865","ProcessName":"电镀","ReportQty":"0/1500","PercentNum":"0.00%","PlanEndDate":"2025-02-14T23:59:59","WorkOrderList_id":"6788","WorkOrder_Id":"2506","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"1500","GoodQty":"0","type":"工序"},{"Sequence":"7","Process_Id":"1243","ProcessLine_Id":"1865","ProcessName":"氧化","ReportQty":"0/1500","PercentNum":"0.00%","PlanEndDate":"2025-02-14T23:59:59","WorkOrderList_id":"6789","WorkOrder_Id":"2506","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"1500","GoodQty":"0","type":"工序"}]',
      ActualStartDate: '2025-02-14 14:53:57',
      ActualEndDate: null,
      Remark: null,
      CreateDate: '2025-02-14 14:46:39',
      CreateID: 4365,
      Creator: 'contoso',
      Modifier: null,
      ModifyDate: null,
      ModifyID: null,
      FromType: null,
      Priority: 0,
      ProcessLine_Id: 1865,
      LastStaus: null,
      Production_WorkOrderList: null,
      Production_WorkOrderMaterialList: null,
    },
    {
      DynamicProperties: {},
      FinishedProduct: null,
      WorkOrder_Id: 2505,
      WorkOrderCode: 'GD202502130001',
      Product_Id: 2115,
      ProductCode: 'CP20240724002',
      ProductName: '螺丝',
      ProductStandard: '2-56 (0.086-56)',
      Unit_Id: 1,
      AssociatedForm: null,
      Status: '3',
      PlanStartDate: '2025-02-13 00:00:00',
      PlanEndDate: '2025-02-13 23:59:59',
      PlanQty: 5,
      RealQty: 5,
      GoodQty: 5,
      NoGoodQty: 0,
      ReportTime: null,
      ProductionSchedule:
        '[{"Sequence":"1","Process_Id":"1745","ProcessLine_Id":"1864","ProcessName":"螺丝-切削","ReportQty":"5/5","PercentNum":"100.00%","PlanEndDate":"2025-02-13T23:59:59","WorkOrderList_id":"6780","WorkOrder_Id":"2505","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"5","PlanQty":"5","ReportTime":"2025-02-13T15:29:23","Status":"3","GoodQty":"5","type":"工序"},{"Sequence":"2","Process_Id":"1746","ProcessLine_Id":"1864","ProcessName":"螺丝-打磨","ReportQty":"5/5","PercentNum":"100.00%","PlanEndDate":"2025-02-13T23:59:59","WorkOrderList_id":"6781","WorkOrder_Id":"2505","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"5","PlanQty":"5","ReportTime":"2025-02-13T15:29:35","Status":"3","GoodQty":"5","type":"工序"},{"Sequence":"3","Process_Id":"1747","ProcessLine_Id":"1864","ProcessName":"螺丝-抛光","ReportQty":"5/5","PercentNum":"100.00%","PlanEndDate":"2025-02-13T23:59:59","WorkOrderList_id":"6782","WorkOrder_Id":"2505","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"5","PlanQty":"5","ReportTime":"2025-02-13T15:29:48","Status":"3","GoodQty":"5","type":"工序"}]',
      ActualStartDate: '2025-02-13 15:15:54',
      ActualEndDate: '2025-02-13 15:29:48',
      Remark: null,
      CreateDate: '2025-02-13 15:15:46',
      CreateID: 4389,
      Creator: '单锡辉',
      Modifier: null,
      ModifyDate: null,
      ModifyID: null,
      FromType: null,
      Priority: null,
      ProcessLine_Id: 1864,
      LastStaus: '1',
      Production_WorkOrderList: null,
      Production_WorkOrderMaterialList: null,
    },
    {
      DynamicProperties: {},
      FinishedProduct: null,
      WorkOrder_Id: 2503,
      WorkOrderCode: 'GD202501160001',
      Product_Id: 2424,
      ProductCode: 'CP20250116001',
      ProductName: '螺丝',
      ProductStandard: '8mm',
      Unit_Id: 1032,
      AssociatedForm: null,
      Status: '3',
      PlanStartDate: '2025-01-16 00:00:00',
      PlanEndDate: '2025-01-16 23:59:59',
      PlanQty: 100,
      RealQty: 100,
      GoodQty: 100,
      NoGoodQty: 0,
      ReportTime: null,
      ProductionSchedule:
        '[{"Sequence":"1","Process_Id":"1745","ProcessLine_Id":"1862","ProcessName":"螺丝-切削","ReportQty":"100/100","PercentNum":"100.00%","PlanEndDate":"2025-01-16T23:59:59","WorkOrderList_id":"6773","WorkOrder_Id":"2503","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"100","PlanQty":"100","ReportTime":"2025-01-16T09:43:17","Status":"3","GoodQty":"100","type":"工序"},{"Sequence":"2","Process_Id":"1746","ProcessLine_Id":"1862","ProcessName":"螺丝-打磨","ReportQty":"100/100","PercentNum":"100.00%","PlanEndDate":"2025-01-16T23:59:59","WorkOrderList_id":"6774","WorkOrder_Id":"2503","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"100","PlanQty":"100","ReportTime":"2025-01-16T09:43:22","Status":"3","GoodQty":"100","type":"工序"},{"Sequence":"3","Process_Id":"1747","ProcessLine_Id":"1862","ProcessName":"螺丝-抛光","ReportQty":"100/100","PercentNum":"100.00%","PlanEndDate":"2025-01-16T23:59:59","WorkOrderList_id":"6775","WorkOrder_Id":"2503","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"100","PlanQty":"100","ReportTime":"2025-01-16T09:43:26","Status":"3","GoodQty":"100","type":"工序"},{"Sequence":"4","Process_Id":"1777","ProcessLine_Id":"1862","ProcessName":"成品测试","ReportQty":"0/100","PercentNum":"0.00%","PlanEndDate":"2025-01-16T23:59:59","WorkOrderList_id":"6779","WorkOrder_Id":"2503","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"100","GoodQty":"0","type":"工序"}]',
      ActualStartDate: '2025-01-16 09:42:13',
      ActualEndDate: '2025-01-16 09:43:27',
      Remark: null,
      CreateDate: '2025-01-16 09:40:30',
      CreateID: 4389,
      Creator: '单锡辉',
      Modifier: '袁总',
      ModifyDate: '2025-02-12 10:39:08',
      ModifyID: 4423,
      FromType: null,
      Priority: null,
      ProcessLine_Id: 1862,
      LastStaus: '1',
      Production_WorkOrderList: null,
      Production_WorkOrderMaterialList: null,
    },
    {
      DynamicProperties: {},
      FinishedProduct: null,
      WorkOrder_Id: 2501,
      WorkOrderCode: 'GD202412300002',
      Product_Id: 2115,
      ProductCode: 'CP20240724002',
      ProductName: '螺丝',
      ProductStandard: '2-56 (0.086-56)',
      Unit_Id: 1,
      AssociatedForm: null,
      Status: '2',
      PlanStartDate: '2024-12-30 00:00:00',
      PlanEndDate: '2025-12-24 23:59:59',
      PlanQty: 1,
      RealQty: 0,
      GoodQty: 0,
      NoGoodQty: 0,
      ReportTime: null,
      ProductionSchedule:
        '[{"Sequence":"1","Process_Id":"1745","ProcessLine_Id":"1859","ProcessName":"螺丝-切削","ReportQty":"0/1","PercentNum":"0.00%","PlanEndDate":"2025-12-24T23:59:59","WorkOrderList_id":"6759","WorkOrder_Id":"2501","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"1","Status":"2","GoodQty":"0","type":"工序"},{"Sequence":"2","Process_Id":"1746","ProcessLine_Id":"1859","ProcessName":"螺丝-打磨","ReportQty":"0/1","PercentNum":"0.00%","PlanEndDate":"2025-12-24T23:59:59","WorkOrderList_id":"6760","WorkOrder_Id":"2501","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"1","GoodQty":"0","type":"工序"},{"Sequence":"3","Process_Id":"1747","ProcessLine_Id":"1859","ProcessName":"螺丝-抛光","ReportQty":"0/1","PercentNum":"0.00%","PlanEndDate":"2025-12-24T23:59:59","WorkOrderList_id":"6761","WorkOrder_Id":"2501","NoGoodQty":"0","NoApprovGoodQty":"0","ApprovGoodQty":"0","PlanQty":"1","Status":"1","GoodQty":"0","type":"工序"}]',
      ActualStartDate: '2025-01-08 15:19:48',
      ActualEndDate: null,
      Remark: null,
      CreateDate: '2024-12-30 17:42:17',
      CreateID: 4389,
      Creator: '单锡辉',
      Modifier: '郑工',
      ModifyDate: '2025-02-11 10:52:53',
      ModifyID: 4363,
      FromType: null,
      Priority: 0,
      ProcessLine_Id: 1859,
      LastStaus: '2',
      Production_WorkOrderList: null,
      Production_WorkOrderMaterialList: null,
    },
  ])
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
