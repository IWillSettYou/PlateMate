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
      iconPath: mdiLogout,
      motivationalQuotes: [
        "A siker kulcsa a kitartásban rejlik, ne add fel!",
        "Minden nap egy új lehetőség, hogy jobbá válj.",
        "Ne félj a hibáktól, ők vezetnek a fejlődéshez.",
        "Higgy magadban, és a világ is hinni fog benned.",
        "A legnagyobb erő a pozitív gondolkodásban rejlik.",
        "Minden nap egy új lehetőség a sikerhez.",
        "Ha ma jobbat teszel, mint tegnap, akkor már előrébb jársz.",
        "A legnagyobb változások kis lépésekkel kezdődnek.",
        "A kemény munka meghozza a gyümölcsét, légy türelmes!",
        "A legjobb idő most van, ne várj holnapra!"
      ]
    };
  },
  async mounted() {
    try {
      const response = await this.redirectHandler();

      if (response != false) {
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
      this.triggerPopup("Hiba történt a jogok ellenőrzése során!", "error")
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
        this.triggerPopup("Hiba történt a betöltés során!", "error");
        return false
      }
    },
    async logout() {
      try {
        const response = await axios.post('http://localhost:3000/logout', null, {
          withCredentials: true
        });

        if (response.status === 200) this.$router.push({ name: 'Login' });
        else this.triggerPopup("Hiba történt a kijelentkezés során!", "error");
      } catch (error) {
        this.triggerPopup("Hiba történt a kijelentkezés során!", "error");
      }
    },
    toggleMenu(menuName) {
      this.openMenu = this.openMenu === menuName ? null : menuName;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    getQuote() {
      return this.motivationalQuotes[Math.floor(Math.random() * this.motivationalQuotes.length)]
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
            <MenuDropdown v-if="isAdminVisible" title="Admin Panel" :items="[
              { name: 'Termékek', path: '/items' },
              { name: 'Kategóriák', path: '/categories' },
              { name: 'Asztalok', path: '/tables' },
              { name: 'Fizetési módok', path: '/payment-methods' },
              { name: 'Kifizetett ételek', path: '/paid-orders' },
              { name: 'Szekciók', path: '/sections' },
              { name: 'Felhasználók', path: '/users' },
              { name: 'Nyitvatartás', path: '/opening-hours' }
            ]" :isOpen="openMenu === 'AdminPanel'" @toggle="toggleMenu('AdminPanel')" />
            <router-link v-if="isReservationsVisible" to="/reservations"
              class="navbar-link">Foglaláskezelés</router-link>
            <router-link v-if="isOrdersVisible" to="/orders" class="navbar-link">Rendelések</router-link>
            <router-link v-if="isCashoutVisible" to="/cashout" class="navbar-link">Kassza</router-link>
          </div>

          <div class="menu-items">
            <MenuDropdown v-if="isAdminVisible" title="Admin Panel" :items="[
              { name: 'Termékek', path: '/items' },
              { name: 'Kategóriák', path: '/categories' },
              { name: 'Asztalok', path: '/tables' },
              { name: 'Fizetési módok', path: '/payment-methods' },
              { name: 'Kifizetett ételek', path: '/paid-orders' },
              { name: 'Szekciók', path: '/sections' },
              { name: 'Felhasználók', path: '/users' },
              { name: 'Nyitvatartás', path: '/opening-hours' }
            ]" :isOpen="openMenu === 'AdminPanel'" @toggle="toggleMenu('AdminPanel')" />
            <router-link v-if="isReservationsVisible" to="/reservations"
              class="navbar-link">Foglaláskezelés</router-link>
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

    <div class="above-body">
      <h1>Kellemes munkát kívánunk a mai napra!</h1>
      <h1>Ha bármire szükséged van, keresd a vezetőséget.</h1>
    </div>

    <div class="content">
      <div class="card-body">
        <h2>Elérhetőségek</h2>
        <h3>Email: platemate@gmail.com</h3>
        <h3>Tel: +36 30 123 4567</h3>
        
      </div>
    </div>
  </div>

  <Popup v-if="popupVisible" :message="popupMessage" :popupType="popupType" :isVisible="popupVisible" />
</template>

<style scoped>
.above-body {
  margin: auto;
  text-align: center;
  margin-top: 5%;
}

.content {
  display: flex;
  margin: auto;
}

.card-body {
  background-color: #282828;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 32px;
  max-width: 400px;
  width: 100%;
}
</style>
