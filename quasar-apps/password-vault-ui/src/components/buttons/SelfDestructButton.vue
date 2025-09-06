<template>
  <div class="q-gutter-md">
    <button
      :disabled="isCountingDown"
      @click="startCountdown"
      class="self-destruct-button"
    >
      {{  btnText }}
    </button>
    <button @click="resetCountdown" class="reset-button">Reset Countdown</button>

    <div></div>
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
      btnText: '💣 Self Destruct',
      isCountingDown: false,
      destroyed: false,
      timer: null,
      countdownStart: null,
    }
  },
  methods: {
    startCountdown () {
      if (this.isCountingDown || this.destroyed) return

      this.isCountingDown = true
      this.countdown = this.countdownSeconds
      this.btnText = '⏳ ' + this.countdown;
      this.countdownStart = new Date().toLocaleTimeString();

      this.timer = setInterval(() => {
        if (this.countdown > 1) {
          this.countdown--
          this.btnText = '⏳ ' + this.countdown;
        } else {
          clearInterval(this.timer)
          this.destroyed = true
          this.isCountingDown = false
          this.btnText = '💥 Destroyed';

          const countdownTimestamp = {
            start: this.countdownStart,
            end: new Date().toLocaleTimeString(),
          }
          this.$emit('self-destruct', countdownTimestamp) // 🔥 notify parent
        }
      }, 1000)
    },
    resetCountdown() {
      this.destroyed = false;
      this.countdown = this.countdownSeconds;
      this.isCountingDown = false;
      this.btnText = '💣 Self Destruct';

      clearInterval(this.timer);
      this.timer = null;
      this.$emit('reset');
    }
  },
  beforeUnmount () {
    if (this.timer) clearInterval(this.timer)
  }
}
</script>
<style scoped>
button {
  padding: 8px 16px;
  color: white;
  border: none;
  cursor: pointer;
}

.self-destruct-button {
  background: red;
}

.reset-button {
  background: grey;
}
</style>