<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-12 22:27:51
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-12 23:15:46
 * @FilePath: \big-screen\src\pages\averageOutput.vue
 * @Description: 亩均产值
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup></script>

<template>
  <div class="average-output-box" flex wPE-100 hPE-100 flex-row-between flex-1>
    <div class="left" />
    <div class="right" w-416 hPE-100 pbPE-2 flex flex-column-between>
      <div flex-grow-0 flex-shrink-0 flex-basis-PE-29>
        <projectInvestment />
      </div>
      <div flex-grow-0 flex-shrink-0 flex-basis-PE-32>
        <employeeRecruitment />
      </div>
      <div flex-grow-0 flex-shrink-0 flex-basis-PE-35>
        <projectInvestmentTable />
      </div>
    </div>
  </div>
</template>
