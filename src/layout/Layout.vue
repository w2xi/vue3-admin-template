<script setup>
import TheHeader from './TheHeader.vue';
import TheAside from './TheAside.vue';
import TheMain from './TheMain.vue';
</script>

<template>
  <el-container>
    <TheAside />
    <el-container class="is-vertical">
      <TheHeader />
      <TheMain />
    </el-container>
  </el-container>
</template>

<style scoped>
.el-container {
  height: 100%;
}
</style>
