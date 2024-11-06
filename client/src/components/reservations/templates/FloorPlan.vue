<template>
  <div class="p-5 border-2 border-gray-800 rounded-lg bg-gray-800 shadow-lg">
    <h2 class="text-lg font-semibold text-center mb-4">Asztalfoglalás</h2>
    <table class="table-auto w-full max-w-5xl border-separate border-spacing-2">
      <tbody>
        <tr>
          <td class="w-1/6 text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(1)" @click="selectTable(1)">1</div>
          </td>
          <td class="w-1/6 text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(2)" @click="selectTable(2)">2</div>
          </td>
          <td class="w-1/3 text-center bg-gray-500 text-white rounded-md" colspan="2">
            <div class="flex items-center justify-center h-full">Pult</div>
          </td>
          <td class="w-1/6 text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(9)" @click="selectTable(9)">9</div>
          </td>
          <td class="w-1/6 text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(10)" @click="selectTable(10)">10</div>
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(3)" @click="selectTable(3)">3</div>
          </td>
          <td class="text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(4)" @click="selectTable(4)">4</div>
          </td>
          <td colspan="2" class="text-center"></td>
          <td class="text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(11)" @click="selectTable(11)">11</div>
          </td>
          <td class="text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(12)" @click="selectTable(12)">12</div>
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(5)" @click="selectTable(5)">5</div>
          </td>
          <td class="text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(6)" @click="selectTable(6)">6</div>
          </td>
          <td colspan="2" class="text-center"></td>
          <td class="text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(13)" @click="selectTable(13)">13</div>
          </td>
          <td class="text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(14)" @click="selectTable(14)">14</div>
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(7)" @click="selectTable(7)">7</div>
          </td>
          <td class="text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(8)" @click="selectTable(8)">8</div>
          </td>
          <td colspan="2" class="text-center"></td>
          <td class="text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(15)" @click="selectTable(15)">15</div>
          </td>
          <td class="text-center">
            <div class="text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer" :class="tableClass(16)" @click="selectTable(16)">16</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTable: null,
    };
  },
  methods: {
    selectTable(id) {
      this.selectedTable = id;
      this.$emit("tableSelected", id);
    },
    tableClass(id) {
      return [
        this.selectedTable === id ? "bg-blue-700" : "bg-gray-600",
      ];
    },
  },
};
</script>

<style scoped>
  td {
  min-width:50px;
}
</style>
