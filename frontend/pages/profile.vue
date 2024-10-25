<template>
    <div class="flex flex-col">
        <div class="flex flex-col p-4">
            <div class="mb-6">
                <div class="flex justify-between px-4">
                    <div class="flex flex-col">
                        <h1 class="text-xl sm:text-2xl font-bold">คุณ, {{ user?.username }}</h1>
                        <p class="mt-2 text-sm sm:text-base">พอยต์: {{ user?.points }}</p>
                    </div>
                    <button @click="singout()" type="submit"
                        class="w-1/3 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 active:bg-primary/80">
                        ออกจากระบบ
                    </button>
                </div>

                <h2 class="text-lg sm:text-xl font-semibold border-t py-2 mt-4">Redeemed Products</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full border-b py-2 mb-4">
                    <div v-for="product in redeemedProducts" :key="product.id" class="bg-white p-4 shadow-lg rounded-md flex flex-col opacity-[50%]">
                        <!-- Product Image -->
                        <div class="aspect-video w-full overflow-hidden rounded-md mb-3">
                            <img :src="product?.image" :alt="product.name" class="w-full h-full object-cover" />
                        </div>
                        <!-- Product Info -->
                        <div class="flex-1 flex flex-col">
                            <h3 class="text-lg font-semibold line-clamp-2">{{ product.name }}</h3>
                            <p>ต้องการ {{ product.pointsRequired }} พอยต์</p>
                            <button class="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity">
                                แลกรับสิทธิ์แล้ว
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BottomNavigation />
    </div>
</template>

<script setup lang="ts">
import BottomNavigation from '~/components/BottomNavigation.vue';
import { computed, onBeforeMount, onMounted } from 'vue'
import { useUserStore } from '../store/user'
import { useProductsStore } from '~/store/product';
import { useRouter } from 'vue-router';

const router = useRouter();
// check isAuthenticated
onBeforeMount(async () => {
    if (!userStore.isChecked) {
        await userStore.checkAuth();
    }

    if (!userStore.isAuthenticated) {
        router.push("/login");
    }
});

onMounted(async () => {
    await productStore.fetchRedeemedProducts();
});

const userStore = useUserStore()
const productStore = useProductsStore()

const redeemedProducts = computed(() => productStore.redeemedProducts)
const user = computed(() => userStore.user)

const singout = () => { userStore.logout() }
</script>