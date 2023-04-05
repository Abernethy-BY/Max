<script lang="ts" setup>
// const value = ref(new Date())
const router = useRouter()
const jump = () => {
  router.push({ path: '/test/testaaa' })
}
</script>

<template>
  <div w-full h-full grid grid-rows-3 grid-cols-1 bg="#2ed573">
    <div bg="#353b48" grid row-span-2 grid-rows-1 grid-cols-4>
      <div bg="#487eb0" flex justify-center items-center>
        左1
      </div>
      <div col-span-2 />
      <div flex justify-center items-center bg="#9c88ff">
        <el-button type="primary" @click="jump">
          Primary
        </el-button>
      </div>
    </div>
    <div bg="#273c75" grid grid-rows-1 grid-cols-11>
      <div col-span-3 bg="#ff5e57" />
      <div col-span-4 bg="#ffdd59" />
      <div col-span-3 bg="#ef5777" />
    </div>
    <!-- <div bg="#f5f6fa" /> -->
  </div>

  <!--  <el-button type="warning">
    Warning
  </el-button>
  <el-calendar v-model="value" />
  aaa -->
</template>
