<template>
  <div class="container q-gutter-sm">
    <h4>Watchers</h4>
    <div class="subtitle">See console logs</div>

    <div>Count: {{ count }}</div>
    <button @click="count++">Add 1</button>
    <button @click="count--">Minus 1</button>
    <button @click="count = 0"> Set to zero </button>

    <p>Count as letter: {{ repeatCharacter }}</p>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue';

const count = ref(0);
const someLetter = ref('A');

const repeatCharacter = computed(() => {
  if (count.value < 0) return 'Count is negative';
  return someLetter.value.repeat(count.value);
});

function displayCount() {
  console.log('Count is:', count.value);
}

/* Watchers run a function when the property they watch changes */
// Set the property you want to watch
watch(count, (newValue, oldValue) => {
  console.log('Count changed!', 'Before:', oldValue, 'After:', newValue);
  displayCount();
});

// Computed properties also work
watch(repeatCharacter, (newValue, oldValue) => {
  console.log('repeatCharacter changed', 'Before:', oldValue, 'After:', newValue);
});
</script>
<style>
.container {
  max-width: min(400px, 75vw);
  margin: 0 auto;
}

.subtitle {
  font-size: 1.5rem;
}
</style>
