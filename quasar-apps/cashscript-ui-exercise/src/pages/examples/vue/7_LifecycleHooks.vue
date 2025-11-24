<template>
  <div class="container q-gutter-sm">
    <h4>Lifecycle Hooks</h4>
    <div class="subtitle">See console logs</div>

    <div>To simulate <i>beforeUpdate()</i> <i>updated()</i> hooks</div>
    <p>Count: {{ count }}</p>
    <button @click="count++">Add 1</button>
    <button @click="count--">Minus 1</button>

    <button @click="reloadPage()">Reload page to see again</button>

    <div>Move to another page to see unmount</div>
    <button @click="goBack">Go back</button>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';

const count = ref(0);

function reloadPage() {
  location.reload();
}

function goBack() {
  history.back();
}

/* Vue Component's Lifecycle hooks */
// Note: beforeCreate and created are not needed in <script setup>
// The setup code runs in the created phase

onBeforeMount(() => {
  window.alert('Before mount');
});

onMounted(() => {
  window.alert('Mounted');
  // State variables are accessible in lifecycle hooks
  console.log('Count', count.value);
});

onBeforeUpdate(() => {
  console.log('Before update');
});

onUpdated(() => {
  console.log('Updated');
});

onBeforeUnmount(() => {
  window.alert('Before unmount');
});

onUnmounted(() => {
  window.alert('Unmounted');
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
