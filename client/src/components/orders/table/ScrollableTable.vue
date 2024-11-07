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
<div class="table-container">
  <table class="category-table">
    <thead>
      <tr>
        <th scope="col" class="table-header">
          Név
        </th>
        <th scope="col" class="table-header">
          Művelet
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td class="table-cell">{{ item.name }}</td>
        <td class="table-cell">
          <button
            v-if="!hideAddButton"
            @click="$emit('add-item', item)"
            class="add-button"
          >
            Hozzáadás
          </button>
          <button
            v-else
            @click="$emit('remove-item', index)"
            class="remove-button"
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
  .table-container {
  border: 1px solid #374151; /* border-gray-700 */
  border-radius: 0.375rem; /* rounded-md */
  overflow-y: auto;
  background-color: #374151; /* bg-gray-700 */
  height: 500px;
}

.category-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 100%;
  color: #e5e7eb; /* text-gray-200 */
}

.table-header {
  padding: 0.75rem 1.5rem; /* px-6 py-3 */
  text-align: left;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  text-transform: uppercase;
  letter-spacing: 0.05em; /* tracking-wider */
  background-color: #1f2937; /* bg-gray-800 */
  color: #d1d5db; /* text-gray-300 */
}

.table-cell {
  padding: 1rem 1.5rem; /* px-6 py-4 */
  text-align: left;
  font-size: 0.875rem; /* text-sm */
  color: #e5e7eb; /* text-gray-300 */
  white-space: nowrap;
}

.table-cell:last-child {
  text-align: right;
}

.add-button,
.remove-button {
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
}

.add-button {
  color: #60a5fa; /* text-blue-400 */
}

.add-button:hover {
  color: #2563eb; /* hover:text-blue-600 */
}

.remove-button {
  color: #f87171; /* text-red-400 */
}

.remove-button:hover {
  color: #ef4444; /* hover:text-red-600 */
}

tbody {
  background-color: #374151; /* bg-gray-700 */
}

tbody tr:nth-child(odd) {
  background-color: #4b5563; /* alternate rows with darker shades */
}

tbody tr:hover {
  background-color: #6b7280; /* hover background */
}

.table-container::-webkit-scrollbar {
  width: 8px;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #60a5fa; /* scrollbar thumb color */
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-track {
  background-color: #1f2937; /* scrollbar track color */
}

  </style>