<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '出库单编辑',
  },
}
</route>

<template>
  <view class="mb-15">
    <wd-form ref="formRef" :model="model">
      <wd-cell-group border>
        <wd-picker
          label="出库类型"
          placeholder="请选择出库类型"
          prop="warehouseType"
          v-model="model.warehouseType"
          :columns="dictData.out_warehouse_status"
          :rules="[{ required: true, message: '请选择出库类型' }]"
        />
        <wd-input
          v-if="model.warehouseType === '生产领料'"
          label="出库工单"
          prop="workOrderCode"
          v-model="model.workOrderCode"
        >
          <template #suffix>
            <wd-button size="small" type="success" @click="addProduct">添加</wd-button>
          </template>
        </wd-input>
        <wd-input
          v-else-if="model.warehouseType === '销售出库'"
          label="销售订单"
          prop="salesOrderCode"
          v-model="model.salesOrderCode"
        >
          <template #suffix>
            <wd-button size="small" type="success" @click="addSales">添加</wd-button>
          </template>
        </wd-input>

        <!-- <wd-calendar
          label="出库时间"
          placeholder="请选择出库时间"
          prop="warehouseDate"
          v-model="model.warehouseDate"
        /> -->
        <wd-textarea
          label="备注"
          type="textarea"
          v-model="model.remark"
          auto-height
          placeholder="请输入备注信息"
          clearable
          prop="remark"
        />
        <wd-input label="条码扫描" v-model="scanCode" @confirm="onScanSuccess(scanCode)">
          <template #suffix>
            <wd-button size="small" type="success" @click="onScanSuccess(scanCode)">添加</wd-button>
          </template>
        </wd-input>
      </wd-cell-group>
    </wd-form>
    <wd-card v-for="item in detailList" :title="item.productName" :key="item.id">
      <!-- <template v-slot:title>
        
      </template> -->
      <wd-cell-group>
        <wd-cell title="产品编号" :value="item.productCode" />
        <wd-cell title="仓库" :value="item.wareName" />
        <wd-cell title="库位" :value="item.positionName" />
        <wd-cell title="出库数量" :value="item.outStoreQty" />
      </wd-cell-group>
    </wd-card>

    <wd-popup v-model="showDetail" position="bottom" closable>
      <view class="text-center font-bold lh-10">明细设置</view>
      <wd-form ref="detailFormRef" :model="detail">
        <wd-cell-group border>
          <!-- <wd-input label="产品名称" disabled v-model="detail.productName">
            <template #suffix>
              <wd-button size="small" type="success" @click="addProduct">添加</wd-button>
            </template>
          </wd-input> -->
          <wd-cell title="产品名称" :value="detail.productName" />
          <wd-cell title="产品编号" :value="detail.productCode" />
          <wd-input label="出库数量" disabled v-model="detail.outStoreQty" />
          <wd-picker
            label="仓库"
            placeholder="请选择仓库"
            prop="wareCode"
            v-model="detail.wareCode"
            :columns="WareList"
            :rules="[{ required: true, message: '请选择仓库' }]"
            @confirm="confirmWarehouse"
          />
          <wd-picker
            label="库位"
            placeholder="请选择库位"
            prop="positionCode"
            v-model="detail.positionCode"
            :columns="positionList"
            :rules="[{ required: true, message: '请选择库位' }]"
            @confirm="confirmPosition"
          />
        </wd-cell-group>
        <wd-button class="m-2" @click="saveDetail" block>确认</wd-button>
      </wd-form>
    </wd-popup>
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
    <SelectWordOrder v-model="showProduct" @select="addProductData" />
    <SelectSalesOrder v-model="showSales" @select="addSalesData" />
    <view class="fixed-bottom">
      <wd-button type="success" block @click="onSave">保存</wd-button>
      <!-- <view class="flex justify-center">
        <wd-button @click="addDetail">添加</wd-button>
        <wd-button type="success" block @click="onSave">保存</wd-button>
      </view> -->
    </view>
    <!-- #ifdef H5 -->
    <view id="reader" style="width: 300px; margin: 20px auto"></view>
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode'
import { getRecordCheckApi } from '@/api/record/record'
import { getWareHouseListApi } from '@/api/base/warehouse'
import { scanWarehouseApi } from '@/api/warehouse/outWarehouse'
import { getPositionListApi } from '@/api/base/position'
import SelectWordOrder from '@/components/WordOrder/SelectWordOrder.vue'
import SelectSalesOrder from '@/components/SalesOrder/SelectSalesOrder.vue'
const model = reactive({
  warehouseType: '',
  warehouseDate: null,
  remark: '',
  supplier: '',
  workOrderId: '',
  workOrderCode: '',
  salesOrderId: '',
  salesOrderCode: '',
})

