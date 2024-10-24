import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useStore } from "vuex";
import { Store } from "vuex";
import type { RootState } from "~/store/types";

export default defineNuxtRouteMiddleware((to, from) => {
    // เข้าถึง Vuex store และ cast type
    const store = useStore() as Store<RootState>;

    // เรียก checkAuth เพื่อเช็คว่า token มีอยู่ใน cookies และยัง valid อยู่หรือไม่
    store.dispatch("user/checkAuth");

    // ถ้าผู้ใช้ล็อกอินแล้วและพยายามเข้าหน้า login ให้ redirect ไปหน้า home
    if (store.getters["user/isAuthenticated"] && to.path === "/login") {
        return navigateTo("/home");
    }

    // ถ้าผู้ใช้ไม่ได้ล็อกอินและพยายามเข้าหน้าที่ต้องล็อกอินก่อน ให้ redirect ไปหน้า login
    if (!store.getters["user/isAuthenticated"] && to.path !== "/login") {
        return navigateTo("/login");
    }
});
