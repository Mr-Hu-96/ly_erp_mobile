<template>
  <view class="">
    <wd-popup v-model="show" position="bottom" closable>
      <view class="text-center font-bold lh-10">报工</view>
      <view style="height: 80vh" class="bg-[#edf2fa]">
        <wd-form ref="form" :model="model" :rules="rules">
          <view class="pb-4">
            <wd-cell-group custom-class="group" title="基础信息" border>
              <wd-cell title="工单编号" :value="showData.workOrderCode" />
              <wd-cell title="工序名称" :value="showData.processName" />
              <wd-cell title="工序进度" :value="model.processProgress" />
              <wd-cell title="产品编号" :value="model.productCode" />
              <wd-cell title="产品名称" :value="model.productName" />
              <wd-cell title="产品规格" :value="model.productStandard" />
              <wd-cell title="计划数" :value="model.planQty" />
              <wd-cell title="已报工数" :value="model.alreadyQty" />
              <wd-cell title="报工数" :value="model.reportQty" />
            </wd-cell-group>
          </view>

          <wd-cell-group custom-class="group" title="报工数据" border>
            <wd-picker
              label="工序状态"
              placeholder="请选择工序状态"
              prop="processStatus"
              v-model="model.processStatus"
              :columns="['未开始', '执行中', '已完成']"
            />
            <wd-picker
              label="生产人员"
              placeholder="请选择生产人员"
              prop="productUser"
              v-model="model.productUser"
              :columns="dictData.sys_user"
            />
            <wd-cell title="良品数" title-width="33%" prop="goodQty">
              <view style="text-align: left">
                <wd-input-number
                  :min="0"
                  input-width="100px"
                  v-model="model.goodQty"
                  @change="updateGoodQty"
                />
              </view>
            </wd-cell>
            <wd-cell title="不良品数" :value="model.noGoodQty" />
            <wd-cell
              title="不良品项"
              title-width="33%"
              prop="noGoodQty"
              custom-value-class="cell-left"
            >
              <view style="text-align: left">
                <view>
                  <wd-tag
                    v-for="item in selectDefectItemList"
                    :key="item.id"
                    class="m-2px"
                    round
                    type="primary"
                  >
                    {{ item.defectItemName }}| {{ item.qty }}
                  </wd-tag>
                </view>
                <view style="text-align: right">
                  <wd-button size="small" @click="showDefect = true">设置</wd-button>
                </view>
              </view>
            </wd-cell>

            <!-- <wd-datetime-picker type="time" v-model="model.reportDurationHour" label="报工时长" /> -->
            <wd-picker
              label="单位"
              placeholder="请选择单位"
              prop="unit"
              v-model="model.unit"
              :columns="dictData.base_unit"
            />

            <WdDatetimePickerCustom
              prop="startDate"
              v-model="model.startDate"
              label="开始时间"
              format="YYYY-MM-DD HH:mm"
              @confirm="confirmDate"
            />
            <WdDatetimePickerCustom
              prop="endDate"
              v-model="model.endDate"
              label="结束时间"
              format="YYYY-MM-DD HH:mm"
              @confirm="confirmDate"
            />
            <wd-cell title="报工时长" :value="model.reportDurationHour" />
            <wd-cell title="标准效率" :value="standardProgress" />
            <wd-cell title="实际效率" :value="actualProgress" />
            <wd-cell title="达标率" :value="model.rateStandard" />
            <wd-picker
              label="计价方式"
              placeholder="请选择计价方式"
              prop="priceType"
              v-model="model.priceType"
              :columns="['计件', '计时']"
            />
            <wd-cell title="工资单价" :value="model.unitPrice" />
            <wd-cell title="预计工资" :value="model.guessPrice" />
            <wd-picker
              label="审批状态"
              placeholder="请选择审批状态"
              prop="approveStatus"
              v-model="model.approveStatus"
              :columns="['未审批', '已审批']"
            />
            <WdDatetimePickerCustom
              v-if="model.approveStatus === '已审批'"
              prop="approveDate"
              v-model="model.approveDate"
              label="审批时间"
            />
            <wd-cell
              v-if="model.approveStatus === '已审批'"
              title="审批人"
              :value="model.approveUser"
            />
          </wd-cell-group>
          <view class="footer p-2">
            <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
          </view>
        </wd-form>
      </view>
      <Defect v-model="showDefect" :defectList="defectList" @confirm="handleDefectConfirm" />
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import Defect from './Defect.vue'
import { selectDefectItemListApi } from '@/api/base/defect'
import { getMeritPayDataApi } from '@/api/base/meritPay'
import { formatDateFormat, toFixedWithLimit, parseTimeString, calcDate } from '@/utils/index'
import { useUserStore } from '@/store/user'
const { userData } = useUserStore()
const { dictData } = useDictData(['product_working', 'sys_user', 'base_unit'])
const $emits = defineEmits(['confirm'])
const show = defineModel<boolean>()
interface ProduceReport {
  actualProgress: number
  alreadyQty: number | null
  approveDate: string
  approveStatus: '已审批' | '未审批' | '审批中' | string // 根据实际状态值调整
  approveUser: string
  endDate: string
  goodQty: number
  guessPrice: number
  noGoodQty: number
  planQty: number
  priceType: '计件' | '计时' | string // 根据实际类型调整
  processId: number | string // 根据实际ID类型调整
  processProgress: string
  processStatus: '执行中' | '已完成' | '已取消' | string // 根据实际状态调整
  produceReportExt: Record<string, any> // 或定义更具体的扩展类型
  productCode: string
  productName: string
  productStandard: string
  productUser: string
  rateStandard: string
  reportDurationHour: string
  reportQty: number
  standard: string
  standardProgress: number
  startDate: string
  unit: string
  unitPrice: number
  workOrderDetailId: number | string // 根据实际ID类型调整
  workOrderId: string
}
const model = reactive<ProduceReport>({
  actualProgress: 0,
  alreadyQty: 0,
  approveDate: '',
  approveStatus: '已审批',
  approveUser: userData.user.nickName,
  goodQty: 0,
  guessPrice: 0,
  noGoodQty: 0,
  planQty: 0,
  priceType: '计件',
  processId: null,
  processProgress: '',
  processStatus: '',
  produceReportExt: {},
  productCode: '',
  productName: '',
  productStandard: '',
  productUser: '',
  rateStandard: '',
  reportDurationHour: '',
  reportQty: 0,
  standard: '',
  standardProgress: 0,
  startDate: formatDateFormat('YYYY-MM-DD hh:mm'),
  endDate: formatDateFormat('YYYY-MM-DD hh:mm'),
  unit: '',
  unitPrice: null,
  workOrderDetailId: null,
  workOrderId: '',
})

