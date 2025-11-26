<template>
  <q-page padding class="q-gutter-lg">
    <div class="text-h4 text-center q-mb-lg">Quasar buttons</div>
    <div class="q-gutter-md">
      <q-btn label="Click me"/>
      <q-btn label="Click me" no-caps/>
      <q-btn label="Click me" color="red"/>
      <q-btn label="Click me" color="blue" text-color="yellow"/>
      <q-btn label="Disabled" color="blue" :disable="true"/>
    </div>

    <div class="q-gutter-md">
      <div class="text-h6">Icon</div>
      <q-btn label="Click me" icon="mail"/>
      <q-btn label="Click me" icon-right="mail"/>
      <q-btn label="Click me" icon="mail" icon-right="send"/>
      <q-btn icon="warning"/>
      <q-btn icon="delete" round/>
    </div>

    <div class="q-gutter-md">
      <div class="text-h6">Shapes</div>
      <q-btn label="Round" round/>
      <q-btn label="Rounded" rounded/>
      <q-btn label="Square" square/>
    </div>

    <div class="q-gutter-md">
      <div class="text-h6">Design</div>
      <q-btn label="Flat" flat/>
      <q-btn label="Outlined" outline/>
      <q-btn label="Push" push/>
      <q-btn label="Glossy" glossy/>
      <q-btn label="No caps" no-caps/>
    </div>

    <div class="q-gutter-md">
      <div class="text-h6">Sizes</div>
      <q-btn label="Default"/>
      <q-btn label="Small" size="sm"/>
      <q-btn label="Large" size="lg"/>
      <q-btn label="Custom 20px" size="20px"/>
      <q-btn label="Custom 1rem" size="1rem"/>
    </div>

    <div class="q-gutter-md">
      <div class="text-h6">Padding</div>
      <q-btn label="Small all sides" padding="sm"/>
      <q-btn label="X and Y" padding="lg xs"/>
      <q-btn label="Custom 20px 5px" padding="20px 5px"/>
    </div>

    <div class="q-gutter-md">
      <div class="text-h6">Loading</div>
      <q-btn label="Click me" :loading="true"/>
      <q-btn :loading="true">
        Button
        <template v-slot:loading>
          Loading
          <q-spinner-radio />
        </template>
      </q-btn>
      <q-btn
        label="Click me"
        color="blue"
        :loading="loadingBtnProgress > 0"
        :percentage="loadingBtnProgress"
        @click="loadingProgress"
      />
    </div>
  </q-page>
</template>
<script setup>
import { ref } from 'vue';

const loadingBtnProgress = ref(0)

function loadingProgress() {
  const interval = setInterval(() => {
    loadingBtnProgress.value += 10;
    if (loadingBtnProgress.value > 100) {
      clearInterval(interval);
      loadingBtnProgress.value = 0;
    }
  }, 500);
}
</script>
