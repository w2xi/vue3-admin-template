<script setup>
// reference: https://vuejs.org/examples/#markdown

import { ref, computed, onMounted } from 'vue';
import { marked } from 'marked';
import { debounce } from 'lodash-es';

const input = ref('# Vue.js');
const inputRef = ref(null);

const content = computed(() => marked(input.value));

onMounted(() => {
  inputRef.value.focus()
});

const update = debounce((e) => {
  input.value = e.target.value;
}, 100);
</script>

<template>
  <div class="markdown">
    <textarea ref="inputRef" class="input" :value="input" @input="update"></textarea>
    <div class="output" v-html="content"></div>
  </div>
</template>

<style scoped>
.markdown {
  height: 100%;
  width: 100%;
  display: flex;
}
.input,
.output {
  overflow: hidden;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}
.input {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background: #f6f6f6;
  padding: 20px;
  font-size: 16px;
  font-family: 'Monaco', Courier, monospace;
}

</style>