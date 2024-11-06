<script>
import axios from 'axios';

export default {
  name: "CategoryAdd",
  data() {
    return {
      formData: {
        categoryName: ''
      }
    }
  },
  methods: {
    async createCategory(){
      try {
        const response = await axios.post('http://localhost:3000/category', { name: this.formData.categoryName }, {
          withCredentials: true
        });
        alert(response.data.message)
        console.log(response)
      }
      catch (error){
        console.log(error)
      }
    }
  }
};
</script>

<template>
  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-sm w-full">
    <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6 text-center">Kategória készítés</h2>
    <form @submit.prevent="createCategory">
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300 mb-2">Kategória név</label>
        <input type="text" id="email" v-model="formData.categoryName" class="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600" required/>
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
        Leadás
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>