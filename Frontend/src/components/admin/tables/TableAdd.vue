
<script>
import axios from 'axios';

export default {
  name: "TableAdd",
  data() {
    return {
      formData: {
        tableNumber: ''
      }
    }
  },
  methods: {
    async addTable(){
      try {
        const response = await axios.post('http://localhost:3000/table', { tableNumber: this.formData.tableNumber }, {
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
  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-sm w-full">
    <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6 text-center">Asztal Hozzáadás</h2>
    <form @submit.prevent="addTable">
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300 mb-2">Asztal szám</label>
        <input type="number" v-model="formData.tableNumber" class="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600" required/>
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
        Hozzáadás
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>