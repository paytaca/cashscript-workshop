const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
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

      { path: 'apps/todo', component: () => import('src/pages/examples/apps/TodoApp.vue'), name: 'example-app-todo' },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
