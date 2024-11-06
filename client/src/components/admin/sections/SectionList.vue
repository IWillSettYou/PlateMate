<script>
import axios from 'axios';

export default {
  name: "SectionList",
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
  <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6 text-center">Szekciók</h2>

  <div class="overflow-x-auto">
    <table class="min-w-full bg-blue-50 border border-gray-200 rounded-lg shadow-lg">
      <thead>
        <tr class="bg-blue-100 border-b">
          <th class="py-3 px-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">ID</th>
          <th class="py-3 px-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Szekció</th>
          <th class="py-3 px-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Művelet</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(section, index) in sections" :key="index" class="hover:bg-blue-100 border-b">
          <td class="py-4 px-4 text-sm font-medium text-gray-900">{{ section.id }}</td>
          <td class="py-4 px-4 text-sm text-gray-500">{{ section.section }}</td>
          <td class="py-4 px-4 text-sm">
            <button @click="deleteSection(section.id)" class="bg-red-500 hover:bg-red-800 text-white font-bold py-1 px-3 rounded">
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