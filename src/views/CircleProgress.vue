<script setup>
import { ref } from 'vue';

const percent = ref(30);
</script>

<template>
  <div class="demo">
    <BaseCircleProgress :percent="20" :size="120" />

    <!-- <BaseCircleProgress
      :show-percent="true"
      :percent="30"
      :size="150"
      fill-color="#67C23A"
      empty-color="#ddd"
      :border-bg-width="10"
    >
    </BaseCircleProgress>

    <BaseCircleProgress
      :show-percent="true"
      :percent="50"
      fill-color="#409EFF"
      empty-color="#999"
      :border-bg-width="8"
    >
      <template #content="row">
        {{ row.percent + '%' }}
      </template>
    </BaseCircleProgress> 

    <BaseCircleProgress
      :show-percent="true"
      :percent="70"
      fill-color="#F56C6C"
      empty-color="#000"
      :border-bg-width="8"
    >
      <template #content>
        <span style="fontWeight: bold; fontSize: 20px">Hello</span>
      </template>
    </BaseCircleProgress> -->
  </div>
</template>

<style lang="scss" scoped>
.demo {
  height: 100%;
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vue-circle-progress {
  margin-left: 20px;
  font-size: 20px;
}
</style>