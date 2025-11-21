<template>
  <q-page padding class="q-gutter-lg">
    <div class="row items-cente justify-centerr q-gutter-md">
      <q-card v-for="(link, index) in links" :key="index" style="min-width: min(350px, 85vw);">
        <q-card-section>
          <div class="text-subtitle1">{{ link.label }}</div>
          <div>{{ link.url }}</div>
          <div class="q-mt-none q-gutter-sm">
            <q-btn
              :color="link.color"
              no-caps
              label="Copy to clipboard"
              @click="copyText(link.url)"
            />
            <q-btn
              no-caps
              :color="link.color"
              label="Open in new tab"
              :href="link.url"
              target="_blank"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script setup>
import { copyToClipboard } from 'quasar';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const links = [
  {
    label: 'Vue JS introduction',
    color: 'teal-5',
    url: 'https://vuejs.org/guide/introduction.html',
  },
  {
    label: 'Vue JS tutorial',
    color: 'teal-5',
    url: 'https://vuejs.org/tutorial/#step-1',
  },
  {
    label: 'Vue JS examples',
    color: 'teal-5',
    url: 'https://vuejs.org/examples/#hello-world',
  },
  {
    label: 'Creating quasar project',
    color: 'blue',
    url: 'https://quasar.dev/start/quick-start',
  },
  {
    label: 'Quasar components',
    color: 'blue',
    url: 'https://quasar.dev/components',
  },
  {
    label: 'Pinia',
    color: 'yellow-8',
    url: 'https://pinia.vuejs.org/introduction.html',
  },
  {
    label: 'Vue Router',
    color: 'teal-7',
    url: 'https://router.vuejs.org/guide/',
  }
];

function copyText(text) {
  copyToClipboard(text).then(() => {
    $q.notify({ message: 'Link copied!', type: 'positive' });
  });
}
</script>