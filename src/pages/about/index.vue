<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '菜单',
  },
}
</route>

<template>
  <view class="">
    <wd-card title="快捷入口">
      <wd-grid :clickable="true" :column="3">
        <wd-grid-item use-icon-slot url="/pages-sub/supplementTask/list" text="产量统计">
          <template #icon>
            <image class="w-24px h-24px" src="/static/images/count.png" />
          </template>
        </wd-grid-item>
        <wd-grid-item use-icon-slot url="/pages-sub/supplement/list" text="不良分布">
          <template #icon>
            <image class="w-24px h-24px" src="/static/images/fenBu.png" />
          </template>
        </wd-grid-item>
        <wd-grid-item use-icon-slot url="/pages-sub/supplementAbnormal/list" text="不良汇总">
          <template #icon>
            <image class="w-24px h-24px" src="/static/images/total.png" />
          </template>
        </wd-grid-item>
      </wd-grid>
    </wd-card>
    <wd-card title="业务功能">
      <wd-grid :clickable="true" :column="3">
        <wd-grid-item use-icon-slot url="/pages-sub/supplementTask/list" text="出库单">
          <template #icon>
            <image class="w-24px h-24px" src="/static/images/out.png" />
          </template>
        </wd-grid-item>
        <wd-grid-item use-icon-slot url="/pages-sub/supplement/list" text="入库单">
          <template #icon>
            <image class="w-24px h-24px" src="/static/images/in.png" />
          </template>
        </wd-grid-item>
        <wd-grid-item use-icon-slot url="/pages-sub/supplementAbnormal/list" text="点检保养单">
          <template #icon>
            <image class="w-24px h-24px" src="/static/images/total.png" />
          </template>
        </wd-grid-item>
        <wd-grid-item use-icon-slot url="/pages-sub/supplementAbnormal/list" text="不良品项">
          <template #icon>
            <image class="w-24px h-24px" src="/static/images/fenBu.png" />
          </template>
        </wd-grid-item>
        <wd-grid-item use-icon-slot url="/pages-sub/supplementAbnormal/list" text="报工单">
          <template #icon>
            <image class="w-24px h-24px" src="/static/images/count.png" />
          </template>
        </wd-grid-item>
      </wd-grid>
    </wd-card>
    <wd-card title="报表看板">
      <wd-grid :clickable="true" :column="3">
        <wd-grid-item use-icon-slot url="/pages-sub/supplementTask/list" text="库存余额">
          <template #icon>
            <image class="w-24px h-24px" src="/static/images/count.png" />
          </template>
        </wd-grid-item>
        <wd-grid-item use-icon-slot url="/pages-sub/supplement/list" text="数据看板">
          <template #icon>
            <image class="w-24px h-24px" src="/static/images/fenBu.png" />
          </template>
        </wd-grid-item>
      </wd-grid>
    </wd-card>
  </view>
</template>

<script lang="ts" setup>
//
</script>

<style lang="scss" scoped>
//
</style>
