<!-- components/user/UserHeader.vue -->
<template>
    <div class="mb-8 flex items-center justify-between rounded-lg bg-white p-6 shadow-md">
        <div>
            <h1 class="text-2xl font-bold text-secondary">Welcome, {{ user?.username }}</h1>
            <div class="mt-2 flex items-center gap-2">
                <span class="text-lg font-semibold text-primary">{{ user?.points }}</span>
                <span class="text-gray-600">Points Available</span>
            </div>
        </div>
        <button @click="$emit('logout')" class="rounded-md bg-secondary px-4 py-2 text-sm text-white hover:bg-secondary/90">
            Logout
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    user: {
        username: string
        points: number
    }
}>()

defineEmits<{
    logout: []
}>()
</script>