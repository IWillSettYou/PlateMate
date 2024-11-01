<script>
import axios from 'axios';
import VueCookies from 'vue-cookies'

export default {
  data(){
    return {
      email: "",
      password: ""
    }
  },
  async mounted(){
    try {
        const response = await this.redirectHandler();

        if(response.isAuthorized == true) this.$router.push({ name: 'Home' });
    } catch (error) {
        console.error("Hiba az ellenőrzés során:", error);
    } 
  },  
  methods: {
    async redirectHandler() {
      try {
        const response = await axios.get('http://localhost:3000/redirect', {
            params: {
              page: "login"
            },
            withCredentials: true 
        });

        return response.data; 
    } catch (error) {
        console.error("Hiba az API hívás során:", error);
        return false; 
    }
    },
    async Login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password
        }, {
          withCredentials: true
        });
        
        if (response.status == 200) this.$router.push({ name: 'Home' });
      } catch (error) {
        console.log(error)
        const errorCode = error.response.data.message
        alert("Hiba a bejelentkezés során: " + errorCode);
      }
    }
  },
}

</script>

<template>
<div class="bg-gray-50 dark:bg-gray-900">
  <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Bejelentkezés
              </h1>
              <form @submit.prevent="Login" class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" v-model="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required="">
                  </div>
                  <div>
                      <label for="password"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jelszó</label>
                      <input type="password" v-model="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <button tpye="submit" class="opacity-100 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Bejelentkezés</button>
              </form>
          </div>
      </div>
  </div>
</section>
</div>
</template>

<style scoped>
</style>

