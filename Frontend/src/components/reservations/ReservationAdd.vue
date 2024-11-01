<script>
import axios from 'axios';

export default {
  name: "ReservationAdd",
  data() {
    return {
      loading: true,
      sections: {}
    }
  },
  async mounted(){
    try {
        const response = await this.getSections();
        this.sections = response.data.data;
        this.loading = false
      } catch (error) {
        console.error("Hiba az ellenőrzés során:", error);
    } 
  },
  methods: {
    async getSections() {
      try {
        const response = await axios.get(`http://localhost:3000/permission-setting/`, {
          withCredentials: true 
        });
        
        if(response.status == 200) return response
      } catch (error) {
        console.log(error)
        const errorCode = error.response.data.message
        alert("Hiba a lekérés során: " + errorCode);
      }
    },
    async deleteSection(id){
      try {
        const response = await axios.delete(`http://localhost:3000/permission-setting/${id}`, {
        withCredentials: true 
      });
        if(response.status == 200) {
          this.sections.filter(section => section.id !== id)
          alert(response.data.message)
        }
      } catch (error) {
        console.log(error)
        alert("Hiba a törlés során");
      }
    }
  }
};
</script>

<template>
<p v-if="loading">Betöltés...</p>
<div v-if="!loading">
  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-sm w-full">
  <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6 text-center">Új foglalás</h2>

  
</div>
</div>
</template>
  
<style scoped>
h1 {
  color: #42b983;
}
</style>