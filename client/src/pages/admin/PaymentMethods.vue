<script>
import axios from 'axios';

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLogout } from '@mdi/js';

import PaymentMethodAdd from '../../components/admin/paymentMethods/PaymentMethodAdd.vue';
import PaymentMethodList from '../../components/admin/paymentMethods/PaymentMethodList.vue';
import Popup from '../../components/popup/Popup.vue';

export default {
  components: {
    PaymentMethodAdd,
    PaymentMethodList,
    Popup,
    SvgIcon
  },
  data(){
    return {
      currentComponent: "PaymentMethodAdd",
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

    this.isMobile = window.innerWidth <= 768;
    window.addEventListener("resize", this.updateIsMobile);
  },  
  methods: {
    async redirectHandler() {
      try {
        const response = await axios.get('http://localhost:3000/redirect', {
          params: { page: "admin" },
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
      this.isMobile = window.innerWidth <= 768;
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
          <button @click="currentComponent = 'PaymentMethodAdd'" class="navbar-link">Új Fizetési mód</button>
          <button @click="currentComponent = 'PaymentMethodList'" class="navbar-link">Fizetési módok lista</button>
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
        <button @click="currentComponent = 'PaymentMethodAdd'" class="navbar-link">Új Fizetési mód</button>
        <button @click="currentComponent = 'PaymentMethodList'" class="navbar-link">Fizetési módok lista</button>
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
</template>

<style scoped>
.home-bg {
  background-color: #121212;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: #282828;
  padding: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #49d0ce;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.navbar-left,
.navbar-center,
.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-center {
  gap: 20px;
}

.hamburger-menu {
  display: none;
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.menu-items {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.navbar-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  transition: background-color 0.3s;
  background-color: #282828;
  cursor: pointer;
}

.navbar-link:hover {
  background-color: #3f3f3f;
}

.logout-button {
  background-color: #282828;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #3f3f3f;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 60px;
  left: 0;
  background-color: #282828;
  width: 100%;
  padding: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mobile-menu .navbar-link {
  width: 100%;
  text-align: left;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  transition: background-color 0.3s;
}

.mobile-menu .navbar-link:hover {
  background-color: #3f3f3f;
}

.content-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  min-height: 70vh;
  margin: 8px;
}

@media (max-width: 768px) {
  .hamburger-menu {
    display: block;
  }

  .navbar-center,
  .navbar-left > .navbar-link {
    display: none;
  }

  .mobile-menu {
    display: flex;
  }
}
</style>

