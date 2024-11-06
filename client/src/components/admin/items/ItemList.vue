<script>
import axios from 'axios';

import Popup from '../../popup/Popup.vue';

export default {
  name: "ItemList",
  components: {
    Popup
  },
  data() {
    return {
      items: {},
      popupMessage: null,
      popupType: null,
      popupVisible: false,
    }
  },
  async mounted(){
    try {
        await this.getItems();
      } catch (error) {
        this.triggerPopup("Hiba a betöltés során!", "error")
    } 
  },
  methods: {
    async getItems() {
      try {
        const response = await axios.get(`http://localhost:3000/item/`, {
          withCredentials: true 
        });
        
        if(response.status == 200) this.items = response.data.data;
        else this.triggerPopup("Sikertelen lekérdezés!", "error")
      } catch (error) {
        this.triggerPopup("Sikertelen lekérdezés!", "error")
      }
    },
    async deleteItem(id){
      try {
        const response = await axios.delete(`http://localhost:3000/item/${id}`, {
        withCredentials: true 
      });

        if(response.status == 200) {
          this.getItems()
          this.triggerPopup("Sikeres törlés!", "success")
        } else this.triggerPopup("Sikertelen törlés!", "error")
      } catch (error) {
        this.triggerPopup("Sikertelen törlés!", "error")
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
  }
};
</script>

<template>
  <div class="form-container">
    <h2 class="form-title">Kategóriák</h2>
    <div class="table-container">
      <table class="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Név</th>
            <th>Kategória</th>
            <th>Ár</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.categoryName }}</td>
            <td>
              <button @click="deleteItem(item.id)" class="delete-button">
                Törlés
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
.form-container {
  background-color: #282828;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 32px;
  max-width: 600px;
  width: 100%;
  margin: auto;
}

.form-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.table-container {
  overflow-x: auto;
}

.category-table {
  width: 100%;
  background-color: #575757;
  border: 1px solid #49d0ce;
  border-radius: 8px;
  text-align: left;
  margin-top: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-table th, .category-table td {
  padding: 12px;
  font-size: 14px;
  color: white;
}

.category-table th {
  background-color: #3f3f3f;
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  border-bottom: 1px solid #49d0ce;
}

.category-table tr:hover {
  background-color: #717171;
}

.delete-button {
  background-color: #49d0ce;
  color: black;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #56b6b1;
}
</style>