<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const menuTitle = computed(() => {
  const suffix = route.params.title;
  return `${route.meta.title}`;
});
</script>

<template>
  <el-container class="is-vertical">
    <div v-show="route.path !== '/404'">
      <div class="menu-title" v-if="route.meta.hidden === true">
        {{ menuTitle }}
      </div>
      <div v-else class="menu-title">
        {{ route.meta.title }}
      </div>
    </div>
    <el-main>
      <router-view v-slot="{ Component }">
        <Transition name="fade-transform" mode="out-in">
          <component :is="Component"></component>
        </Transition>
      </router-view>
    </el-main>
  </el-container>
</template>

<style scoped>
.menu-title {
  font-size: 16px;
  line-height: 30px;
  margin: 20px 0 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.el-main {
  overflow-x: hidden;
  background: #fff;
  color: #333;
  margin: 15px 0 13px 18px;
  border-radius: 6px;
  padding:0 !important;
}
</style>
