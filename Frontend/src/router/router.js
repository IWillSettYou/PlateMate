import { createRouter, createWebHistory } from 'vue-router'
//Landing
import Home from '../pages/landing/Home.vue'
//Auth
import Login from '../pages/auth/Login.vue'
//Cashout
import Cashout from '../pages/cashout/Cashout.vue'
//Admin
import Categories from '../pages/admin/Categories.vue'
import FoodsAndDrinks from '../pages/admin/FoodsAndDrinks.vue'
import Tables from '../pages/admin/Tables.vue'
import PaymentMethods from '../pages/admin/PaymentMethods.vue'
import PaidOrders from '../pages/admin/PaidOrders.vue'
import Sections from '../pages/admin/Sections.vue'
import Users from '../pages/admin/Users.vue'
//Restaurant
import NewReservations from '../pages/restaurant/NewReservations.vue'
import Reservation from '../pages/restaurant/Reservation.vue'
import NewOrders from '../pages/restaurant/NewOrders.vue'
import Orders from '../pages/restaurant/Orders.vue'
//Kitchen
import FinishedOrders from '../pages/kitchen/FinishedOrders.vue'
import InProcessOrders from '../pages/kitchen/InProcessOrders.vue'



const routes = [
  { path: '/', name:  'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/cashout',  name: 'Cashout', component: Cashout },
  { path: '/foods-and-drinks',  name: 'FoodsAndDrinks', component: FoodsAndDrinks },
  { path: '/categories',  name: 'Categories', component: Categories },
  { path: '/tables',  name: 'Tables', component: Tables },
  { path: '/payment-methods',  name: 'PaymentMethods', component: PaymentMethods },
  { path: '/paid-orders',  name: 'PaidOrders', component: PaidOrders },
  { path: '/sections',  name: 'Sections', component: Sections },
  { path: '/users',  name: 'Users', component: Users },
  { path: '/new-reservation',  name: 'NewReservations', component: NewReservations },
  { path: '/reservations',  name: 'Reservations', component: Reservation },
  { path: '/new-order',  name: 'NewOrders', component: NewOrders },
  { path: '/orders',  name: 'Orders', component: Orders },
  { path: '/finished-orders',  name: 'FinishedOrders', component: FinishedOrders },
  { path: '/inprocess-orders',  name: 'InProcessOrders', component: InProcessOrders }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
