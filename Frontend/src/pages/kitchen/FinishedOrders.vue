<script>
import axios from 'axios';

export default {
  data(){
    return {
      loading: true,
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
              page: "kitchen"
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
  <div>
    <p v-if="loading">Betöltés...</p>
    <div v-if="!loading">
      <RouterLink to="/">
            <Button>Back</Button>
      </RouterLink>
      <h1>Üdvözöljük a FinishedOrders oldalon!</h1>
      <button @click="logout()">logout</button>
    </div>
  </div>
</template>

<style scoped>
</style>

