<template>
    <div class="flex flex-col w-screen items-center justify-center">
        <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 class="mb-6 text-center text-3xl font-bold text-primary">Login</h2>

            <form @submit.prevent="login" class="space-y-6">
                <div class="space-y-2">
                    <label for="username" class="block text-sm font-medium text-secondary">
                        Username
                    </label>
                    <input id="username" v-model="username" type="text" required
                        class="w-full rounded-md border border-lola bg-white px-4 py-2 text-secondary placeholder-careys-pink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Enter your username" />
                </div>

                <div class="space-y-2">
                    <label for="password" class="block text-sm font-medium text-secondary">
                        Password
                    </label>
                    <input id="password" v-model="password" type="password" required
                        class="w-full rounded-md border border-lola bg-white px-4 py-2 text-secondary placeholder-careys-pink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Enter your password" />
                </div>

                <button type="submit"
                    class="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 active:bg-primary/80">
                    Sign in
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import Swal from 'sweetalert2';

const userStore = useUserStore()
const router = useRouter()

const username = ref<string>('user1') // ชื่อผู้ใช้
const password = ref<string>('password') // รหัสผ่าน
const errorMessage = ref<string>('') // เก็บข้อความแสดงข้อผิดพลาด

const login = async () => {
    try {
        await userStore.login(username.value, password.value)
        // router.push('/home') // ถ้าล็อกอินสำเร็จให้ไปที่หน้า home
        window.open('/home', "_self")
    } catch (error: any) {
        errorMessage.value = error?.response?.data?.message ?? error.message
        Swal.fire({ title: "Alert", text: errorMessage.value, icon: "error", })
    }
}

definePageMeta({
    middleware: ['auth']
})
</script>