const { dictData } = useDictData(['base_supplier', 'out_warehouse_status'])
const detailList = ref([])

const detail = reactive({
  productName: '',
  productCode: '',
  productStandard: '',
  outStoreQty: '',
  wareCode: '',
  bsId: '',
  recordId: '',
  positionCode: '',
  positionName: '',
  productId: '',
  unit: '',
  wareName: '',
})
const buyAssociationId = ref('')
const WareList = ref([])
getWareHouseListApi({}).then((res) => {
  WareList.value = res.data.map((item) => {
    return {
      label: item.wareName,
      value: item.wareCode,
    }
  })
})
const showDetail = ref(false)
const detailType = ref<'add' | 'edit'>('add')
const addDetail = () => {
  detailType.value = 'add'
  showDetail.value = true
}
function onSave() {
  const params = {
    remark: model.remark,
    supplier: model.supplier,
    wareWarehouseDetailList: detailList.value,
    ext: {},
    outWarehouseType: model.warehouseType,
  }
  scanWarehouseApi(params).then((res) => {
    uni.showToast({
      title: '出库成功',
      icon: 'success',
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 500)
  })
}

// function onScanSuccess(decodedText, decodedResult) {
//   // handle the scanned code as you like, for example:
//   console.log(`Code matched = ${decodedText}`, decodedResult)
// }
function scanClick() {
  if (!model.warehouseType) {
    uni.showToast({
      title: '请选择出库类型',
      icon: 'none',
    })
    return
  }
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
  onScanSuccess('448015561624576')
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
}

function onScanSuccess(id) {
  // any error handling
  let _associationCode = ''
  if (model.warehouseType === '生产领料') {
    _associationCode = model.workOrderId
  } else if (model.warehouseType === '销售出库') {
    _associationCode = model.salesOrderId
  }
  getRecordCheckApi({
    id,
    source: model.warehouseType,
    type: '出库',
    associationCode: _associationCode,
  }).then((res) => {
    const { productName, productCode, num, id, productId, unit, supplier, associationId } = res.data
    let _bsId = associationId
    if (model.warehouseType === '生产领料') {
      _bsId = model.workOrderId
    } else if (model.warehouseType === '销售出库') {
      _bsId = model.salesOrderId
    }
    buyAssociationId.value = associationId
    model.supplier = supplier
    detail.productName = productName
    detail.productCode = productCode
    detail.outStoreQty = num
    detail.recordId = id
    detail.bsId = _bsId
    detail.productId = productId
    detail.unit = unit
    showDetail.value = true
  })
  if (scanCode.value) {
    scanCode.value = ''
  }
}

const showProduct = ref(false)
function addProduct() {
  showProduct.value = true
}
function addProductData(item) {
  console.log(item)

  const { id, workOrderCode } = item
  model.workOrderId = id
  model.workOrderCode = workOrderCode || ''
  showProduct.value = false
}
const positionList = ref([])
function confirmWarehouse(e) {
  detail.wareName = e?.selectedItems?.label
  getPositionListApi({ wareCode: e.value }).then((res) => {
    positionList.value = res.data.map((item, index) => {
      if (index === 0) {
        detail.positionCode = item.positionCode
        detail.positionName = item.positionName
      }
      return {
        label: item.positionName,
        value: item.positionCode,
      }
    })
  })
}

function confirmPosition(e) {
  detail.positionName = e?.selectedItems?.label
}

const detailFormRef = ref()
function saveDetail() {
  detailFormRef.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        detailList.value.unshift(JSON.parse(JSON.stringify(detail)))
        showDetail.value = false
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

const showSales = ref(false)
function addSales() {
  showSales.value = true
}
function addSalesData(item) {
  const { id, salesOrderCode } = item
  model.salesOrderId = id
  model.salesOrderCode = salesOrderCode || ''
  showSales.value = false
}

const scanCode = ref('')
</script>

<style lang="scss" scoped>
//
</style>
