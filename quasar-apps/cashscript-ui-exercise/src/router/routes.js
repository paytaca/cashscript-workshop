const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/HomePage.vue') },
    ]
  },

  {
    path: '/examples',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'vue/basics', component: () => import('src/pages/examples/vue/1_Basics.vue'), name: 'example-v-basics' },
      { path: 'vue/events', component: () => import('src/pages/examples/vue/2_EventHandling.vue'), name: 'example-v-events' },
      { path: 'vue/conditional-rendering', component: () => import('src/pages/examples/vue/3_ConditionalRendering.vue'), name: 'example-v-conditional-rendering' },
      { path: 'vue/list-rendering', component: () => import('src/pages/examples/vue/4_ListRendering.vue'), name: 'example-v-list-rendering' },
      { path: 'vue/computed', component: () => import('src/pages/examples/vue/5_ComputedProperty.vue'), name: 'example-v-computed' },
      { path: 'vue/watchers', component: () => import('src/pages/examples/vue/6_Watchers.vue'), name: 'example-v-watchers' },
      { path: 'vue/lifecycle', component: () => import('src/pages/examples/vue/7_LifecycleHooks.vue'), name: 'example-v-lifecycle' },
      { path: 'vue/inputs', component: () => import('src/pages/examples/vue/8_FormInputs.vue'), name: 'example-v-input' },
      { path: 'vue/components', component: () => import('src/pages/examples/vue/9_Components.vue'), name: 'example-v-components' },

      { path: 'quasar/buttons', component: () => import('src/pages/examples/quasar/1_ButtonExamples.vue'), name: 'example-q-btn' },
      { path: 'quasar/inputs', component: () => import('src/pages/examples/quasar/2_FormInputExamples.vue'), name: 'example-q-input' },
      { path: 'quasar/classes', component: () => import('src/pages/examples/quasar/3_QuasarClasses.vue'), name: 'example-q-classes' },
      { path: 'quasar/cards', component: () => import('src/pages/examples/quasar/4_CardExamples.vue'), name: 'example-q-card' },
      { path: 'quasar/tables', component: () => import('src/pages/examples/quasar/5_TableExamples.vue'), name: 'example-q-table' },
      { path: 'quasar/dialogs', component: () => import('src/pages/examples/quasar/6_DialogExamples.vue'), name: 'example-q-dialog' },
      { path: 'quasar/tab-panels', component: () => import('src/pages/examples/quasar/8_TabPanelExamples.vue'), name: 'example-q-tab-panel' },
      { path: 'quasar/list-items', component: () => import('src/pages/examples/quasar/7_ListItemExamples.vue'), name: 'example-q-list-item' },

      { path: 'apps/todo', component: () => import('src/pages/examples/apps/TodoApp.vue'), name: 'example-app-todo' },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
