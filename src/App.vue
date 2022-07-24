<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useAppStore } from './stores/index';
import { getToken } from './utils/auth';

const appStore = useAppStore();

onMounted(() => {
  if (getToken()) {
    appStore.getMenus();
  }
});
</script>

<template>
  <RouterView />
</template>

<style>
#app {
  height: 100vh;
}
</style>