<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  size: {
    type: Number,
    default: 180,
  },
  borderWidth: {
    type: Number,
    default: 15,
  },
  borderBgWidth: {
    type: Number,
    default: 15,
  },
  fillColor: {
    type: String,
    default: '#288feb',
  },
  emptyColor: {
    type: String,
    default: '#dddddd',
  },
  percent: {
    type: Number,
    default: 50,
  },
  linecap: {
    type: String,
    default: 'round',
  },
  transition: {
    type: Number,
    default: 400,
  },
  showPercent: {
    type: Boolean,
    default: false,
  },
});

const circleRadiusBg = () => {
  let value = (props.size - props.borderBgWidth) * 0.5;
  if (props.borderWidth > props.borderBgWidth) {
    value -= (props.borderWidth - props.borderBgWidth) * 0.5;
  }
  return value;
}
const circleRadiusFg = () => {
  let value = (props.size - props.borderWidth) * 0.5;
  if (props.borderBgWidth > props.borderWidth) {
    value -= (props.borderBgWidth - props.borderWidth) * 0.5;
  }
  return value;
}
const circumference = 2 * Math.PI * circleRadiusFg();
const offset = ref(circumference);
const currentPercent = ref(0);
const wrapStyle = {
  height: props.size + 'px',
  width: props.size + 'px',
  position: 'relative',
};
const wrapAttr = {
  class: props.class,
  style: wrapStyle,
};
const svgAttr = {
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  height: props.size,
  width: props.size,
};
const cx = props.size / 2;
const cy = props.size / 2;
const circleBgAttr = {
  cx,
  cy,
  r: circleRadiusBg(),
  fill: 'none',
  stroke: props.emptyColor,
  'stroke-width': props.borderBgWidth,
};
const circleFgAttr = computed(() => ({
  cx,
  cy,
  r: circleRadiusFg(),
  fill: 'none',
  stroke: props.fillColor,
  'stroke-width': props.borderWidth,
  'stroke-dasharray': circumference,
  'stroke-dashoffset': offset.value,
  'stroke-linecap': props.linecap,
  ...(props.transition && {
    style: {
      transition: `stroke-dashoffset ${props.transition}ms ease`,
    },
  }),
}));

onMounted(() => {
  const percent = Math.round(props.percent)
  if (percent !== 0) {
    updatePercent();
  }
});

watch(
  () => props.percent,
  () => {
    updatePercent();
  }
);

function updatePercent() {
  const percent = Math.round(props.percent);
  animateValue(percent);
}

function animateValue(to) {
  const step = to - currentPercent.value;
  const delay = props.transition / Math.abs(step);
  const counter = setInterval(() => {
    if (step > 0) {
      currentPercent.value += 1;
      if (currentPercent.value >= to) {
        clearInterval(counter);
      }
    } else {
      currentPercent.value -= 1;

      if (currentPercent.value <= to) {
        clearInterval(counter);
      }
    }
    offset.value = (circumference * (100 - currentPercent.value)) / 100;
  }, delay);
}
</script>

<template>
  <div class="vue-circle-progress" v-bind="wrapAttr">
    <svg v-bind="svgAttr" class="svg-wrapper">
      <circle v-bind="circleBgAttr" />
      <circle v-bind="circleFgAttr" />
    </svg>
    <div v-if="showPercent" class="current-percent" :style="{ color: fillColor }">
      <template v-if="$slots.content">
        <slot name="content" :percent="currentPercent"></slot>
      </template>
      <template v-else>
        {{ currentPercent }}
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vue-circle-progress {
  position: relative;
  .svg-wrapper {
    transform: rotate(-90deg);
  }
  .current-percent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
