<script setup>
import { ref, watch } from 'vue'
import { transformFromWGSToGCJ } from '@/utils/WSCoordinate.js'

const props = defineProps({
  showMap: {
    type: Boolean,
    default: false,
  },
  showStatus: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['close'])

defineExpose({
  viewRoute
})

const loading = ref(false)
const lines = ref({
  path: [],
  editable: false,
  strokecolor: '#000', // #4193ff
  strokeWeight: 40,
})
const markers = ref([])
const center = ref([113.11042549, 28.20128893])
const zoom = ref(18)
const stationList = ref([])
const execStatusObj = ref({
  0: ['#4193ff', '未到达'],
  1: ['#f00', '前往中'],
  2: ['#e4e7ed', '已到达'],
})
const show = ref(props.showMap)  
const amapRef = ref(null)

watch(() => props.showMap, (val) => {
  show.value = val
  loading.value = val
})

function viewRoute(options) {
  const { parkingList, trackList } = options
  stationList.value = parkingList
  handleParkings(parkingList)
  handleTrackPoints(trackList)
  loading.value = false
}

function handleCloseDialog() {
  stationList.value = []
  markers.value = []
  lines.value.path.length = []
  show.value = false
  emit('close')
}

function handleTrackPoints(data) {
  if (data.length > 0) {
    const path = data.map((item) => {
      const location = transformFromWGSToGCJ(item.latitude, item.longitude)
      return [location.R, location.Q]
    })
    lines.value.path = path
    center.value = path[0]
  }
  setFitView()
}

function handleParkings(data) {
  data.forEach((item) => {
    if (Object.prototype.hasOwnProperty.call(execStatusObj.value, item.isCurrent)) {
      item.color = execStatusObj.value[item.isCurrent][0]
    } else {
      item.color = '#e4e7ed'
    }
    const position = transformFromWGSToGCJ(Number(item.latitude), Number(item.longitude))
    markers.value.push({
      position: [position.R, position.Q],
      label: {
        content: `
          <div style="border: 2px solid ${item.color}; padding: 5px; border-radius: 6px; background: #fff;">
            <div>${item.dockShowName}</div>
            <div style="margin: 3px 0;">${item.time || ''}</div>
          </div>
        `,
        offset: [-30, -15],
      },
      icon: new AMap.Icon({
        size: new AMap.Size(80, 80), //图标大小
        imageSize: new AMap.Size(40, 40),
      }),
    })
  })
  setFitView()
}

function setFitView() {
    const map = amapRef.value.$$getInstance()
    map.setFitView()
}
</script>

<template>
  <el-dialog
    title="查看地图"
    v-model="show"
    width="50%"
    @close="handleCloseDialog"
  >
    <ul class="exec-status-list">
      <li class="status-item" v-for="(val, key) in execStatusObj" :key="key">
        <span class="color-block" :style="{ background: val[0] }"></span>
        <span>{{ val[1] }}</span>
      </li>
    </ul>
    <div class="main-content" v-loading="loading">
      <el-amap
        ref="amapRef"
        vid="site_map"
        :center="center"
        :zoom="zoom"
      >
        <el-amap-marker
          v-for="(marker, index) in markers"
          :key="index"
          :position="marker.position"
          :label="marker.label"
          :zIndex="1"
        ></el-amap-marker>
        <el-amap-polyline
          :editable="lines.editable"
          :path="lines.path"
          :stroke-color="lines.strokecolor"
          :stroke-weight="lines.strokeweight"
        ></el-amap-polyline>
      </el-amap>
      <div class="vehicle-path">
        <p>车辆运行路径:</p>
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in stationList"
            :color="item.color"
            :key="index"
            :class="'color--' + item.color.slice(1)"
          >
            {{ item.dockShowName }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </el-dialog>
</template>


<style lang="scss" scoped>
.main-content {
  display: flex;
}

.el-vue-amap-container {
  width: 85%;
  height: 600px;
  margin-top: 10px;
  :deep() .amap-marker .amap-marker-label {
    border: none;
    background: transparent;
  }
}

.vehicle-path {
  width: 15%;
  margin-left: 30px;
}

.exec-status-list {
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  .status-item {
    display: flex;
    align-items: center;
    list-style-type: none;
    margin-left: 20px;
  }
  .color-block {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    border-radius: 3px;
  }
}

.el-timeline {
  padding: 0;
  .el-timeline-item.color--4193ff {
    :deep() .el-timeline-item__tail {
      border-color: #4193ff;
    }
  }
  .el-timeline-item.color--f00 {
    :deep() .el-timeline-item__tail {
      border-color: #f00;
    }
  }
  .el-timeline-item.color--e4e7ed {
    :deep() .el-timeline-item__tail {
      border-color: #e4e7ed;
    }
  }
}
</style>
