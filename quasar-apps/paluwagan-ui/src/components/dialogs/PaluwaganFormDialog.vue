<template>
  <q-dialog
    persistent
    ref="loadingDialogRef"
  >
    <q-card class="row justify-center q-pa-md">
      <div class="row col-12">
        <!-- fields go here -->
      </div>

      <div class="row col-12 justify-evenly">
        <q-btn
          v-close-popup
          rounded
          color="red"
          label="Cancel"
        />

        <q-btn
          rounded
          color="green"
          label="Create"
          @click="createPaluwaganContract"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PaluwaganFormDialog',

  methods: {
    createPaluwaganContract() {
      // TODO logic for creation of paluwagan contract
      console.log('yey')
    }
  }
})
</script>