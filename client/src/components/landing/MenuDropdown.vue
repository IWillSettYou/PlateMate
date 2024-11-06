<script>
export default {
    props: {
        title: String,
        items: Array,
        isOpen: Boolean,
    },
    methods: {
        toggleDropdown() {
        this.$emit('toggle');
        },
    },
};
</script>

<template>
    <div class="relative">
        <button @click="toggleDropdown" class="text-gray-900 dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
        {{ title }} ▼
        </button>
        <transition name="dropdown">
        <div v-if="isOpen" class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md">
            <ul>
            <li v-for="item in items" :key="item.name" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <router-link :to="item.path" class="block text-gray-900 dark:text-white">{{ item.name }}</router-link>
            </li>
            </ul>
        </div>
        </transition>
    </div>
</template>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown-enter-from, .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
  