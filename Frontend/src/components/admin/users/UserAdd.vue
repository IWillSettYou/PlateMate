
<script>
import axios from 'axios';

export default {
  name: "UserAdd",
  data() {
    return {
      loading: true,
      formData: {
        name: "",
        email: "",
        password: "",
        permissionId: "",
        sections:  []
      }
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
    async createUser(){
      try {
        const response = await axios.post('http://localhost:3000/register', { 
          name: this.formData.name,
          email: this.formData.email,
          password: this.formData.password,
          permissionId: this.formData.permissionId
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
    <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6 text-center">Felhasználó Létrehozás</h2>
    <form @submit.prevent="createUser">
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300 mb-2">Név</label>
        <input type="text" v-model="formData.name" class="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600" required/>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
        <input type="text" v-model="formData.email" class="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600" required/>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300 mb-2">Jelszó</label>
        <input type="text" v-model="formData.password" class="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600" required/>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-300 mb-2">Szekció</label>
        <select id="dropdown" v-model="formData.permissionId">
      <option v-for="section in sections" :key="section.id" :value="section.id">
        {{ section.section }}
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