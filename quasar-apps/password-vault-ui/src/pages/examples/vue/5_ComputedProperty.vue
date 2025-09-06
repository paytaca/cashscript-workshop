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
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: '4_ComputedProperty',

  data() {
    return {
      count: 0,
      someLetter: 'A',
    }
  },

  /*
   * Computed properties are declared here
   * NOTE: you should not update state variables here
   */
  computed: {
    countTimesFive() {
      return this.count * 5
    },
    reverseCount() {
      return this.count * -1
    },
    repeatCharacter() {
      if (this.count < 0) return 'Count is negative'
      return this.someLetter.repeat(this.count)
    },
  }
})
</script>
<style>
.container {
  max-width: min(400px, 75vw);
  margin: 0 auto;
}
</style>
