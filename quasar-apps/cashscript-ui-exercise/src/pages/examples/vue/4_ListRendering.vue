<template>
  <div class="container q-gutter-sm">
    <h4>List</h4>

    <p class="subtitle">Looping Arrays</p>
    <ul>
      <li v-for="(fruit, index) in fruits" :key="index">
        Fruit #{{ index + 1 }} : {{ fruit }}
      </li>
    </ul>

    <p class="subtitle">Looping Objects</p>
    <ul>
      <li v-for="(value, key) in profile" :key="key">
        {{ key }} : {{ value }}
      </li>
    </ul>

    <p class="subtitle">Looping With a number</p>
    <ul>
      <li v-for="(index) in 10" :key="index">
        Item {{ index }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const fruits = ref(['🍎 Apple', '🍌 Banana', '🍇 Grapes', '🍊 Orange']);
const profile = ref({
  Name: 'Juan Pusong',
  Age: 21,
  Nationality: 'Filipino',
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
