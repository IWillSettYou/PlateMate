<script>
import axios from 'axios';
import MenuDropdown from "../../components/landing/MenuDropdown.vue";

export default {
  components: {
    MenuDropdown,
  },
  data(){
    return {
      openMenu: null,
      loading: true,
      isAdminVisible: false,
      isReservationsVisible: false,
      isOrdersVisible: false,
      isCashoutVisible: false,
    }
  },
  async mounted(){
    try {
        const response = await this.redirectHandler();

        if(response.isAuthorized != true) this.$router.push({ name: 'Login' });
        else {
          this.loading = false;

          switch(response.role){
            case  'admin':
              this.isAdminVisible = true;
              this.isOrdersVisible = true;
              this.isReservationsVisible = true;
              this.isCashoutVisible = true;
              break;
            case  'cashier':
              this.isCashoutVisible = true
            break;
            case  'chef':
              this.isOrdersVisible = true
              break;
            case  'waiter':
              this.isOrdersVisible = true;
              this.isReservationsVisible = true;
              break;
            default:
              break;
          }
        }
    } catch (error) {
        console.error("Hiba az ellenőrzés során:", error);
    } 
  },  
  methods: {
    async redirectHandler() {
      try {
        const response = await axios.get('http://localhost:3000/redirect', {
            params: {
              page: "home"
            },
            withCredentials: true 
        });

        return response.data; 
      } catch (error) {
          console.error("Hiba az API hívás során:", error);
          return false; 
      }
    },
    async logout(){
      try {
        const response = await axios.post('http://localhost:3000/logout', null, {
      withCredentials: true 
      });

        if (response.status == 200) this.$router.push({ name: 'Login' });
      } catch (error) {
        console.log("Hiba a kijelentkezés során: " + error)
        const errorCode = error.response.data.message
        alert("Hiba a kijelentkezés során: " + errorCode);
      }
    },
    toggleMenu(menuName) {
      this.openMenu = this.openMenu === menuName ? null : menuName;
    }
  },
}
</script>

<template>
<p v-if="loading">Betöltés...</p>
<div v-if="!loading">
  <div class="bg-gray-50 dark:bg-gray-900">
    <nav class="bg-white dark:bg-gray-800 shadow dark:border-gray-700 p-4">
      <div class="flex items-center justify-between">
        <div class="flex space-x-6"> 
          <MenuDropdown v-if="isAdminVisible"
          title="Admin Panel"
          :items="[
            { name: 'Ételek és Italok', path: '/items' },
            { name: 'Kategóriák', path: '/categories' },
            { name: 'Asztalok', path: '/tables' },
            { name: 'Fizetési módok', path: '/payment-methods' },
            { name: 'Kifizetett ételek', path: '/paid-orders' },
            { name: 'Szekciók', path: '/sections' },
            { name: 'Felhasználók', path: '/users' },
          ]"
          :isOpen="openMenu === 'AdminPanel'"
          @toggle="toggleMenu('AdminPanel')"
        />
        <router-link v-if="isReservationsVisible" to="/reservations" class="text-gray-900 dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
          Foglaláskezelés
        </router-link>

        <router-link v-if="isOrdersVisible" to="/orders" class="text-gray-900 dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
          Rendelések
        </router-link>

        <router-link v-if="isCashoutVisible" to="/cashout" class="text-gray-900 dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
          Kassza
        </router-link>
        </div>

        <button @click="logout" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          Kijelentkezés
        </button>

      </div>
    </nav>
  </div>
</div>
</template>

<style scoped>
</style>
