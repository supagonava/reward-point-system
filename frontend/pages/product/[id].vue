<template>
    <div class="min-h-screen">
        <div class="bg-white p-4 shadow-lg rounded-md">
            <img :src="product.image" alt="Product image" class="mb-4 w-full h-64 object-cover rounded-lg" />
            <h1 class="text-2xl font-bold mb-2">{{ product.name }}</h1>
            <p class="text-lg mb-4">{{ product.description }}</p>
            <p class="font-bold mb-2">ต้องการ: {{ product.pointsRequired }} พอยต์</p>
            <p class="mb-4">หมดเขต {{ dayjs(product.expirationDate).format('D/MM/YYYY') }}</p>

            <button @click="confirmRedeem" :disabled="!canRedeem" class="mt-4 w-full bg-primary text-white py-2 rounded-md"
                :class="{ 'opacity-50': !canRedeem }">
                แลกรับสิทธิ์
            </button>

            <p v-if="!canRedeem" class="text-red-500 mt-2">ไม่สามารถแลกได้เนื่องจากหมดเขตหรือพอยต์ไม่พอ</p>
        </div>

        <!-- Dialog สำหรับยืนยันการแลกรับสิทธิ์ -->
        <div v-if="showDialog" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-xl font-semibold mb-4">ยืนยันรับสิทธิ์</h2>
                <p>คุณยืนยันที่จะกดรับสิทธิ์นี้ไหม?</p>
                <div class="mt-4 flex justify-between">
                    <button @click="redeem" class="bg-primary text-white px-4 py-2 rounded-md">ใช่</button>
                    <button @click="showDialog = false" class="bg-gray-300 px-4 py-2 rounded-md">ไว้ทีหลัง</button>
                </div>
            </div>
        </div>

        <BottomNavigation />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductsStore } from '../../store/product'
import { useUserStore } from '../../store/user'
import BottomNavigation from '../../components/BottomNavigation.vue' // Bottom Navigation
import dayjs from 'dayjs'

// ดึงข้อมูลสินค้าจาก route params
const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const userStore = useUserStore()

const productId = parseInt(route.params.id as string) // ดึง productId จากเส้นทาง
const product = computed(() => productsStore.products.find(p => p.id === productId))
const redeemedProducts = computed(() => productsStore.redeemedProducts.map(p => p.id))
const user = computed(() => userStore.user)

const canRedeem = computed(() => user.value?.points >= product.value?.pointsRequired && !redeemedProducts.value.includes(product.value.id) && dayjs(new Date()).isBefore(dayjs(product.value.expirationDate))) // ตรวจสอบว่าแต้มพอหรือไม่
const showDialog = ref(false) // สำหรับแสดง Dialog ยืนยันการแลก

// เมื่อกดปุ่ม Redeem ให้แสดง Dialog ยืนยัน
const confirmRedeem = () => {
    if (canRedeem.value) {
        showDialog.value = true
    }
}

// ฟังก์ชันการแลกสินค้า
const redeem = async () => {
    try {
        const redeemedResponse = await productsStore.redeemProduct(productId)
        alert(`${redeemedResponse.message}`)
        showDialog.value = false
        router.push('/home')
    } catch (error: any) {
        alert(error.message)
    }
}

// check isAuthenticated
onBeforeMount(async () => {
    if (!userStore.isChecked) {
        await userStore.checkAuth();
    }

    if (!userStore.isAuthenticated) {
        router.push("/login");
    }
});

// โหลดข้อมูลเมื่อ component ถูก mount
onMounted(() => {
    if (!product.value) {
        router.push('/home') // ถ้าไม่มีสินค้าที่ตรงกับ ID ให้กลับไปหน้า home
    }
})
</script>
