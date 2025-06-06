<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '入库单编辑',
  },
}
</route>

<template>
  <view class="">
    <wd-form ref="formRef" :model="model">
      <wd-cell-group border>
        <wd-input
          label="入库单号"
          v-model="model.inWarehouseNo"
          prop="inWarehouseNo"
          placeholder="请输入入库单号"
        />
        <wd-picker
          label="供应商"
          placeholder="请选择供应商"
          prop="promotion"
          v-model="model.promotion"
          :columns="promotionlist"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <wd-picker
          label="仓库"
          placeholder="请选择仓库"
          prop="promotion"
          v-model="model.promotion"
          :columns="promotionlist"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <wd-picker
          label="库位"
          placeholder="请选择库位"
          prop="promotion"
          v-model="model.promotion"
          :columns="promotionlist"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <wd-picker
          label="入库类型"
          placeholder="请选择入库类型"
          prop="promotion"
          v-model="model.promotion"
          :columns="promotionlist"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <wd-calendar
          label="入库时间"
          placeholder="请选择入库时间"
          prop="date"
          v-model="model.date"
        />
        <wd-textarea
          label="备注"
          type="textarea"
          v-model="model.remark"
          auto-height
          placeholder="请输入备注信息"
          clearable
          prop="remark"
        />
      </wd-cell-group>
    </wd-form>
    <wd-card v-for="item in detailList" :title="item.productName" :key="item.id">
      <!-- <template v-slot:title>
        
      </template> -->
      <wd-cell-group>
        <wd-cell title="产品编号" :value="item.productName" />
        <wd-cell title="入库数量" :value="item.inventoryQty" />
      </wd-cell-group>
    </wd-card>
  </view>
</template>

<script lang="ts" setup>
const model = reactive({
  inWarehouseNo: '',
  warehouseName: '',
  promotion: '',
  remark: '',
  date: null,
})
const promotionlist = [
  {
    label: '促销名称',
    value: 'promotionName',
  },
  {
    label: '促销金额',
    value: 'promotionAmount',
  },
  {
    label: '促销类型',
    value: 'promotionType',
  },
]
const detailList = ref([
  {
    productName: '测试商品',
    productCode: 'CP202410008',
    id: 442614534739200,
    inventoryQty: '123',
  },
  {
    productName: '测试商品2',
    productCode: 'CP202410008',
    id: 4426145347392002,
    inventoryQty: '1232',
  },
])
</script>

<style lang="scss" scoped>
//
</style>
