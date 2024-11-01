<script>
import axios from 'axios';
import { ref, computed } from 'vue';
import ScrollableTable from './scrollables/ScrollableTable.vue';

export default {
  components: { ScrollableTable },
  name: "NewOrder",
  data() {
    return {
      searchTerm: '',
      tables: [],
      selectedTable: 0,
      items: [], 
      selectedItems: [], 
      selectedItemIds: []
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  async mounted() {
    try {
      const items = await this.getItems();
      const tables = await this.getTables();
      this.items = items.data.data; 
      this.tables =  tables.data.data;
    } catch (error) {
      console.error("Hiba az ellenőrzés során:", error);
    }
  },
  methods: {
    addItemToSelected(item) {
      this.selectedItems.push(item);
    },
    removeItemFromSelected(index) {
      this.selectedItems.splice(index, 1); 
    },
    async putSelectedItemsIdsToArray(){
      this.selectedItemIds = this.selectedItems.map(item => item.id);
    },
    async getTables() {
      try {
        const response = await axios.get(`http://localhost:3000/table/`, {
          withCredentials: true 
        });
        
        if(response.status == 200) return response
      } catch (error) {
        console.log(error)
        const errorCode = error.response.data.message
        alert("Hiba a lekérés során: " + errorCode);
      }
    },
    async getItems() {
      try {
        const response = await axios.get(`http://localhost:3000/item`, {
          withCredentials: true 
        });
        
        if(response.status == 200) return response
      } catch (error) {
        console.log(error)
      }
    },
    async sendOrder(){
      try {
        await this.putSelectedItemsIdsToArray(); 
        const itemIds = this.selectedItemIds; 

        console.log(itemIds)
        console.log(this.selectedTable)
        const response = await axios.post('http://localhost:3000/order', { 
          tableId: this.selectedTable,
          items: itemIds,
        }, 
        {
          withCredentials: true
        });
        alert(response.data.message)
      }
      catch (error){
        alert(error.response.data.message)
      }
    }
  }
};
</script>

<template>
 <div class="flex justify-center mt-10 bg-gray-900 min-h-fit p-8 text-white">
    <div class="card-body w-full max-w-6xl p-8 bg-gray-800 rounded-lg shadow-lg flex flex-col space-y-8">
      <div class="flex space-x-8">

        <div class="w-1/2">
          <h2 class="text-2xl font-semibold mb-6">Termékek listája</h2>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Keresés..."
            class="border border-gray-700 rounded-md p-3 mb-6 w-full bg-gray-700 text-white placeholder-gray-400"
          />
          <ScrollableTable :items="filteredItems" @add-item="addItemToSelected" />
        </div>

        <div class="w-1/2">
          <h2 class="text-2xl font-semibold mb-6">Hozzáadott termékek</h2>
          <ScrollableTable :items="selectedItems" :hideAddButton="true" @remove-item="removeItemFromSelected" />
        </div>
      </div>

      <div class="flex justify-between items-center mt-8">
        <div class="mb-4">
          <label class="block text-gray-400 dark:text-gray-300 mb-2">Asztalszám</label>
          <select
            id="dropdown"
            v-model="selectedTable"
            class="border border-gray-700 rounded-md p-2 bg-gray-700 text-white"
          >
            <option v-for="table in tables" :key="table.id" :value="table.id">
              {{ table.tableNumber }}
            </option>
          </select>
        </div>
        <button @click="sendOrder()" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Leadás
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>