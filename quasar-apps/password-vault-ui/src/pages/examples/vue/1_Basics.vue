<template>
  <div :class="divClass + ' text-center'">
    <!-- Example of data binding -->
    <h1 v-bind:id="elementId">
      <!-- Declarative Rendering -->
      {{ message }}
    </h1>

    <!-- Declarative Rendering with expressions -->
    <p>{{ message.toUpperCase() }}</p>
    <p>{{ message.split(' ') }}</p>

    <button @click="incrementCount">Click count: {{ count }}</button>
  </div>
</template>
<script setup>
import { ref } from 'vue';

/* 
  State variables are declared here using ref()
*/
const elementId = ref('my-div');
const divClass = ref('my-class');
const message = ref('Hello Vue JS!');
const count = ref(0);

/* 
  Component methods/functions are declared here
*/
function incrementCount() {
  // Access state variables using .value
  count.value++;
  console.log('Count is updated', count.value);
}
</script>
<style>
.my-class {
  max-width: min(400px, 75vw);
  margin: 0 auto;
}

.text-center {
  text-align: center;
}
</style>
