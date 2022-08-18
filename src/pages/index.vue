<!--
 * @Author: By
 * @Date: 2022-08-13 16:36:33
 * @LastEditTime: 2022-08-18 22:28:02
 * @LastEditors: By
 * @Description:
 * @FilePath: \big-screen-vue3\src\pages\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->

<script lang="ts" setup>
const industryRankingData = ref([])
const constructionProgressData = ref([])
const progressData = ref([])
</script>

<template>
  <div class="pandect-wrap">
    <div class="pandect-left">
      <div class="top10">
        <industryRanking :industry-ranking-prop="industryRankingData" />
      </div>
      <div class="Income">
        <income />
      </div>
    </div>
    <div class="pandect-center">
      <pandectMap />
    </div>
    <div class="pandect-right">
      <constructionProgress :construction-progress-prop="constructionProgressData" :progress-prop="progressData" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: screen
</route>

<style scoped lang="scss">
.pandect-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .pandect-left {
    width: 25%;
    height: 100%;

    .top10 {
      width: 100%;
      height: 61%;
    }

    .Income {
      margin-top: 30px;
      width: 468px;
      height: 253px;
    }
  }

  .pandect-center {
    width: 711px;
    height: 785px;
  }

  .pandect-right {
    width: 510px;
    height: 820px;
  }
}
</style>
