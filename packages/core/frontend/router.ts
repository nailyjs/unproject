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
      children: [
        ...routes,
        {
          path: '/:pathMatch(.*)*',
          name: '404',
          component: () => import('./layouts/Default.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('./layouts/Default.vue'),
    },
  ],
})

export default router
