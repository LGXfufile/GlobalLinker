import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/tools',
    name: 'Tools',
    component: () => import('@/views/Tools.vue')
  },
  {
    path: '/ecommerce',
    name: 'Ecommerce',
    component: () => import('@/views/Ecommerce.vue')
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('@/views/Payment.vue')
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('@/views/Community.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 