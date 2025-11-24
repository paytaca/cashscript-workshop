<template>
  <div class="container">
    <h4>Components</h4>
    <self-destruct-button :countdown-seconds="3" @self-destruct="selfDestructHandler" />

    <p style="margin-top: 12px; background: #ffe6e6; padding: 8px;">
      {{ message }}
    </p>
  </div>
</template>
<script setup>
import SelfDestructButton from '../../../components/SelfDestructButton.vue';
import { ref } from 'vue';

const message = ref('Click self destruct button');

function selfDestructHandler(countdownTimestamp) {
  message.value = "💥 The button has self-destructed!" + 
                  " Started at " + countdownTimestamp.start +
                  " and ended at " + countdownTimestamp.end;
}
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
