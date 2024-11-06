<script>
import axios from 'axios';
import PaidOrderList from '../../components/admin/paidOrders/PaidOrderList.vue';

export default {
  components : {
    PaidOrderList
  },
  data(){
    return {
      loading: true,
      currentComponent: "PaidOrderList"
    }
  },
  async mounted(){
    try {
        const response = await this.redirectHandler();

        if(response.isAuthorized != true){  
          if(response.message == "Invalid Credentials") this.$router.push({ name: 'Login' });
          else { this.$router.push({ name: 'Home' }); }
        } else {
          this.loading = false;
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
              page: "admin"
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
    }
  },
} 

</script>

<template>
<p v-if="loading">Betöltés...</p>
<div v-if="!loading">
    <div class="bg-gray-50 dark:bg-gray-900">
      <nav class="bg-white dark:bg-gray-800 shadow dark:border-gray-700 p-4">
        <div class="flex items-center">
          <RouterLink to="/" class="mr-auto">
            <button class="ml-auto text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-m px-4 py-2">
              Back
            </button>
          </RouterLink>

          <button @click="logout" class="ml-auto text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-m px-4 py-2">
            Kijelentkezés
          </button>
        </div>
      </nav>
    </div>
    <div class="flex-grow flex items-center justify-center min-h-screen">
        <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<style scoped>
</style>

