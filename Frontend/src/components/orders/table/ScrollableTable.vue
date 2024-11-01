<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    hideAddButton: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
    <div class="border border-gray-700 rounded-md overflow-y-auto bg-gray-700" style="height: 500px;">
      <table class="min-w-full divide-y divide-gray-600 text-gray-200">
        <thead class="bg-gray-800">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
              Név
            </th>
            <th scope="col" class="px-6 py-3">Művelet
            </th>
          </tr>
        </thead>
        <tbody class="bg-gray-700 divide-y divide-gray-600">
          <tr v-for="(item, index) in items" :key="index">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{{ item.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                v-if="!hideAddButton"
                @click="$emit('add-item', item)"
                class="text-blue-400 hover:text-blue-600"
              >
                Hozzáadás
              </button>
              <button
                v-else
                @click="$emit('remove-item', index)"
                class="text-red-400 hover:text-red-600"
              >
                Eltávolítás
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <style scoped>
  </style>