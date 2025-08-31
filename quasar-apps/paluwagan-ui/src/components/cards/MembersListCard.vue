<template>
  <q-card
    bordered
    class="q-pa-md"
    style="width: 50vw"
  >
    <span class="row col-12 justify-center text-h6">
      Members List
    </span>

    <div class="row col-12">
      <template v-if="membersList.length > 0">
        <div v-for="(member, index) in membersList" :key="index">
          <!-- insert details here -->
        </div>
      </template>

      <template v-else>
        <span class="col-12 text-center text-subtitle1 text-grey">
          No members yet
        </span>
      </template>
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MembersListCard',

  data() {
    return {
      membersList: []
    }
  }
})
</script>