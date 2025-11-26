<template>
  <div class="q-pa-md">
    <!-- Basic Table -->
    <q-table
      title="User List"
      :rows="rows"
      :columns="columns"
      row-key="id"
      bordered
      flat
      separator="cell"
      :pagination="{ rowsPerPage: 5 }"
    >
      <template v-slot:body-cell-age="props">
        <q-td :props="props">
          <q-badge :color="props.row.age > 25 ? 'green' : 'orange'">
            {{ props.row.age }}
          </q-badge>
        </q-td>
      </template>
    </q-table>

    <!-- Grid Mode -->
    <q-table
      title="Grid Mode"
      :rows="rows"
      :columns="columns"
      row-key="id"
      grid
      card-class="bg-grey-1 q-pa-sm"
      class="q-mt-md"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const columns = ref([
  { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'age', label: 'Age', field: 'age', align: 'right', sortable: true },
]);

const rows = ref([
  { id: 1, name: 'Alice', age: 21 },
  { id: 2, name: 'Bob', age: 28 },
  { id: 3, name: 'Charlie', age: 32 },
  { id: 4, name: 'Diana', age: 19 },
  { id: 5, name: 'Eve', age: 25 },
]);
</script>
