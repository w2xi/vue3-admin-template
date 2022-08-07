<script setup>
import { onMounted } from 'vue';
import DPlayer from 'dplayer';

// reference: http://dplayer.js.org/

onMounted(() => {
  const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    preload: 'none',
    screenshot: true,
    video: {
      url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
      pic: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
      thumbnails: 'https://i.loli.net/2019/06/06/5cf8c5d9cec8510758.jpg',
    },
    subtitle: {
      url: 'https://s-sh-17-dplayercdn.oss.dogecdn.com/hikarunara.vtt',
    },
    danmaku: {
      id: '9E2E3368B56CDBB4',
      api: 'https://api.prprpr.me/dplayer/',
      addition: ['https://s-sh-17-dplayercdn.oss.dogecdn.com/1678963.json'],
    },
    autoplay: false,
  });
});
</script>

<template>
  <div id="dplayer"></div>
</template>

<style scoped>
#dplayer {
  height: calc(100vh - 200px);
  border-radius: 10px;
  margin-top: 60px;
}
</style>
