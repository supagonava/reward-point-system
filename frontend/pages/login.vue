<template>
    <div class="flex min-h-screen items-center justify-center p-6">
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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

// ใช้ middleware 'auth' เพื่อป้องกันไม่ให้ผู้ใช้ที่ล็อกอินแล้วกลับมาที่หน้า login
definePageMeta({
    middleware: ['auth']
})

const store = useStore()
const router = useRouter()

const username = ref<string>('') // ชื่อผู้ใช้
const password = ref<string>('') // รหัสผ่าน
const errorMessage = ref<string>('') // เก็บข้อความแสดงข้อผิดพลาด

const login = async () => {
    try {
        await store.dispatch('user/login', { username: username.value, password: password.value })
        router.push('/home') // ถ้าล็อกอินสำเร็จให้ไปที่หน้า home
    } catch (error: any) {
        errorMessage.value = error.message
    }
}
</script>
