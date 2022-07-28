<script setup>
defineProps({
  data: {
    type: Array,
    default() {
      return [];
    }
  }
});
</script>

<template>
  <div class="tree">
    <div 
      class="tree-item"
      v-for="item of data"
    >
      <div class="tree-label">
        <i class="icon" v-if="item.children && item.children.length">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M384 192v640l384-320.064z"></path></svg>
        </i>
        {{ item.label }}
      </div>
      <VTree :data="item.children" v-if="item.children && item.children.length" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tree-item {
  padding-left: 20px;
  .tree-label {
    padding: 2px 0;
  }
  .tree-label:hover {
    background-color: #efefef;
  }
}
.icon {
  font-size: 12px;
  color: #a8abb2;
}
svg {
  height: 1em;
  width: 1em;
}
</style>