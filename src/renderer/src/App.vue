<template>
  <Versions />
  <div>
    <div v-if="updateAvailable" class="update-banner">
      <p>Update available. Downloading...</p>
    </div>
    <div v-if="updateDownloaded" class="update-banner">
      <p>Update downloaded. Click to install.</p>
      <button @click="installUpdate">Install Now</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Versions from './components/Versions.vue'

const updateAvailable = ref(false)
const updateDownloaded = ref(false)

window.electron.onUpdateAvailable(() => {
  updateAvailable.value = true
})

window.electron.onUpdateDownloaded(() => {
  updateDownloaded.value = true
})

const installUpdate = () => {
  window.electron.installUpdate()
}
</script>

<style>
.update-banner {
  position: fixed;
  bottom: 10px;
  left: 10px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
}
</style>
