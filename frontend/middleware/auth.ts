import { defineNuxtRouteMiddleware, navigateTo, useNuxtApp } from "#app";
import { useUserStore } from "../store/user";

export default defineNuxtRouteMiddleware(async (to) => {
    const userStore = useUserStore();

    // ตรวจสอบ `isChecked` และ `isAuthenticated` ให้ครบก่อนการ redirect
    if (!userStore.isChecked) {
        await userStore.checkAuth();
    }

    if (userStore.isAuthenticated && to.path === "/login") {
        return navigateTo("/home");
    }

    if (!userStore.isAuthenticated && to.path !== "/login") {
        return navigateTo("/login");
    }
});
