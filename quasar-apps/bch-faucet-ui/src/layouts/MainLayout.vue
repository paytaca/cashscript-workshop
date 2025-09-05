<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat @click="openDrawer = !openDrawer" round dense icon="menu" />
        <q-toolbar-title class="text-center text-bold">
          BitcoinCash Faucet
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="openDrawer"
      :width="200"
      :breakpoint="700"
      elevated
    >
      <q-item to="/" clickable v-ripple>
        <q-item-section>
          <q-item-label>Home</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator/>
      <q-expansion-item label="Examples">
        <q-expansion-item
          v-for="(group, index) in links"
          :key="index"
          :label="group.label"
          header-class="q-pl-lg"
        >
          <q-item
            v-for="(link, index2) in group.links"
            :key="index + '-' + index2"
            :to="{ name: link.routeName }"
            clickable v-ripple
            class="q-pl-xl"
          >
            <q-item-section>
              <q-item-label>{{ link.label }}</q-item-label>
            </q-item-section>
          </q-item>

        </q-expansion-item>
      </q-expansion-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      openDrawer: false,
      links: [
        {
          label: 'Vue Basics',
          links: [
            { label: 'Basics', routeName: 'example-v-basics' },
            { label: 'Events', routeName: 'example-v-events' },
            { label: 'Conditional Rendering', routeName: 'example-v-conditional-rendering' },
            { label: 'List Rendering', routeName: 'example-v-list-rendering' },
            { label: 'Computed properties', routeName: 'example-v-computed' },
            { label: 'Watchers', routeName: 'example-v-watchers' },
            { label: 'Lifecycle Hooks', routeName: 'example-v-lifecycle' },
          ]
        },
        {
          label: 'Apps',
          links: [
            { label: 'To Do App', routeName: 'example-todo' },
          ]
        }
      ]
    }
  }
})
</script>
