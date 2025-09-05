<template>
  <div style="display: inline-block; text-align: center;">
    <button
      :disabled="isCountingDown || destroyed"
      @click="startCountdown"
      style="padding: 8px 16px; background: red; color: white; border: none; cursor: pointer;"
    >
      <span v-if="!isCountingDown && !destroyed">💣 Self Destruct</span>
      <span v-else-if="isCountingDown">⏳ {{ countdown }}</span>
      <span v-else>💥 Destroyed</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "SelfDestructButton",
  props: {
    countdownSeconds: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      countdown: this.countdownSeconds,
      isCountingDown: false,
      destroyed: false,
      timer: null
    }
  },
  methods: {
    startCountdown () {
      if (this.isCountingDown || this.destroyed) return

      this.isCountingDown = true
      this.countdown = this.countdownSeconds

      this.timer = setInterval(() => {
        if (this.countdown > 1) {
          this.countdown--
        } else {
          clearInterval(this.timer)
          this.destroyed = true
          this.isCountingDown = false
          this.$emit('self-destruct') // 🔥 notify parent
        }
      }, 1000)
    }
  },
  beforeUnmount () {
    if (this.timer) clearInterval(this.timer)
  }
}
</script>
