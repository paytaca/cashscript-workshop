<template>
  <div class="q-pa-md column q-gutter-md">
    <!-- Template-based Dialogs -->
    <q-btn label="Open Simple Dialog" color="primary" @click="showSimple = true" />
    <q-dialog v-model="showSimple">
      <q-card>
        <q-card-section>
          <div class="text-h6">Simple Dialog</div>
        </q-card-section>

        <q-card-section>
          This is a basic dialog with some text.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-btn label="Open Form Dialog" color="secondary" @click="showForm = true" />
    <q-dialog v-model="showForm" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Form Dialog</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="form.name" label="Name" outlined />
          <q-input v-model="form.email" label="Email" type="email" outlined />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn unelevated label="Submit" color="primary" @click="submitForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Programmatic Dialogs -->
    <q-separator spaced />

    <q-btn label="Show Alert ($q.dialog)" color="primary" @click="showAlert" />
    <q-btn label="Show Confirm ($q.dialog)" color="orange" @click="showConfirm" />
    <q-btn label="Show Prompt ($q.dialog)" color="teal" @click="showPrompt" />
    <q-btn label="Custom Dialog Component ($q.dialog)" color="amber" @click="showCustomDialog" />
  </div>
</template>

<script>
import LoadingDialog from 'src/components/dialogs/LoadingDialog.vue'

export default {
  name: "DialogCheatsheet",
  data () {
    return {
      showSimple: false,
      showForm: false,
      form: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    submitForm () {
      this.$q.notify({
        type: 'positive',
        message: `Submitted: ${this.form.name} (${this.form.email})`
      })
      this.showForm = false
    },
    showAlert () {
      this.$q.dialog({
        title: 'Alert',
        message: 'This is an alert dialog created with $q.dialog().'
      })
    },
    showConfirm () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to continue?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$q.notify({ type: 'positive', message: 'Confirmed!' })
      }).onCancel(() => {
        this.$q.notify({ type: 'negative', message: 'Cancelled' })
      })
    },
    showPrompt () {
      this.$q.dialog({
        title: 'Prompt',
        message: 'What is your name?',
        prompt: {
          model: '',
          type: 'text'
        },
        cancel: true,
        persistent: true
      }).onOk(name => {
        this.$q.notify({ type: 'info', message: `Hello, ${name}!` })
      })
    },
    showCustomDialog() {
      const dialog = this.$q.dialog({
        component: LoadingDialog,
        componentProps: {
          message: 'Custom loading dialog. Closing after 3 seconds',
        }
      })
      
      setTimeout(() => dialog.hide(), 3000)
    }
  }
}
</script>
