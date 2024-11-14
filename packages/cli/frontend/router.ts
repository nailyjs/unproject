/// <reference types="./shims.d.ts" />

import { layoutRoutes, routes } from 'virtual:uncli:vue-router'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...layoutRoutes,
    {
      path: '/',
      component: () => import('./layouts/Default.vue'),
      children: [
        ...routes,
        {
          path: '/',
          component: () => import('./pages/Home.vue'),
        },
      ],
    },
  ],
})

export default router
