<template>
  <q-btn
    rounded
    color="green"
    label="Create Paluwagan"
    @click="openFormDialog"
  />
</template>

<script>
import { defineComponent } from 'vue'

import PaluwaganFormDialog from 'src/components/dialogs/PaluwaganFormDialog.vue'

export default defineComponent({
  name: 'CreatePaluwaganButton',

  methods: {
    openFormDialog() {
      this.$q.dialog({
        component: PaluwaganFormDialog
      })
    }
  }
})
</script>