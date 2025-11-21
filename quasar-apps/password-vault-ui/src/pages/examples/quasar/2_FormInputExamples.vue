<template>
  <q-page padding class="q-gutter-lg">
    <div class="text-h4 text-center q-mb-lg">Form Input</div>
    <q-checkbox dense v-model="inputState.disable" label="Disable"/>
    <q-checkbox dense v-model="inputState.loading" label="Loading"/>
    <q-checkbox dense v-model="inputState.readonly" label="Read only"/>
    <q-checkbox dense v-model="inputState.dense" label="Dense"/>
    <q-checkbox dense v-model="inputState.outlined" label="Outlined"/>
    <q-checkbox dense v-model="inputState.clearable" label="Clearable"/>
    <q-input
      v-model="text"
      label="Text"
      :dense="inputState.dense"
      :outlined="inputState.outlined"
      :disable="inputState.disable"
      :loading="inputState.loading"
      :readonly="inputState.readonly"
      :clearable="inputState.clearable"
    />

    <div class="text-body1">Selected: {{ selected }}</div>
    <q-select
      v-model="selected"
      label="Select"
      :options="options"
      v-bind:="inputState"
    />

    <q-select
      v-model="selected"
      label="Select (object options)"
      :options="optionsObjects"
      map-options
      emit-value
      v-bind:="inputState"
    />

    <div class="text-body1">Selected multiple: {{ selectedMultiple }}</div>
    <q-select
      v-model="selectedMultiple"
      label="Select multiple"
      :options="optionsObjects"
      map-options
      emit-value
      multiple
      v-bind:="inputState"
    />

    <q-file v-model="fileInput" label="File input" v-bind="inputState"/>

    <div class="row justify-around">
      <div>
        <div>Time picker value: {{ selectedTime }}</div>
        <q-time v-model="selectedTime" v-bind="inputState"/>
      </div>
      <div>
        <div>Date picker value: {{ selectedDate }}</div>
        <div><q-toggle v-model="useRangeDate" label="Use date range"/></div>
        <q-date v-model="selectedDate" :range="useRangeDate" v-bind="inputState"/>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
const inputState = ref({
  disable: false,
  dense: false,
  outlined: false,
  loading: false,
  readonly: false,
  clearable: false,
})

const selected = ref('apple')
const selectedMultiple = ref([])
const options = ref(['apple', 'banana', 'orange', 'grapes', 'watermelon', 'pineapple', 'strawberry', 'coconut' ])
const optionsObjects = ref([
  { value: 'apple', label: '🍎 Apple' },
  { value: 'banana', label: '🍌 Banana', disable: true },
  { value: 'grapes', label: '🍇 Grapes' },
  { value: 'orange', label: '🍊 Orange' },
  { value: 'watermelon', label: '🍉 Watermelon' },
  { value: 'pineapple', label: '🍍 Pineapple' },
  { value: 'strawberry', label: '🍓 Strawberry' },
  { value: 'coconut', label: '🥥 Coconut ' },
])

const fileInput = ref()

const selectedTime = ref('')
const useRangeDate = ref(false)
const selectedDate = ref('')
</script>
