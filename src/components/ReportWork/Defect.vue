<template>
  <view class="">
    <wd-popup v-model="show" position="bottom" closable>
      <view class="text-center font-bold lh-10">不良品设置</view>
      <view style="min-height: 400rpx; max-height: 80vh">
        <wd-cell-group>
          <wd-cell
            v-for="item in defectList"
            :key="item.id"
            :title="item.defectItemName"
            title-width="33%"
          >
            <view style="text-align: left">
              <wd-input-number :min="0" v-model="item.qty" />
            </view>
          </wd-cell>
        </wd-cell-group>
        <view class="absolute bottom-2 w-full">
          <wd-button class="" type="primary" block @click="onSave">保存</wd-button>
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
const show = defineModel<boolean>()

const props = defineProps({
  defectList: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
})
const $emits = defineEmits(['confirm'])
function onSave() {
  $emits(
    'confirm',
    props.defectList.filter((item) => item.qty),
  )
}
</script>

<style lang="scss" scoped>
//
</style>
