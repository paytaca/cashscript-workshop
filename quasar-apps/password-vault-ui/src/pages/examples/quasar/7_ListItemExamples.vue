<template>
  <div class="q-pa-md">
    <!-- Basic List -->
    <q-list bordered padding class="rounded-borders">
      <q-item-label header>Contacts</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar icon="person" color="blue" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Alice</q-item-label>
          <q-item-label caption>alice@email.com</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chat" color="primary" />
        </q-item-section>
      </q-item>

      <q-separator inset />

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar icon="person" color="green" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Bob</q-item-label>
          <q-item-label caption>bob@email.com</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="call" color="positive" />
        </q-item-section>
      </q-item>

      <q-separator inset />

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar icon="person" color="red" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Charlie</q-item-label>
          <q-item-label caption>charlie@email.com</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="email" color="negative" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
</script>
