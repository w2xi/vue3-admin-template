<script setup>
import { ref, reactive, computed, watch } from 'vue';
import router from '../../router';
import { useAppStore } from '../../stores';
import { useTabBarStore } from '../../stores/tab-bar';

const appStore = useAppStore();
const tabBarStore = useTabBarStore();

const visitedRoutes = computed(() => tabBarStore.visitedRoutes);
const routes = computed(() => appStore.routes);

const activedTab = ref('');

const state = reactive({
  affixtabs: [],
  visible: false,
});

// watch 当前路由的变化
watch(
  () => router.currentRoute.value, 
  ({ path }) => {
    initTabs();
    addTabs();
    const result = visitedRoutes.value.find((item) => item.path === path);
    result && (activedTab.value = path);
  },
  { immediate: true }
);

function filterFixedTabs(routes) {
  let tabs = [];
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      tabs.push({
        fullPath: route.path,
        path: route.path,
        name: route.name,
        meta: { ...route.meta },
      });
    }
    if (route.children) {
      const tempTabs = filterFixedTabs(route.children, route.path);
      if (tempTabs.length >= 1) {
        tabs = [...tabs, ...tempTabs];
      }
    }
  });
  return tabs;
}

function initTabs() {
  let affixtabs = (state.affixtabs = filterFixedTabs(routes.value));
  for (const tag of affixtabs) {
    if (tag.name) {
      tabBarStore.addVisitedRoute(tag);
    }
  }
}

function addTabs() {
  tabBarStore.addVisitedRoute(router.currentRoute.value);
}

function handleTabRemove(path) {
  const removedRoute = tabBarStore.removeVisitedRoute(path);

  if (removedRoute) {
    router.push(visitedRoutes.value.at(-1));
  } else {
    router.push('/');
  }
}

function handleTabClick(tab) {
  const route = visitedRoutes.value[tab.index];

  if (router.currentRoute.value.path !== route.path) {
    router.push({
      path: route.path,
      query: route.query,
      fullPath: route.fullPath,
    });
  }
}

function isAffix(tag) {
  return tag.meta && tag.meta.affix;
}
</script>

<template>
  <div class="tabs-bar-container">
    <el-tabs
      v-model="activedTab"
      type="card"
      class="tabs-tar-container"
      @tab-remove="handleTabRemove"
      @tab-click="handleTabClick"
    >
      <el-tab-pane
        v-for="item of visitedRoutes"
        :key="item.path"
        :name="item.path"
        :closable="!isAffix(item)"
      >
        <template #label>
          <span class="icon-wrapper">
            <el-icon :size="15" v-if="item.meta.icon">
              <component
                class="menu-icon"
                :is="item.meta.icon"
              />
            </el-icon>
          </span>
          <span class="tab-item-title">{{ item.name }}</span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.tabs-bar-container {
  padding: 0 20px;
}
.el-tabs :deep(.el-tabs__header) {
  border: none;
  box-sizing: border-box;
  .el-tabs__nav {
    border: none;
    box-sizing: border-box;
  }
  .el-tabs__item + .el-tabs__item {
    margin-left: 6px;
  }
  .el-tabs__item {
    border-radius: 2px;
    box-sizing: border-box;
    border: none;
  }
  .el-tabs__item.is-active, .el-tabs__item:hover {
    color: #7e9cff;
    background-color: #f2f5ff;
    border-bottom: 2px solid #7e9cff;
    border-radius: 2px;
    border-bottom-color: #7e9cff;
    border-bottom: 2px solid #7e9cff;
  } 
}
.icon-wrapper {
  position: relative;
  .el-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
.tab-item-title {
  margin-left: 20px;
}
</style>