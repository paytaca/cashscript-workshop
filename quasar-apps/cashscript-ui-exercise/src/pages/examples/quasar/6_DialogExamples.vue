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

<script setup>
import LoadingDialog from 'src/components/LoadingDialog.vue';
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const showSimple = ref(false);
const showForm = ref(false);
const form = ref({
  name: '',
  email: ''
});

function submitForm() {
  $q.notify({
    type: 'positive',
    message: `Submitted: ${form.value.name} (${form.value.email})`
  });
  showForm.value = false;
}

function showAlert() {
  $q.dialog({
    title: 'Alert',
    message: 'This is an alert dialog created with $q.dialog().'
  });
}

function showConfirm() {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to continue?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    $q.notify({ type: 'positive', message: 'Confirmed!' });
  }).onCancel(() => {
    $q.notify({ type: 'negative', message: 'Cancelled' });
  });
}

function showPrompt() {
  $q.dialog({
    title: 'Prompt',
    message: 'What is your name?',
    prompt: {
      model: '',
      type: 'text'
    },
    cancel: true,
    persistent: true
  }).onOk(name => {
    $q.notify({ type: 'info', message: `Hello, ${name}!` });
  });
}

function showCustomDialog() {
  const dialog = $q.dialog({
    component: LoadingDialog,
    componentProps: {
      message: 'Custom loading dialog. Closing after 3 seconds',
    }
  });
  
  setTimeout(() => dialog.hide(), 3000);
}
</script>
