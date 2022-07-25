<template>
  <el-container class="is-vertical">
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
.el-main {
  overflow-x: hidden;
  padding: 10px;
  background: #fff;
  color: #333;
  border-radius: 6px;
}
</style>
