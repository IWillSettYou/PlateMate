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
        const response = await this.checkLogin();

        if(response != true){
          this.$router.push({ name: 'Home' });
          this.isAuthorized = false; 
        } else this.isAuthorized = true

        this.loading = false; 
    } catch (error) {
        console.error("Hiba az API hívás során:", error);
    } 
  },  
  methods: {
    async checkLogin() {
      try {
        const response = await axios.get('http://localhost:3000/redirect', {
            params: {
              page: "kitchen"
            },
            withCredentials: true 
        });
        return response.data.isAuthorized; 
    } catch (error) {
        console.error("Hiba az API hívás során:", error);
        return false; 
    }
    }
  },
}

</script>

<template>
  <div>
    <p v-if="loading">Betöltés...</p>
    <p v-if="!loading && !isAuthorized">Nincs jogosultságod az oldal megtekintésére.</p>
    <div v-if="!loading && isAuthorized">
      <h1>Üdvözöljük az oldalon!</h1>
    </div>
  </div>
</template>

<style scoped>
</style>

