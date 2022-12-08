<script lang="ts" setup>
const propObj = withDefaults(defineProps<{ dialogTitle: string }>(), { dialogTitle: '' })

// 弹窗弹出标识
const dialogVisible = ref<boolean>(false)

const gridData = ref<any>([])

// 弹出弹窗方法
const openDialog = () => {
  dialogVisible.value = true
}

defineExpose({ openDialog })
</script>

<template>
  <div class="overview-page-dialog-box">
    <el-dialog v-model="dialogVisible" :show-close="false" :title="propObj.dialogTitle" width="60%" align-center>
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">
            This is a custom header!
          </h4>
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left">
              <CircleCloseFilled />
            </el-icon>
            Close
          </el-button>
        </div>
      </template>
      <el-table :data="gridData">
        <el-table-column property="date" label="Date" width="150" />
        <el-table-column property="name" label="Name" width="200" />
        <el-table-column property="address" label="Address" />
      </el-table>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.overview-page-dialog-box {
  // #00196B
  .my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
}
</style>
