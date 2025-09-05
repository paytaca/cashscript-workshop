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
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: '1_DataBinding',

  data() {
    /* 
      State variables are declared here
    */
    return {
      elementId: 'my-div',
      divClass: 'my-class',
      message: 'Hello Vue JS!',
      count: 0,
    }
  },

  /* 
    Component methods/functions are declared here
  */
  methods: {
    incrementCount() {
      // Acces state variables using 'this' object
      this.count++;
      console.log('Count is updated', this.count);
    },
  }
})
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
