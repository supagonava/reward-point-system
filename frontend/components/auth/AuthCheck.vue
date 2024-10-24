<!-- components/auth/AuthCheck.vue -->
<template>
    <div v-if="!isAuthenticated" class="rounded-lg bg-white p-6 text-center shadow-md">
        <p class="text-gray-600">
            You are not logged in. Please
            <NuxtLink to="/login" class="text-primary hover:underline">Login</NuxtLink>.
        </p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    isAuthenticated: boolean
}>()
</script>