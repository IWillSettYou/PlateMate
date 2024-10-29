import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import FirstPage from '../components/pages/FirstPage.vue'

const routes = [
  { path: '/', name:  'Home', component: Home },
  { path: '/FirstPage', component: FirstPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router