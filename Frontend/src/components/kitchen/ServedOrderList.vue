<script>
import axios from 'axios';

export default {
  name: "ServedOrderList",
  data() {
    return {
      notEmpty: false,
      orders: {}
    }
  },  
  async mounted(){
    try {
        const response = await this.getServedOrders();
        try{
          this.orders = response.data.data;
          this.notEmpty = true;
          this.loading = false
        }catch(error){
          this.loading = false;
        }
      } catch (error) {
        console.error("Hiba az ellenőrzés során:", error);
    } 
  },
  methods: {
    async getServedOrders() {
      try {
        const response = await axios.get(`http://localhost:3000/order/served`, {
          withCredentials: true 
        });
        
        if(response.status == 200) return response
      } catch (error) {
        console.log(error)
      }
    },
    async rollbackServedOrder(id){
      try {
        const response = await axios.put(`http://localhost:3000/order/rollback-served/${id}`, {}, 
        {
          withCredentials: true
        });

        if(response.status == 200) {
          alert(response.data.message)
        }
      } catch (error) {
        console.log(error)
        alert("Hiba az átállitás során");
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
      <h1 v-if="!notEmpty" class="text-6xl">Nincsenek Felszolgált rendelések</h1>
        <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-fit w-full"  v-if="notEmpty">
        <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6 text-center">Felszolgált rendelések</h2>

        <div class="overflow-x-auto">
          <table class="min-w-full bg-blue-50 border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr class="bg-blue-100 border-b">
                <th class="py-3 px-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">ID</th>
                <th class="py-3 px-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Asztalszám</th>
                <th class="py-3 px-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Termék</th>
                <th class="py-3 px-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Felvéve</th>
                <th class="py-3 px-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Művelet</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, index) in orders" :key="index" class="hover:bg-blue-100 border-b">
                <td class="py-4 px-4 text-sm font-medium text-gray-900">{{ order.id }}</td>
                <td class="py-4 px-4 text-sm font-medium text-gray-900">{{ order.tableNumber }}</td>
                <td class="py-4 px-4 text-sm font-medium text-gray-900">{{ order.itemName }}</td>
                <td class="py-4 px-4 text-sm font-medium text-gray-900">{{ formatDateTime(order.orderedAt) }}</td>
                <td class="py-4 px-4 text-sm">
                  <button @click="rollbackServedOrder(order.id)" class="bg-red-500 hover:bg-red-800 text-white font-bold py-1 px-3 rounded">
                    Vissza
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
</template>

<style scoped>

</style>