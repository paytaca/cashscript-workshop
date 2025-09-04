<template>
  <q-dialog
    persistent
    ref="loadingDialogRef"
  >
    <q-card class="row justify-center q-pa-md">
      <q-spinner size="lg" />
      <span class="col-12 text-center text-body1 q-mt-md">{{ message }}</span>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadingDialog',

  props: {
    message: { type: String, required: true, default: '' }
  }
})
</script>