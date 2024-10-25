<template>
    <nav class="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg safe-area-bottom">
        <ul class="flex justify-around items-center h-16">
            <li class="flex-1">
                <NuxtLink to="/home" class="flex flex-col items-center py-2"
                    :class="{ 'text-primary': $route.path === '/home', 'text-gray-500': $route.path !== '/home' }">
                    <div class="relative w-6 h-6 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute inset-0 w-full h-full"
                            :class="{ 'text-primary': $route.path === '/home', 'text-gray-500': $route.path !== '/home' }"
                            :stroke="$route.path === '/home' ? 'currentColor' : 'currentColor'"
                            :fill="$route.path === '/home' ? 'currentColor' : 'none'">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                    <span class="text-xs font-medium">Home</span>
                </NuxtLink>
            </li>

            <li class="flex-1">
                <NuxtLink to="/reward" class="flex flex-col items-center py-2"
                    :class="{ 'text-primary': $route.path === '/reward', 'text-gray-500': $route.path !== '/reward' }">
                    <div class="relative w-6 h-6 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute inset-0 w-full h-full"
                            :class="{ 'text-primary': $route.path === '/reward', 'text-gray-500': $route.path !== '/reward' }"
                            :stroke="$route.path === '/reward' ? 'currentColor' : 'currentColor'"
                            :fill="$route.path === '/reward' ? 'currentColor' : 'none'">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM17 16c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM7 16c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM12 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                        </svg>
                    </div>
                    <span class="text-xs font-medium">Reward</span>
                </NuxtLink>
            </li>

            <li class="flex-1">
                <NuxtLink to="/profile" class="flex flex-col items-center py-2"
                    :class="{ 'text-primary': $route.path === '/profile', 'text-gray-500': $route.path !== '/profile' }">
                    <div class="relative w-6 h-6 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute inset-0 w-full h-full"
                            :class="{ 'text-primary': $route.path === '/profile', 'text-gray-500': $route.path !== '/profile' }"
                            :stroke="$route.path === '/profile' ? 'currentColor' : 'currentColor'"
                            :fill="$route.path === '/profile' ? 'currentColor' : 'none'">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <span class="text-xs font-medium">Profile</span>
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style scoped>
.safe-area-bottom {
    padding-bottom: env(safe-area-inset-bottom, 0px);
}

/* Optional: Add transition for smooth color changes */
.text-primary,
.text-gray-500 {
    transition: color 0.2s ease;
}

/* Optional: Add active state effect */
.router-link-active {
    position: relative;
}

.router-link-active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    @apply bg-primary;
}
</style>