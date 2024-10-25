<template>
    <div class="flex flex-col">
        <div class="flex flex-col p-4">
            <h2 class="text-lg sm:text-xl font-semibold">รายการที่พร้อมให้แลก</h2>
            <p class="mt-2 text-sm sm:text-base mb-4">พอยต์คงเหลือ: {{ user?.points }}</p>
            <!-- Grid Layout for Products -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                <div v-for="product in availableProducts" :key="product.id" class="bg-white p-4 shadow-lg rounded-md flex flex-col">
                    <!-- Product Image -->
                    <div class="aspect-video w-full overflow-hidden rounded-md mb-3">
                        <img :src="product?.image" :alt="product.name" class="w-full h-full object-cover" />
                    </div>
                    <!-- Product Info -->
                    <div class="flex-1 flex flex-col">
                        <h3 class="text-lg font-semibold line-clamp-2">{{ product.name }}</h3>
                        <p class="text-sm text-gray-600 mt-2 flex-1 line-clamp-3">{{ product.description }}</p>
                        <div class="mt-3">
                            <p class="font-thin text-md">ต้องการ {{ product.pointsRequired }} พอยต์</p>
                            <p class="text-xs text-gray-500">หมดเขต {{ dayjs(product.expirationDate).locale('th').format('D/MM/YYYY') }}</p>
                        </div>
                        <button @click="goToDetail(product.id)"
                            class="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity">
                            ดูรายละเอียด
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation />
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../store/product'
import BottomNavigation from '~/components/BottomNavigation.vue';
import { useUserStore } from '~/store/user';

const router = useRouter()
const userStore = useUserStore()
const productsStore = useProductsStore()


onMounted(async () => {
    await productsStore.fetchProducts()
})

// check isAuthenticated
onBeforeMount(async () => {
    if (!userStore.isChecked) {
        await userStore.checkAuth();
    }

    if (!userStore.isAuthenticated) {
        router.push("/login");
    }
});

const user = computed(() => userStore.user)
// กรองเอาแค่ที่ไม่เคยกด redeemed
const availableProducts = computed(() => productsStore.products.filter(p => !productsStore.redeemedProducts.map(rd => rd.id).includes(p.id)))
const goToDetail = (productId: number) => {
    router.push(`/product/${productId}`)
}
</script>