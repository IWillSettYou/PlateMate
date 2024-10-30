<script>
import axios from 'axios';

export default {
  data(){
    return {
      loading: true,
      isAuthorized: false
    }
  },
  async mounted(){
    try {
        const response = await this.redirectHandler();

        if(response.isAuthorized != true) this.$router.push({ name: 'Login' });
        else {
          this.isAuthorized = true
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
              page: "home"
            },
            withCredentials: true 
        });
        return response.data; 
    } catch (error) {
        console.error("Hiba az API hívás során:", error);
        return false; 
    }
    }
  },
}
</script>

<template>
  <p v-if="loading">Betöltés...</p>
  <div v-if="!loading && isAuthorized">
    <nav class="bg-gray-600 p-4 rounded-md">
    <ul class="flex space-x-4">
      <li>
        <router-link to="/KitchenPage" class="text-white hover:underline ">Kitchen</router-link>
      </li>
      <li>
        <router-link to="/CashoutPage" class="text-white hover:underline ">Cashout</router-link>
      </li>
    </ul>
  </nav>
  </div>
</template>

<style scoped>
</style>
