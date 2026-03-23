import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const router = createRouter({
  history: createWebHistory('/base39-animations/'),
  routes: [{ path: '/', component: Home }],
})

export default router
