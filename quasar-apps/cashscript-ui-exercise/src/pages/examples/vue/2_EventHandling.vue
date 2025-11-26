<template>
  <div class="container q-gutter-sm">
    <h4>Event handling</h4>
    <p>Count: {{ count }}</p>

    <!-- Can pass the function itself -->
    <button @click="incrementCount">Add 1</button>

    <!-- Call the function directly -->
    <button @click="decrementCount()">Minus 1</button>

    <!-- Passing an expression as event handler -->
    <button @click="count = 0"> Set to zero </button>

    <button @click.once="incrementCount()"> Add 1 (Once only)</button>

    <div @click="incrementCount()" class="clickable-div">
      Clickable Div!
      <button @click="incrementCount">
        Inner button (Will trigger outer div click also)
      </button>
    </div>

    <div @click.self="incrementCount()" class="clickable-div">
      @click.self="incrementCount"
      <button @click="incrementCount">
        Inner button (Will not trigger outer div click)
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const count = ref(0);

function incrementCount() {
  count.value++;
}

function decrementCount() {
  count.value--;
}
</script>
<style>
.container {
  max-width: min(400px, 75vw);
  margin: 0 auto;
}

.clickable-div {
    background-color: aqua;
    padding: 4px 8px;
    border-radius: 2px;
}
</style>
