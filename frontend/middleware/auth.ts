import { defineNuxtRouteMiddleware, navigateTo, useNuxtApp } from "#app";
import { useProductsStore } from "~/store/product";
import { useUserStore } from "../store/user"; // ใช้ Pinia

export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp(); // ดึง Nuxt App เพื่อให้มั่นใจว่า Pinia ถูกติดตั้งแล้ว

    const userStore = useUserStore(nuxtApp.$pinia); // ใช้ Pinia หลังจากมั่นใจว่าแอปถูกสร้างแล้ว
    const productStore = useProductsStore(nuxtApp.$pinia); // ใช้ Pinia หลังจากมั่นใจว่าแอปถูกสร้างแล้ว

    // รอให้ checkAuth ทำงานเสร็จ
    await userStore.checkAuth(); // ทำให้ async และรอจนกว่าจะเสร็จ

    if (userStore.isAuthenticated) {
        await productStore.fetchRedeemedProducts();
    }

    if (userStore.isAuthenticated && to.path === "/login") {
        // ถ้าผู้ใช้ล็อกอินแล้วและพยายามเข้าหน้า login ให้ redirect ไปหน้า home
        return navigateTo("/home");
    }

    // ถ้าผู้ใช้ไม่ได้ล็อกอินและพยายามเข้าหน้าที่ต้องล็อกอินก่อน ให้ redirect ไปหน้า login
    if (!userStore.isAuthenticated && to.path !== "/login") {
        return navigateTo("/login");
    }
});
