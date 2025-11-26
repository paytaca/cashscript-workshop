<template>
  <div class="q-pa-md">
    <!-- Basic Tabs -->
    <q-tabs
      v-model="tab"
      dense
      class="text-primary"
      active-color="primary"
      indicator-color="primary"
      align="justify"
    >
      <q-tab name="home" icon="home" label="Home" />
      <q-tab name="profile" icon="person" label="Profile" />
      <q-tab name="settings" icon="settings" label="Settings" />
    </q-tabs>

    <q-separator />

    <!-- Tab Panels -->
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="home">
        <div class="text-h6">🏠 Home</div>
        <p>Welcome to the home tab.</p>
      </q-tab-panel>

      <q-tab-panel name="profile">
        <div class="text-h6">👤 Profile</div>
        <p>Here’s where profile info would go.</p>
      </q-tab-panel>

      <q-tab-panel name="settings">
        <div class="text-h6">⚙️ Settings</div>
        <p>Settings and preferences go here.</p>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tab = ref('home');
</script>
