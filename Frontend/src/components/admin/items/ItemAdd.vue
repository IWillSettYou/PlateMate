
<script>
import axios from 'axios';

export default {
  name: "ItemAdd",
  data() {
    return {
      loading: true,
      formData: {
        name: "",
        price: 0,
        categoryId: "",
        categories:  []
      }
    }
  },
  async mounted(){
    try {
        const response = await this.getCategories();
        this.categories = response.data.data;
        this.loading = false
      } catch (error) {
        console.error("Hiba az ellenőrzés során:", error);
    } 
  },
  methods: {
    async getCategories() {
      try {
        const response = await axios.get(`http://localhost:3000/category/`, {
          withCredentials: true 
        });
        
        if(response.status == 200) return response
      } catch (error) {
        console.log(error)
        const errorCode = error.response.data.message
        alert("Hiba a lekérés során: " + errorCode);
      }
    },
    async createItem(){
      try {
        const response = await axios.post('http://localhost:3000/item', { 
          name: this.formData.name,
          price: this.formData.price,
          categoryId: this.formData.categoryId
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
  <p v-if="loading">Betöltés...</p>
  <div v-if="!loading">
  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-sm w-full">
    <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6 text-center">Termék Létrehozás</h2>
    <form @submit.prevent="createItem">
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300 mb-2">Név</label>
        <input type="text" v-model="formData.name" class="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600" required/>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300 mb-2">Ár</label>
        <input type="number" v-model="formData.price" class="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600" required/>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300 mb-2">Kategória</label>
        <select id="dropdown" v-model="formData.categoryId">
      <option v-for="category in categories" :key="category.id" :value="category.id">
        {{ category.name }}
      </option>
    </select>
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
        Létrehozás
      </button>
    </form>
  </div>
  </div>
</template>

<style scoped>

</style>