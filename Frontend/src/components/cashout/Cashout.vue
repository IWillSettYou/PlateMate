
<script>
import axios from 'axios';
import ScrollableTable from './table/ScrollableTable.vue';

export default {
  name: "Cashout",
  components: {
    ScrollableTable
  },
  data() {
    return {
      items: [],
      tables: [],
      paymentMethods: [],
      sumPrice: 0,
      selectedPaymentMethod: '',
      selectedTable: ''
    }
  },
  async mounted(){
    try { 
      await this.getTables();
      await this.getPaymentMethods();
    } catch (error) {
      console.error("Hiba az ellenőrzés során:", error);
    }
  },
  methods: {
    async getConsumedItems(id) {
      try {
        const response = await axios.get(`http://localhost:3000/order/for-checkout/${id}`, {
          withCredentials: true 
        });
        
        if(response.status == 200) {
          this.items = response.data.data;
        }
      } catch (error) {
        console.log(error)
        const errorCode = error.response.data.message
        alert("Hiba a lekérés során: " + errorCode);
      }
    },
    async getTables() {
      try {
        const response = await axios.get(`http://localhost:3000/table/`, {
          withCredentials: true 
        });
        
        if(response.status == 200) {
          this.tables =  response.data.data;
        }
      } catch (error) {
        console.log(error)
        const errorCode = error.response.data.message
        alert("Hiba a lekérés során: " + errorCode);
      }
    },
    async getPaymentMethods() {
      try {
        const response = await axios.get(`http://localhost:3000/payment-method/`, {
          withCredentials: true 
        });
        
        if(response.status == 200) {
          this.paymentMethods = response.data.data;
        }
      } catch (error) {
        console.log(error)
        const errorCode = error.response.data.message
        alert("Hiba a lekérés során: " + errorCode);
      }
    },
    async deleteOrders(ids) {
      try {
        const response = await axios.delete(`http://localhost:3000/order/mass-delete/`,  
        {
          data: { items: ids },
          withCredentials: true
        });
        
      } catch (error) {
        console.log(error)
        const errorCode = error.response.data.message
        alert("Hiba a lekérés során: " + errorCode);
      }
    },
    async onTableChange() {
      try {
        await this.getConsumedItems(this.selectedTable); 
        this.sumPrice = this.items.reduce((total, item) => total + (item.itemPrice || 0), 0);
      } catch (error) {
        console.error("Hiba az ellenőrzés során:", error);
      }
    },
    async sendPaid() {
      const ids = this.items.map(item => item.itemId);

      try {
        const response = await axios.post('http://localhost:3000/paid/', 
        { 
          tableId: this.selectedTable,
          paymentMethodId: this.selectedPaymentMethod,
          items: ids
        }, 
        {
          withCredentials: true
        });
        alert(response.data.message)
        console.log(response)
        if(response.status == 200) {
          const orderIds = this.items.map(item => item.id)
          await this.deleteOrders(orderIds)
        }
      }
      catch (error){
        alert(error.response.data.message)
      }
    }
  },
};
</script>

<template>
 <div class="flex justify-center mt-10 bg-gray-900 min-h-fit p-8 text-white w-1/5">
    <div class="card-body w-full p-8 bg-gray-800 rounded-lg shadow-lg flex flex-col space-y-8">
      <div class="flex justify-center space-x-8">

        <div class="w-max">
          <h2 class="text-2xl font-semibold mb-6">Elfogyasztott termékek</h2>
          <ScrollableTable :items="items" />
        </div>
      </div>

      <div class="flex justify-between items-center mt-8">
        <div class="mb-4">
          <label class="block text-gray-400 dark:text-gray-300 mb-2">Asztalszám</label>
          <select
            id="dropdown"
            v-model="selectedTable"
            @change="onTableChange"
            class="border border-gray-700 rounded-md p-2 bg-gray-700 text-white">
            <option v-for="table in tables" :key="table.id" :value="table.id">
              {{ table.tableNumber }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-gray-400 dark:text-gray-300 mb-2">Fizetési mód</label>
          <select
            id="dropdown"
            v-model="selectedPaymentMethod"
            class="border border-gray-700 rounded-md p-2 bg-gray-700 text-white">
            <option v-for="paymentMethod in paymentMethods" :key="paymentMethod.id" :value="paymentMethod.id">
              {{ paymentMethod.name }}
            </option>
          </select>
        </div>

        <h1>Végösszeg:  {{ sumPrice }}</h1>

        <button @click="sendPaid()" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Kifizetés
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>