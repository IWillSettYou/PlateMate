import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import KitchenPage from '../components/pages/KitchenPage.vue'
import LoginPage from '../components/pages/LoginPage.vue'
import CashoutPage from '../components/pages/CashoutPage.vue'

const routes = [
  { path: '/', name:  'Home', component: Home },
  { path: '/KitchenPage',  name: 'KitchenPage', component: KitchenPage },
  { path: '/CashoutPage',  name: 'CashoutPage', component: CashoutPage },
  { path: '/login', name: 'Login', component: LoginPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router