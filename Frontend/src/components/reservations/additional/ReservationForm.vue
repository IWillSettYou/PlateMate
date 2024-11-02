<template>
  <div class="flex flex-col items-center bg-gray-800 text-white p-6 rounded-lg space-y-4 max-w-md mx-auto shadow-lg">
    <h2 class="text-lg font-semibold">Adatok</h2>
    <div class="flex flex-col space-y-3 w-full">
      <input type="text" placeholder="Név" class="bg-gray-700 text-white rounded-lg py-2 px-4 w-full" />
      <input type="email" placeholder="Email" class="bg-gray-700 text-white rounded-lg py-2 px-4 w-full" />
      <input type="date" class="bg-gray-700 text-white rounded-lg py-2 px-4 w-full" />
      <div class="mb-4">
          <label class="block text-gray-400 dark:text-gray-300 mb-2">Ettől</label>
          <select
            id="dropdown"
            v-model="selectedTable"
            class="bg-gray-600 hover:bg-gray-500 text-white rounded-lg py-2 w-full font-semibold"
          >
            <option v-for="table in tables" :key="table.id" :value="table.id">
              {{ table.tableNumber }}
            </option>
          </select>
        </div>
            <div class="mb-4">
          <label class="block text-gray-400 dark:text-gray-300 mb-2">Eddig</label>
          <select
            id="dropdown"
            v-model="selectedTable"
            class="bg-gray-600 hover:bg-gray-500 text-white rounded-lg py-2 w-full font-semibold"
          >
            <option v-for="table in tables" :key="table.id" :value="table.id">
              {{ table.tableNumber }}
            </option>
          </select>
        </div>
      <button class="bg-gray-600 hover:bg-gray-500 text-white rounded-lg py-2 w-full font-semibold">
        Foglalás
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
