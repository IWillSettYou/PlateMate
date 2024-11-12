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
        else this.triggerPopup("Hiba történt a kijelentkezés során!","error");
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

</style>
