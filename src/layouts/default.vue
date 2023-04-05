<template>
  <div w-full h-full flex flex-col>
    <common-the-header basis-60px />
    <div relative flex-1>
      <common-the-menu />
      <router-view />
    </div>
  </div>
</template>