const rules: any = {}

const form = ref()

function handleSubmit() {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      $emits('confirm', {
        ...model,
        defectList: selectDefectItemList.value,
        standardProgressTime: standardProgressTime.value,
      })
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

defineExpose({
  initData,
})
const showData = ref({
  workOrderCode: '',
  processName: '',
})

const showDefect = ref(false)
const defectList = ref([])
const selectDefectItemList = ref([])
function handleDefectConfirm(data) {
  selectDefectItemList.value = data
  model.noGoodQty = data.reduce((acc, cur) => acc + cur.qty, 0)
  model.reportQty = toFixedWithLimit(model.goodQty) + toFixedWithLimit(model.noGoodQty)
  showDefect.value = false
}

const standardProgressTime = ref({
  hour: 0,
  min: 0,
  sec: 0,
})
const standardProgress = ref('')
function initData(processData, workOrderData) {
  const { id, processName, status, processId, goodQty, planQty } = processData
  model.processProgress = (goodQty || '0') + '/' + planQty
  model.planQty = toFixedWithLimit(planQty)
  if (processId) {
    selectDefectItemListApi({ processId }).then((res) => {
      defectList.value = res.data.map((item) => {
        item.qty = 0
        return item
      })
    })

    getMeritPayDataApi({ processId }).then((res) => {
      const { standardNumber, unitPrice, standardHour, standardMin, standardSec, priceType } =
        res.data
      standardProgressTime.value = {
        hour: standardHour || 0,
        min: standardMin || 0,
        sec: standardSec || 0,
      }
      model.unitPrice = unitPrice
      model.standardProgress = standardNumber
      standardProgress.value = standardNumber
        ? standardNumber +
          '/' +
          standardProgressTime.value.hour +
          '小时' +
          standardProgressTime.value.min +
          '分' +
          standardProgressTime.value.sec +
          '秒'
        : '未配置'
      model.priceType = priceType
      calcGuessPrice()
    })
  }
  const { productCode, productName, productStandard, workOrderCode } = workOrderData
  model.workOrderId = workOrderData.id
  model.processId = processId
  model.workOrderDetailId = id
  model.processStatus = status
  model.productCode = productCode
  model.productName = productName
  model.productStandard = productStandard

  showData.value = {
    workOrderCode,
    processName,
  }
}

function calcGuessPrice() {
  if (model.priceType === '计件') {
    model.guessPrice = toFixedWithLimit(model.unitPrice) * toFixedWithLimit(model.standardProgress)
  } else {
    const { hours, minutes } = parseTimeString(model.reportDurationHour)
    model.guessPrice = toFixedWithLimit(model.unitPrice * (hours || 0 + (minutes || 0) / 60))
  }
  calcProgress(model.goodQty, model.reportDurationHour)
}

function updateGoodQty() {
  model.reportQty = toFixedWithLimit(model.goodQty) + toFixedWithLimit(model.noGoodQty)
  calcGuessPrice()
}

function confirmDate() {
  model.reportDurationHour = calcDate(model.startDate, model.endDate)
  calcGuessPrice()
}
const actualProgress = ref('')
function calcProgress(goodQty, reportDurationHour) {
  if (goodQty && reportDurationHour) {
    const calcSeconds =
      standardProgressTime.value.hour * 3600 +
      standardProgressTime.value.min * 60 +
      standardProgressTime.value.sec * 1
    const { hours, minutes } = parseTimeString(reportDurationHour)
    model.actualProgress = calculateAmountForSeconds(goodQty || 0, hours, minutes, 0, calcSeconds)
    actualProgress.value =
      model.actualProgress +
      '/' +
      standardProgressTime.value.hour +
      '小时' +
      standardProgressTime.value.min +
      '分' +
      standardProgressTime.value.sec +
      '秒'
    model.rateStandard =
      toFixedWithLimit((model.actualProgress / model.standardProgress) * 100) + '%'
  } else {
    actualProgress.value = '报工时长或者报工数为0，无法计算效率'
  }
}

// 计算总数与时分秒
function calculateAmountForSeconds(totalAmount, hours, minutes, seconds, calcSeconds) {
  // 将传入的时间（小时、分钟、秒）转换为总秒数
  const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds
  console.log(totalTimeInSeconds, totalAmount, hours, minutes, seconds, calcSeconds)
  // 如果总时间为 0，避免除以 0 的错误
  if (totalTimeInSeconds === 0) {
    return 0
  }

  // 每秒的数量
  const amountPerSecond = totalAmount / totalTimeInSeconds

  // 计算在指定秒数内对应的数量
  const result = amountPerSecond * calcSeconds

  return toFixedWithLimit(result)
}
</script>

<style lang="scss" scoped>
//
</style>
