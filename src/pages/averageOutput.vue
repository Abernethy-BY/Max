<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-09-12 22:27:51
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-09-20 20:02:33
 * @FilePath: \big-screen\src\pages\averageOutput.vue
 * @Description: 亩均产值
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
const userInfo = useUserStore()

const projectInvestmentData = ref([])
const employeeRecruitmentData = ref([])
const projectInvestmentTableData = ref([])
const industrialProjectsData = ref([])
const averagePerAcreIndustryData = ref([])
// const averageOutputLineData = ref([])
const getXmtz = async () => {
  const submitId = new Date().getTime()
  const param = {
    submitid: submitId,
    usercode: userInfo.userCode,
    sign: hexMD5(submitId + userInfo.userCode + userInfo.token),
    type: '',
  }
  const res: any = await mjcz(param)
  projectInvestmentData.value = res?.filter(e => e?.['位置'] === '亩均项目统计')
  employeeRecruitmentData.value = res?.filter(e => e?.['位置'] === '员工招聘')
  projectInvestmentTableData.value = res?.filter(e => e?.['位置'] === '右下')
  industrialProjectsData.value = res?.filter(e => e?.['位置'] === '工业亩均')
  averagePerAcreIndustryData.value = res?.filter(e => e?.['位置'] === '产业亩均')
  // averageOutputLineData.value = res?.filter(e => e?.['位置'] === '月数据趋势')
}
getXmtz()

onUnmounted(() => {
  const menuInfo = menuStore()
  menuInfo.menuIndex = 0
})
</script>

<template>
  <div class="average-output-box" flex wPE-100 hPE-100 flex-row-between flex-1>
    <div flex flex-column-between flex-grow-0 flex-shrink-0 flex-basis-PE-75 pbPE-3>
      <!-- <div flex-grow-0 flex-shrink-0 flex-basis-PE-30>
        <averageOutputSelect
          :industrial-projects-prop="industrialProjectsData"
          :average-per-acre-industry-prop="averagePerAcreIndustryData"
        />
      </div> -->
      <div flex-grow-0 flex-shrink-0 flex-basis-PE-45>
        <averageOutputLine title="工业项目" />
      </div>
      <div flex-grow-0 flex-shrink-0 flex-basis-PE-45>
        <averageOutputLine title="产业项目" />
      </div>
    </div>
    <div w-416 hPE-100 pbPE-2 flex flex-column-between>
      <div flex-grow-0 flex-shrink-0 flex-basis-PE-29>
        <projectInvestment :project-investment-prop="projectInvestmentData" />
      </div>
      <div flex-grow-0 flex-shrink-0 flex-basis-PE-35>
        <employeeRecruitment :employee-recruitment-prop="employeeRecruitmentData" />
      </div>
      <div flex-grow-0 flex-shrink-0 flex-basis-PE-30>
        <projectInvestmentTable :project-investment-table-prop="projectInvestmentTableData" />
      </div>
    </div>
  </div>
</template>
