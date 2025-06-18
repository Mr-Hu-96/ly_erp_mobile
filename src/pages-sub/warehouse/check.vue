<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '来料检验',
  },
}
</route>

<template>
  <view class="mb-15">
    <wd-form ref="formRef" :model="model">
      <wd-cell-group border>
        <wd-picker
          label="检验结果"
          placeholder="请选择检验结果"
          prop="status"
          v-model="model.status"
          :columns="dictData.warehouse_check_type"
          :rules="[{ required: true, message: '请选择检验结果' }]"
        />
        <wd-cell title="订单编号" :value="model.associationCode" />
        <wd-input label="条码扫描" v-model="scanCode" @confirm="onScanSuccess(scanCode)"></wd-input>
      </wd-cell-group>
    </wd-form>
    <wd-card v-for="item in detailList" :title="item.productName" :key="item.id">
      <!-- <template v-slot:title>
        
      </template> -->
      <wd-cell-group>
        <wd-cell title="产品编号" :value="item.productCode" />
        <wd-cell title="订单编号" :value="item.associationCode" />
        <wd-cell title="产品数量" :value="item.num" />

        <wd-input v-if="model.status == '不合格'" label="不合格原因" v-model="item.reason">
          <template #suffix>
            <wd-picker
              :columns="dictData.warehouse_check_reason"
              v-model="item.reason"
              use-default-slot
            >
              <wd-button size="small">选择</wd-button>
            </wd-picker>
          </template>
        </wd-input>
        <wd-picker
          v-if="model.status == '不合格'"
          :columns="dictData.warehouse_check_method"
          label="处理方式"
          v-model="item.processingMethod"
        />
      </wd-cell-group>
    </wd-card>
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
    <view class="fixed-bottom">
      <wd-button type="success" block @click="onSave">保存</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { scanCheckApi, addCheckApi } from '@/api/warehouse/check'
const { dictData } = useDictData([
  'warehouse_check_type',
  'warehouse_check_reason',
  'warehouse_check_method',
])
const model = reactive({
  status: '合格',
  associationCode: null,
  associationId: null,
})
const scanCode = ref('')

const detailList = ref([])

function onSave() {
  addCheckApi(detailList.value).then((res) => {
    uni.showToast({
      title: '添加成功',
      icon: 'success',
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 500)
  })
}
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
  onScanSuccess('448014953417984')
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
  if (id) {
    const exists = detailList.value.some((item) => item.id === Number(id))
    if (exists) {
      return uni.showToast({
        title: '已存在标签',
        icon: 'none',
      })
    }
  }
  scanCheckApi({
    labelId: id,
    associationCode: model.associationCode,
  }).then((res) => {
    const _data = { ...res.data }
    _data.labelId = id
    if (!model.associationCode) {
      model.associationCode = _data.associationCode
      model.associationId = _data.associationId
    }
    if (model.status === '不合格') {
      _data.reason = dictData.warehouse_check_reason[0].value
      _data.processingMethod = dictData.warehouse_check_method[0].value
    }
    detailList.value.unshift(_data)
  })
  scanCode.value = ''
}
</script>

<style lang="scss" scoped>
//
</style>
