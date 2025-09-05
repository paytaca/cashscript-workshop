<template>
  <div class="q-pa-md column q-gutter-md">
    <h6>Self Destruct Demo</h6>
    <self-destruct-button :countdown-seconds="3" @self-destruct="selfDestructHandler" />

    <p v-if="message" style="margin-top: 12px; background: #ffe6e6; padding: 8px;">
      {{ message }}
    </p>
  </div>
</template>

<script>
import SelfDestructButton from '../../../components/buttons/SelfDestructButton.vue'

export default {
  name: "9_Components",
  components: {
    SelfDestructButton
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    selfDestructHandler () {
      this.message = "💥 The button has self-destructed!"
    }
  }
}
</script>
