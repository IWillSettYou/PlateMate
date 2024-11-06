<script>
import axios from 'axios';

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLogout } from '@mdi/js';

import MenuDropdown from "../../components/landing/MenuDropdown.vue";
import Popup from '../../components/popup/Popup.vue';

export default {
  components: {
    Popup,
    MenuDropdown,
    SvgIcon
  },
  data() {
    return {
      openMenu: null,
      isAdminVisible: false,
      isReservationsVisible: false,
      isOrdersVisible: false,
      isCashoutVisible: false,
      isMobileMenuOpen: false,
      popupMessage: "",
      popupType: "",
      popupVisible: false,
      iconPath: mdiLogout
    };
  },
  async mounted() {
    try {
      const response = await this.redirectHandler();

      if(response != false){
        switch (response.role) {
        case 'admin':
          this.isAdminVisible = true;
          this.isOrdersVisible = true;
          this.isReservationsVisible = true;
          this.isCashoutVisible = true;
          break;
        case 'cashier':
          this.isCashoutVisible = true;
          break;
        case 'chef':
          this.isOrdersVisible = true;
          break;
        case 'waiter':
          this.isOrdersVisible = true;
          this.isReservationsVisible = true;
          break;
        default:
          break;
      }
      }
    } catch (error) {
      this.triggerPopup("Hiba történt a jogok ellenőrzése során!" ,"error")
    }
  },
  methods: {
    async redirectHandler() {
      try {
        const response = await axios.get('http://localhost:3000/redirect', {
          params: { page: "home" },
          withCredentials: true
        });

        if (response.data.isAuthorized != true) this.$router.push({ name: 'Login' });
        else return response.data;
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
      } catch (error) {
        this.triggerPopup("Hiba történt a kijelentkezés során!","error");
      }
    },
    toggleMenu(menuName) {
      this.openMenu = this.openMenu === menuName ? null : menuName;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    triggerPopup(message, type) {
      this.popupMessage = message;
      this.popupType = type;
      this.popupVisible = true;

      setTimeout(() => {
        this.popupVisible = false;
      }, 3000);
    },
  }
};
</script>

<template>
  <div class="home-bg">
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-left">
          <button class="hamburger-menu" @click="toggleMobileMenu">&#9776;</button>
          <div v-if="isMobileMenuOpen" class="mobile-menu">
            <MenuDropdown
              v-if="isAdminVisible"
              title="Admin Panel"
              :items="[
                { name: 'Termékek', path: '/items' },
                { name: 'Kategóriák', path: '/categories' },
                { name: 'Asztalok', path: '/tables' },
                { name: 'Fizetési módok', path: '/payment-methods' },
                { name: 'Kifizetett ételek', path: '/paid-orders' },
                { name: 'Szekciók', path: '/sections' },
                { name: 'Felhasználók', path: '/users' },
                { name: 'Nyitvatartás', path: '/opening-hours' }
              ]"
              :isOpen="openMenu === 'AdminPanel'"
              @toggle="toggleMenu('AdminPanel')"
            />
            <router-link v-if="isReservationsVisible" to="/reservations" class="navbar-link">Foglaláskezelés</router-link>
            <router-link v-if="isOrdersVisible" to="/orders" class="navbar-link">Rendelések</router-link>
            <router-link v-if="isCashoutVisible" to="/cashout" class="navbar-link">Kassza</router-link>
          </div>

          <div class="menu-items">
            <MenuDropdown
              v-if="isAdminVisible"
              title="Admin Panel"
              :items="[
                { name: 'Termékek', path: '/items' },
                { name: 'Kategóriák', path: '/categories' },
                { name: 'Asztalok', path: '/tables' },
                { name: 'Fizetési módok', path: '/payment-methods' },
                { name: 'Kifizetett ételek', path: '/paid-orders' },
                { name: 'Szekciók', path: '/sections' },
                { name: 'Felhasználók', path: '/users' },
                { name: 'Nyitvatartás', path: '/opening-hours' }
              ]"
              :isOpen="openMenu === 'AdminPanel'"
              @toggle="toggleMenu('AdminPanel')"
            />
            <router-link v-if="isReservationsVisible" to="/reservations" class="navbar-link">Foglaláskezelés</router-link>
            <router-link v-if="isOrdersVisible" to="/orders" class="navbar-link">Rendelések</router-link>
            <router-link v-if="isCashoutVisible" to="/cashout" class="navbar-link">Kassza</router-link>
          </div>
        </div>
        <button @click="logout" class="logout-button">
          Kijelentkezés
          <svg-icon type="mdi" :path="iconPath" />
        </button>
      </div>
    </nav>
    
    <div class="content-body">
      <h1>Üdvözözzek az oldalon!</h1>
      <h2>Válaszd ki a számodra szükséges oldalt!</h2>
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
}

.navbar {
  background-color: #282828;
  padding: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #49d0ce;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-left {
  display: flex;
  gap: 20px;
  align-items: center;
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
  display: block;
  position: absolute;
  top: 60px;
  left: 0;
  background-color: #282828;
  padding: 16px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mobile-menu .navbar-link,
  .mobile-menu .menu-dropdown {
    width: 100%;  
    text-align: left;
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: 600;
    transition: background-color 0.3s;
  }

  .mobile-menu .navbar-link:hover,
  .mobile-menu .menu-dropdown:hover {
    background-color: #3f3f3f;
  }

.content-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  min-height: 70vh;
}

h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

h2 {
  font-size: 2rem;
}

@media (max-width: 768px) {
  .hamburger-menu {
    display: block;
  }

  .navbar-left {
    width: 100%;
    justify-content: space-between;
  }

  .menu-items {
    display: none;
  }

  .mobile-menu {
    display: block;
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

  .content-body h1 {
    font-size: 2.5rem;
  }

  .content-body h2 {
    font-size: 1.5rem;
  }
}
</style>
