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

  computed: {
    repeatCharacter() {
      if (this.count < 0) return 'Count is negative'
      return this.someLetter.repeat(this.count)
    }
  },

  methods: {
    displayCount() {
      console.log('Count is:', this.count);
    }
  },

  /* Watchers run a function when the property they watch changes */
  watch: {
    // Set the property name you want to watch
    count(newValue, oldValue) {
      console.log('Count changed!', 'Before:', oldValue, 'After:', newValue);
      this.displayCount()
    },

    // Computed properties also work
    repeatCharacter(newValue, oldValue) {
      console.log('repeatCharacter changed', 'Before:', oldValue, 'After:', newValue);
    }
  }
})
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
