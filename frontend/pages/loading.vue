<!-- pages/loading.vue -->
<template>
    <div class="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center space-y-6">
            <!-- Loading Spinner -->
            <div class="relative">
                <div class="w-12 h-12">
                    <svg class="animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                </div>
                <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-100 blur-sm"></div>
            </div>

            <!-- Loading Text -->
            <div class="text-center space-y-2">
                <h2 class="text-xl font-semibold text-secondary">
                    กำลังตรวจสอบสถานะการเข้าสู่ระบบ
                </h2>
                <p class="text-gray-500 text-sm">
                    กรุณารอสักครู่...
                </p>
            </div>

            <!-- Progress Bar -->
            <div class="w-full bg-gray-100 rounded-full h-1.5">
                <div class="bg-primary h-1.5 rounded-full w-full animate-pulse"></div>
            </div>
        </div>

        <!-- Brand Text -->
        <p class="mt-6 text-gray-400 text-sm">
            © {{ currentYear }} Reward System
        </p>
    </div>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: .5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>