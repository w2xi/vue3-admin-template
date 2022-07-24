<script setup>
import { ref } from 'vue';
import { useAppStore } from '../stores';
import { useRoute } from 'vue-router';

const appStore = useAppStore();
const route = useRoute();
const menus = ref(appStore.menus);
const isCollapse = ref(false);

</script>

<template>
  <el-aside class="sidebar-container" :class="{ '--collapse': isCollapse }">
    <el-menu
      background-color="#304156"
      text-color="#bfcbd9"
      :default-active="route.path"
      :collapse="isCollapse"
      :collapse-transition="false"
      unique-opened
      router
    >
      <template v-for="(item, index) of menus">
        <template v-if="item.children && item.children.length">
          <el-sub-menu
            :index="index + ''"
            :key="index"
          >
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="(child, index) of item.children"
              :index="child.path"
              :key="index"
            >
              <i :class="child.icon"></i>
              <span>{{ child.name }}</span>
            </el-menu-item>
          </el-sub-menu>
        </template>
      </template>
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
