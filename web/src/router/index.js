import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/config',
    name: 'config',
    component: () => import('@/views/ConfigView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
