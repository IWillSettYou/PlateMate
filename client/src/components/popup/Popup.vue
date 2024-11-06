<template>
  <div v-if="isVisible" :class="['popup', popupType]">
    <div :class="['popup-bar', popupType === 'success' ? 'success-bar' : 'error-bar']"></div>
    <div class="popup-message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    popupType: {
      type: String,
      required: true,
      validator(value) {
        return ["success", "error"].includes(value);
      },
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 90px; 
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  background-color: #000;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
  opacity: 0.95;
  overflow: hidden;
  z-index: 9999;
}

.success-bar {
  height: 8px;
  background-color: #4CAF50;
}

.error-bar {
  height: 8px;
  background-color: #f44336;
}

.popup-message {
  padding: 20px;
  font-size: 16px;
  text-align: center; 
}
</style>
