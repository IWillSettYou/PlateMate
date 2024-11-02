import { createRouter, createWebHistory } from 'vue-router'
//Landing
import Home from '../pages/landing/Home.vue'
//Auth
import Login from '../pages/auth/Login.vue'
//Cashout
import Cashout from '../pages/cashout/Cashout.vue'
//Admin
import Categories from '../pages/admin/Categories.vue'
import Items from '../pages/admin/Items.vue'
import Tables from '../pages/admin/Tables.vue'
import PaymentMethods from '../pages/admin/PaymentMethods.vue'
import PaidOrders from '../pages/admin/PaidOrders.vue'
import Sections from '../pages/admin/Sections.vue'
import Users from '../pages/admin/Users.vue'
import OpeningHours from '../pages/admin/OpeningHours.vue'
//Reservations
import Reservation from '../pages/reservations/Reservations.vue'
//Orders
import Orders from '../pages/orders/Orders.vue'



const routes = [
  { path: '/', name:  'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/cashout',  name: 'Cashout', component: Cashout },
  { path: '/items',  name: 'Items', component: Items },
  { path: '/opening-hours',  name: 'OpeningHours', component: OpeningHours },
  { path: '/categories',  name: 'Categories', component: Categories },
  { path: '/tables',  name: 'Tables', component: Tables },
  { path: '/payment-methods',  name: 'PaymentMethods', component: PaymentMethods },
  { path: '/paid-orders',  name: 'PaidOrders', component: PaidOrders },
  { path: '/sections',  name: 'Sections', component: Sections },
  { path: '/users',  name: 'Users', component: Users },
  { path: '/reservations',  name: 'Reservations', component: Reservation },
  { path: '/orders',  name: 'Orders', component: Orders }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router