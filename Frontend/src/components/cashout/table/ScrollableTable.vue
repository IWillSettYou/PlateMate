<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
    <div class="border border-gray-700 rounded-md overflow-y-auto bg-gray-700" style="height: 500px;">
      <table class="min-w-full divide-y divide-gray-600 text-gray-200">
        <thead class="bg-gray-800">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">ID</th>
            <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Név</th>
            <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Ár</th>
          </tr>
        </thead>
        <tbody class="bg-gray-700 divide-y divide-gray-600">
          <tr v-for="(item, index) in items" :key="index">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ item.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ item.itemName }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ item.itemPrice }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <style scoped>
  </style>