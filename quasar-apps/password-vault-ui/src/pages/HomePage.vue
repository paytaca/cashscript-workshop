<template>
  <div class="page-container">
    <div class="text-h5">{{ message }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const message = ref('Hello World!');
</script>
<style scoped>
.page-container {
  max-width: min(600px, 95vw);
  padding: 16px;
  margin-left: auto;
  margin-right: auto;
}
</style>