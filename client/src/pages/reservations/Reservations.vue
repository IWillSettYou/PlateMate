<script>
import axios from 'axios';

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLogout } from '@mdi/js';

import ReservationAdd from '../../components/reservations/ReservationAdd.vue';
import ReservationList from '../../components/reservations/ReservationList.vue';
import Popup from '../../components/popup/Popup.vue';

export default {
  components:{
    ReservationAdd,
    ReservationList,
    Popup,
    SvgIcon
  },
  data(){
    return {
      currentComponent: "ReservationAdd",
      isMobileMenuOpen: false,
      isMobile: false,
      popupMessage: null,
      popupType: null,
      popupVisible: false,
      iconPath: mdiLogout,
    }
  },
  async mounted(){
    try {
      await this.redirectHandler();
    } catch (error) {
      this.triggerPopup("Hiba történt a betöltés során!" ,"error")
    } 

    this.isMobile = window.innerWidth <= 1100;
    window.addEventListener("resize", this.updateIsMobile);
  },
  methods: {
    async redirectHandler() {
      try {
        const response = await axios.get('http://localhost:3000/redirect', {
          params: { page: "reservations" },
          withCredentials: true
        });

        if (response.data.isAuthorized !== true) {
          if(response.data.message == "Invalid Role") this.$router.push({ name: 'Home' });
          else this.$router.push({ name: 'Login' });
        }
      } catch (error) {
        this.triggerPopup("Hiba történt a betöltés során!","error");
        return false
      }
    },
    async logout() {
      try {
        const response = await axios.post('http://localhost:3000/logout', null, {
          withCredentials: true
        });

        if (response.status === 200) this.$router.push({ name: 'Login' });
        this.triggerPopup("Hiba történt a kijelentkezés során!","error");
      } catch (error) {
        this.triggerPopup("Hiba történt a kijelentkezés során!","error");
      }
    },
    triggerPopup(message, type) {
      this.popupMessage = message;
      this.popupType = type;
      this.popupVisible = true;

      setTimeout(() => {
        this.popupVisible = false;
      }, 3000);
    },
    updateIsMobile() {
      this.isMobile = window.innerWidth <= 1100;
    }
  },
} 

</script>

<template>

<div class="home-bg">
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-left">
          <button class="hamburger-menu" @click="isMobileMenuOpen = !isMobileMenuOpen">&#9776;</button>
          
          <RouterLink v-if="!isMobileMenuOpen && !isMobile" to="/">
            <button class="navbar-link">Back</button>
          </RouterLink>
        </div>
        
        <div v-if="!isMobileMenuOpen" class="navbar-center">
          <button @click="currentComponent = 'ReservationAdd'" class="navbar-link">Új foglalás</button>
          <button @click="currentComponent = 'ReservationList'" class="navbar-link">Foglalások lista</button>
        </div>
        
        <div class="navbar-right">
          <button @click="logout" class="logout-button">
            Kijelentkezés
            <svg-icon type="mdi" :path="iconPath" />
          </button>
        </div>
      </div>
      
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <RouterLink to="/" @click="isMobileMenuOpen = false">
          <button class="navbar-link">Back</button>
        </RouterLink>
        <button @click="currentComponent = 'ReservationAdd'" class="navbar-link">Új foglalás</button>
        <button @click="currentComponent = 'ReservationList'" class="navbar-link">Foglalások lista</button>
      </div>
    </nav>

    <div class="content-body">
      <component :is="currentComponent"></component>
    </div>
  </div>

  <Popup
    v-if="popupVisible"
    :message="popupMessage"
    :popupType="popupType"
    :isVisible="popupVisible"
  />


<p v-if="loading">Betöltés...</p>
<div v-if="!loading">
    <div class="bg-gray-50 dark:bg-gray-900">
      <nav class="bg-white dark:bg-gray-800 shadow dark:border-gray-700 p-4">
        <div class="flex items-center">
          <RouterLink to="/" class="mr-auto">
            <button class="ml-auto text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-m px-4 py-2">
              Back
            </button>
          </RouterLink>

          <div class="flex space-x-6 mx-auto">
            <button @click="currentComponent = 'ReservationAdd'" class="ml-auto text-white bg-slate-600 hover:bg-slate-700 font-medium rounded-lg text-m px-4 py-2">
              New Reservation
            </button>
            <button @click="currentComponent = 'ReservationList'" class="ml-auto text-white bg-slate-600 hover:bg-slate-700 font-medium rounded-lg text-m px-4 py-2">
              Reservation List
            </button>
          </div>

          <button @click="logout" class="ml-auto text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-m px-4 py-2">
            Kijelentkezés
          </button>
        </div>
      </nav>
    </div>

    <div class="flex-grow flex items-center justify-center min-h-screen">
      <component :is="currentComponent"></component>
    </div>
</div>
</template>

<style scoped>
</style>

