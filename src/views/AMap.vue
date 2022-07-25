<script setup>
import { ref, onMounted } from 'vue';

const zoom = ref(12);
const center = ref([121.59996, 31.197646]);
const mapInstance = ref(null);
const amapRef = ref(null);
const instance = ref(null);

function init(map) {
  const marker = new AMap.Marker({
    position: [121.59996, 31.197646],
  });
  map.add(marker);
  mapInstance.value = map;
  mapInstance.value.setFitView();
}
</script>

<template>
  <div>
    <el-button type="primary" @click="mapInstance.setFitView()">setFitView</el-button>
    <div class="map-page-container">
      <el-amap ref="amapRef" :center="center" :zoom="zoom" @init="init" />
    </div>
  </div>
</template>

<style scoped>
.map-page-container {
  width: 100%;
  height: calc(100vh - 250px);
  margin-right: 10px;
}

.el-button {
  margin-bottom: 10px;
}
</style>
