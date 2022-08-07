<script setup>
import { ref, computed } from 'vue';
import { useAppStore } from '../stores';
import { useRoute, useRouter } from 'vue-router';
import SideBarItem from './components/SideBarItem.vue';

const router = useRouter();
const appStore = useAppStore();
const menus = ref(appStore.menus);
const isCollapse = ref(false);

const activeRoute = computed(() => {
  return router.currentRoute.value.fullPath;
});

</script>

<template>
  <el-aside class="sidebar-container" :class="{ '--collapse': isCollapse }">
    <el-menu
      background-color="#304156"
      text-color="#bfcbd9"
      :default-active="activeRoute"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
    >
      <SideBarItem 
        v-for="item of menus" 
        :item="item"
        :key="item.path"
      />
    </el-menu>
    <div class="toggle-sidebar" @click="isCollapse = !isCollapse">
      <el-icon v-if="isCollapse"><DArrowRight /></el-icon>
      <el-icon v-else><DArrowLeft /></el-icon>
    </div>
  </el-aside>
</template>

<style lang="scss" scoped>
$sideBarWidth: 200px;
$sideBarCollapseWidth: 64px;
$transitionTime: .28s;

.sidebar-container {
  position: relative;
  width: $sideBarWidth !important;
  height: 100%;
  transition: width $transitionTime;
  overflow: hidden;
}

.sidebar-container.--collapse {
  width: $sideBarCollapseWidth !important;
  transition-duration: $transitionTime;
}

.el-menu {
  border: none;
  height: 100%;
  width: 100%;
}

.el-icon {
  font-size: 18px;
  font-weight: bold;
  color: #bfcbd9;
}

.iconfont {
  margin-right: 5px;
}

.toggle-sidebar {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 45px;
  line-height: 45px;
  text-align: center;
  background: #30415621;
  border-top: 1px solid rgba(0,0,0,.2);
  width: 100%;
  cursor: pointer;
}
.toggle-sidebar:hover {
  background: #242c3645;
}
</style>
