<script>
import axios from 'axios';

export default {
  name: "ReservationList",
  data() {
    return {
      loading: true,
      reservations: {}
    }
  },
  async mounted(){
    try {
        const response = await this.getReservations();
        this.reservations = response.data.data;
        this.loading = false
      } catch (error) {
        console.error("Hiba az ellenőrzés során:", error);
    } 
  },
  methods: {
    async getReservations() {
      try {
        const response = await axios.get(`http://localhost:3000/reservation/`, {
          withCredentials: true 
        });
        
        if(response.status == 200) return response
      } catch (error) {
        console.log(error)
        const errorCode = error.response.data.message
        alert("Hiba a lekérés során: " + errorCode);
      }
    },
    async deleteReservation(id){
      try {
        const response = await axios.delete(`http://localhost:3000/reservation/${id}`, {
        withCredentials: true 
      });
        if(response.status == 200) {
          this.reservations.filter(reservation => reservation.id !== id)
          alert(response.data.message)
        }
      } catch (error) {
        console.log(error)
        alert("Hiba a törlés során");
      }
    },
    formatDateTime(isoString) {
      const date = new Date(isoString);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0'); 
      const hours = String(date.getHours()).padStart(2, '0'); 
      const minutes = String(date.getMinutes()).padStart(2, '0'); 

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
  }
};
</script>

<template>
<p v-if="loading">Betöltés...</p>
<div v-if="!loading">
  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-fit w-full">
  <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6 text-center">Foglalások</h2>

  <div class="overflow-x-auto">
    <table class="min-w-full bg-blue-50 border border-gray-200 rounded-lg shadow-lg">
      <thead>
        <tr class="bg-blue-100 border-b">
          <th class="py-3 px-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">ID</th>
          <th class="py-3 px-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Név</th>
          <th class="py-3 px-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Vendégek</th>
          <th class="py-3 px-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Asztalszám</th>
          <th class="py-3 px-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Ettől</th>
          <th class="py-3 px-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Eddig</th>
          <th class="py-3 px-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Művelet</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(reservation, index) in reservations" :key="index" class="hover:bg-blue-100 border-b">
          <td class="py-4 px-4 text-sm font-medium text-gray-900">{{ reservation.id }}</td>
          <td class="py-4 px-4 text-sm font-medium text-gray-900">{{ reservation.name }}</td>
          <td class="py-4 px-4 text-sm font-medium text-gray-900">{{ reservation.numberOfCustomers }}</td>
          <td class="py-4 px-4 text-sm font-medium text-gray-900">{{ reservation.tableNumber }}</td>
          <td class="py-4 px-4 text-sm font-medium text-gray-900">{{ formatDateTime(reservation.reservedAt) }}</td>
          <td class="py-4 px-4 text-sm font-medium text-gray-900">{{ formatDateTime(reservation.reservedUntil) }}</td>
          <td class="py-4 px-4 text-sm">
            <button @click="deleteReservation(reservation.id)" class="bg-red-500 hover:bg-red-800 text-white font-bold py-1 px-3 rounded">
              Törlés
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>
</template>
  
<style scoped>
h1 {
  color: #42b983;
}
</style>