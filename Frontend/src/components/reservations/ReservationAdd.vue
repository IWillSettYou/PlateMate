<script>
import axios from 'axios';
import FloorPlan from './templates/FloorPlan.vue';
import ReservationForm from './additional/ReservationForm.vue';

export default {
  name: "ReservationAdd",
  components:{
    FloorPlan,
    ReservationForm
  },
  data() {
    return {
      loading: true,
      selectedTableId: ''
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
    },
    handleTableSelection(id) {
      this.selectedTableId = id;
      console.log("Kiválasztott asztal:", this.selectedTableId);
    }
  }
};
</script>

<template>
<p v-if="loading">Betöltés...</p>
<div v-if="!loading">
  <div class="bg-gray-900 min-h-max p-8 flex flex-col items-center">
    <div class="flex space-x-8">
      <FloorPlan @tableSelected="handleTableSelection" />
      <ReservationForm />
    </div>
  </div>
</div>
</template>
  
<style scoped>
h1 {
  color: #42b983;
}
</style>