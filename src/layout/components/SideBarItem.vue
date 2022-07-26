<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <el-menu-item 
    v-if="!item.children"
    :index="item.path" 
    :key="item.path"
  >
    <template #title>
      <el-icon :size="16" v-if="item.icon">
        <component :is="item.icon"></component>
      </el-icon>
      <span>{{ item.name }}</span>
    </template>
  </el-menu-item>
  <template v-else>
    <el-sub-menu :index="item.path">
      <template #title>
        <el-icon :size="16">
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <SideBarItem
        v-for="child of item.children"
        :item="child"
        :key="child.path"
      />
    </el-sub-menu>
  </template>
</template>

<style lang="scss" scoped>
</style>