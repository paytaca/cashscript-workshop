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
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: '4_ComputedProperty',
  data() {
    return {
      count: 0,
    }
  },

  methods: {
    reloadPage() {
      location.reload();
    },
    goBack() {
      history.back();
    }
  },


  /* Vue Component's Lifecycle hooks */
  beforeCreate() {
    window.alert('Before create!');
  },

  created() {
    window.alert('Created');

    // This object is accessible in lifecycle hooks, except `beforeCreate()`
    console.log('Count', this.count);
  },

  beforeMount() {
    window.alert('Before mount');
  },

  mounted() {
    window.alert('Mounted');
  },

  beforeUpdate() {
    console.log('Before update')
  },

  updated() {
    console.log('Updated')
  },

  beforeUnmount() {
    window.alert('Before unmount')
  },

  unmounted() {
    window.alert('Unmounted')
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
