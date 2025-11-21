<template>
  <div class="container q-gutter-sm">
    <h4>Computed Properties</h4>
    <div>Count: {{ count }}</div>
    <button @click="count++">Add 1</button>
    <button @click="count--">Minus 1</button>
    <button @click="count = 0"> Set to zero </button>

    <!-- Displaying computed properties -->
    <p>Count multiplied by 5: {{ countTimesFive }}</p>
    <p>Count reversed sign: {{ reverseCount }}</p>
    <p>Count as letter: {{ repeatCharacter }}</p>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const someLetter = ref('A');

/*
 * Computed properties are declared here using computed()
 * NOTE: you should not update state variables here
 */
const countTimesFive = computed(() => {
  return count.value * 5;
});

const reverseCount = computed(() => {
  return count.value * -1;
});

const repeatCharacter = computed(() => {
  if (count.value < 0) return 'Count is negative';
  return someLetter.value.repeat(count.value);
});
</script>
<style>
.container {
  max-width: min(400px, 75vw);
  margin: 0 auto;
}
</style>
