<script>
import axios from 'axios';
import FloorPlan from './templates/FloorPlan.vue';

export default {
  name: "ReservationAdd",
  components:{
    FloorPlan
  },
  data() {
    return {
      loading: true,
      name: null,
      nOfCustomers: null,
      date: null,
      formattedDate: null,
      day: null,
      startTime: null,
      endTime: null,
      selectedTableId: null,
      reservations: [],
      reservedTimes: [],
      availableStartTimes: [],
      availableEndTimes: [],
      selectedStartTime: null,
      selectedEndTime: null,
    }
  },
  async mounted(){
    try {
        this.loading = false
      } catch (error) {
        console.error("Hiba az ellenőrzés során:", error);
    } 
  },
  methods: {
    async getAvailableTimes() {
      try {
        const response = await axios.get(`http://localhost:3000/opening-hours/`, {
          withCredentials: true 
        });
        
        if(response.status == 200) {
          this.startTime = new Date(`1970-01-01T${response.data.data.filter(time => time.dayName == this.day).map(entry => entry.fromHour)[0]}:00`);
          this.endTime = new Date(`1970-01-01T${response.data.data.filter(time => time.dayName == this.day).map(entry => entry.untilHour)[0]}:00`);
        }
      } catch (error) {
        console.log(error)
        const errorCode = error.response.data.message
        alert("Hiba a lekérés során: " + errorCode);
      }
    },
    async getReservationOnDayByTable(){
      try {
        const response = await axios.get(`http://localhost:3000/reservation/reservations-on-day`, {
          params: { 
            tableId: this.selectedTableId, 
            fromDate: this.date 
          },
          withCredentials: true
        });
        if(response.status == 200) {
          this.reservations = response.data.data;
          return response
        }
      } catch (error) {
        console.log(error)
        alert("Hiba a Lekeres során");
      }
    },
    async postReservation(){
      try {
      
        const response = await axios.post('http://localhost:3000/reservation', { 
          tableId: this.selectedTableId,
          name: this.name,
          numberOfCustomers: this.nOfCustomers,
          reservedAt: this.date + " " +this.selectedStartTime,
          reservedUntil: this.date + " " +this.selectedEndTime
        }, 
        {
          withCredentials: true
        });
        alert(response.data.message)
      }
      catch (error){
        alert(error.response.data.message)
      }
    },
    handleTableSelection(id) {
      this.selectedTableId = id;
    },
    formatDate(dateg) {
      const year = dateg.getFullYear();
      const month = String(dateg.getMonth() + 1).padStart(2, '0');
      const day = String(dateg.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
    async getDayFromDate() {
      this.day = new Intl.DateTimeFormat('hu-HU', { weekday: 'long', timeZone: 'Europe/Budapest' }).format(new Date(this.date));
      this.day = this.day.charAt(0).toUpperCase() + this.day.slice(1);

      await this.getAvailableTimes()
      const resp = await this.getReservationOnDayByTable()
      
      if(resp.status != 200){
        this.availableStartTimes = []
        this.availableEndTimes = []
      }
      else{
        while (this.startTime < this.endTime) {

        const timeString = this.startTime.toTimeString().slice(0, 5);

        this.availableStartTimes.push(timeString);
        this.availableEndTimes.push(timeString);

        this.startTime.setHours(this.startTime.getHours() + 1);
        }

        this.availableStartTimes.pop()
        this.availableEndTimes.shift()

        this.reservedTimes = this.reservations.map(reservation => {
          return {
            start: new Date(reservation.reservedAt),
            end: new Date(reservation.reservedUntil)
          };
        });

        const filteredStartTimes = []
        const filteredEndTimes = []

          this.availableStartTimes.forEach(startTime => {
          const startDateTime = new Date(`2024-11-03T${startTime}:00`);
          
          const isReserved = this.reservedTimes.some(reserved => {
            return startDateTime >= reserved.start && startDateTime < reserved.end;
          });
          
          if (!isReserved) {
            filteredStartTimes.push(startTime);
          }
        });

        this.availableEndTimes.forEach(endTime => {
          const endDateTime = new Date(`2024-11-03T${endTime}:00`);
          
          const isReserved = this.reservedTimes.some(reserved => {
            return endDateTime > reserved.start && endDateTime <= reserved.end;
          });
          
          if (!isReserved) {
            filteredEndTimes.push(endTime);
          }
        });

        this.availableStartTimes = filteredStartTimes;
        this.availableEndTimes = filteredEndTimes;
      }
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
      <div class="flex flex-col items-center bg-gray-800 text-white p-6 rounded-lg space-y-4 max-w-md mx-auto shadow-lg">
    <h2 class="text-lg font-semibold">Adatok</h2>
    <div class="flex flex-col space-y-3 w-full">
      <input type="text" v-model="name" placeholder="Név" class="bg-gray-700 text-white rounded-lg py-2 px-4 w-full" />
      <input type="number" v-model="nOfCustomers" placeholder="Fők száma" class="bg-gray-700 text-white rounded-lg py-2 px-4 w-full" />
      <input type="date" @change="getDayFromDate" v-model="this.date" class="bg-gray-700 text-white rounded-lg py-2 px-4 w-full" />
      <div class="mb-4">
          <label class="block text-gray-400 dark:text-gray-300 mb-2">Ettől</label>
          <select
            id="dropdown"
            v-model="selectedStartTime"
            class="bg-gray-600 hover:bg-gray-500 text-white rounded-lg py-2 w-full font-semibold"
          >
            <option v-for="availableTime in availableStartTimes" :key="availableTime" :value="availableTime">
              {{ availableTime }}
            </option>
          </select>
        </div>
            <div class="mb-4">
          <label class="block text-gray-400 dark:text-gray-300 mb-2">Eddig</label>
          <select
            id="dropdown"
            v-model="selectedEndTime"
            class="bg-gray-600 hover:bg-gray-500 text-white rounded-lg py-2 w-full font-semibold"
          >
            <option v-for="availableTime in availableEndTimes" :key="availableTime" :value="availableTime">
              {{ availableTime }}
            </option>
          </select>
        </div>
      <button @click="postReservation" class="bg-gray-600 hover:bg-gray-500 text-white rounded-lg py-2 w-full font-semibold">
        Foglalás
      </button>
    </div>
  </div>
    </div>
  </div>
</div>
</template>
  
<style scoped>
h1 {
  color: #42b983;
}
</style>