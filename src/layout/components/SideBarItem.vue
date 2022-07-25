<script setup>
defineProps({
  item: Object,
  basePath: String,
});
</script>

<template>
  <template v-if="item.children && item.children.length">
    <el-sub-menu :index="item.path">
      <template #title>
        <el-icon :size="16">
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <SideBarItem
        v-for="(child,index) of item.children"
        :item="child"
        :base-path="child.path"
        :key="index"
      >
      </SideBarItem>
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :index="item.path">
      <template #title>
        <el-icon :size="16" v-if="item.icon">
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
