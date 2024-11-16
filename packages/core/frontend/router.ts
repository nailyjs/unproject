/// <reference types="./shims.d.ts" />

import { layoutRoutes, routes } from 'virtual:uncli:vue-router'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...layoutRoutes,
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./layouts/Default.vue'),
      children: routes,
    },
  ],
})

export default router
