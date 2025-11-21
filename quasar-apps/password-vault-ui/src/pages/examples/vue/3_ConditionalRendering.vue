<template>
  <div class="container q-gutter-sm">
    <h4>Conditional rendering</h4>
    <button @click="count++">Add 1</button>
    <button @click="count--">Minus 1</button>
    <button @click="count = 0"> Set to zero </button>

    <p>Count: {{ count }}</p>
    <p v-if="count == 0">Count is now zero</p>
    <p v-else-if="count > 0">Count is positive</p>
    <p v-else-if="count < 0">Count is negative</p>

    <p v-show="count == 0">
      This will only show when count is 0
    </p>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>
<style>
.container {
  max-width: min(400px, 75vw);
  margin: 0 auto;
}
</style>
