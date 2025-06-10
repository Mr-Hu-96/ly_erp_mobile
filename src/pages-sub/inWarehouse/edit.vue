<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '入库单编辑',
  },
}
</route>

<template>
  <view class="mb-15">
    <wd-form ref="formRef" :model="model">
      <wd-cell-group border>
        <wd-picker
          label="入库类型"
          placeholder="请选择入库类型"
          prop="warehouseType"
          v-model="model.warehouseType"
          :columns="dictData.sys_warehouse_status"
          :rules="[{ required: true, message: '请选择入库类型' }]"
        />
        <wd-picker
          v-if="model.warehouseType === '采购入库'"
          disabled
          label="供应商"
          placeholder="请选择供应商"
          prop="supplier"
          v-model="model.supplier"
          :columns="dictData.base_supplier"
        />
        <!-- <wd-calendar
          label="入库时间"
          placeholder="请选择入库时间"
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
      </wd-cell-group>
    </wd-form>
    <wd-card v-for="item in detailList" :title="item.productName" :key="item.id">
      <!-- <template v-slot:title>
        
      </template> -->
      <wd-cell-group>
        <wd-cell title="产品编号" :value="item.productName" />
        <wd-cell title="入库数量" :value="item.inStoreQty" />
        <wd-cell title="当前库存数量" :value="item.inStoreQty" />
      </wd-cell-group>
    </wd-card>

    <wd-popup v-model="showDetail" position="bottom" closable>
      <view class="text-center font-bold lh-10">明细设置</view>
      <wd-form ref="detailFormRef" :model="detail">
        <wd-cell-group border>
          <wd-input label="产品名称" disabled v-model="detail.productName">
            <!-- <template #suffix>
              <wd-button size="small" type="success" @click="addProduct">添加</wd-button>
            </template> -->
          </wd-input>
          <wd-input label="入库数量" disabled v-model="detail.inStoreQty" />
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
    <SelectProduct v-model="showProduct" @select="addProductData" />
    <view class="fixed-bottom">
      <wd-button type="success" block @click="onSave">保存</wd-button>
      <!-- <view class="flex justify-center">
        <wd-button @click="addDetail">添加</wd-button>
        <wd-button type="success" block @click="onSave">保存</wd-button>
      </view> -->
    </view>
  </view>
</template>

<script lang="ts" setup>
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode'
import { getRecordCheckApi } from '@/api/record/record'
import { getWareHouseListApi } from '@/api/base/warehouse'
import { scanWarehouseApi } from '@/api/warehouse/inWarehouse'
import { getPositionListApi } from '@/api/base/position'
import SelectProduct from '@/components/Product/SelectProduct.vue'
const model = reactive({
  warehouseType: '',
  warehouseDate: null,
  remark: '',
  supplier: '',
})

const { dictData } = useDictData(['base_supplier', 'sys_warehouse_status'])
const detailList = ref([])

const detail = reactive({
  productName: '',
  productCode: '',
  productStandard: '',
  inStoreQty: '',
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
    warehouseType: model.warehouseType,
  }
  scanWarehouseApi(params).then((res) => {
    uni.showToast({
      title: '入库成功',
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
      title: '请选择入库类型',
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
  onScanSuccess('447884658258688')
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
  getRecordCheckApi({
    id,
    source: model.warehouseType,
    type: '入库',
    associationCode: buyAssociationId.value,
  }).then((res) => {
    const { productName, productCode, num, id, productId, unit, supplier, associationId } = res.data
    buyAssociationId.value = associationId
    model.supplier = supplier
    detail.productName = productName
    detail.productCode = productCode
    detail.inStoreQty = num
    detail.recordId = id
    detail.bsId = associationId
    detail.productId = productId
    detail.unit = unit
    showDetail.value = true
  })
}

const showProduct = ref(false)
function addProduct() {
  showProduct.value = true
}
function addProductData(item) {
  detail.productName = item.productName
  detail.productCode = item.productCode
  detail.productStandard = item.productStandard
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
        detailList.value.push(detail)
        showDetail.value = false
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>

<style lang="scss" scoped>
//
</style>
