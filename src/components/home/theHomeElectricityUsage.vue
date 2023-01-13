<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-13 17:26:25
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-13 17:43:45
 * @FilePath: \big-screen\src\components\home\theHomeElectricityUsage.vue
 * @Description: 工业用电情况
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->

<script lang="ts" setup>
import type { EChartsType } from 'echarts'
import type { HTMLAttributes } from 'vue'
import type { InterfaceModel } from '~/model'
const propObj = withDefaults(defineProps<{ homeElectricityUsageProp: InterfaceModel[] }>(), { homeElectricityUsageProp: () => [] })

/**
 * @description: 图标元素节点
 */
const homeElectricityUsageBox = ref<HTMLAttributes>()

/**
 * @description: 图表对象
 */
const homeElectricityUsageChart: EChartsType | null = null

// const
</script>

<template>
  <div ref="homeElectricityUsageBox" flex-1 class="home-electricity-usage-box" />
</template>
