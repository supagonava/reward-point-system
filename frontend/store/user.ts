import { defineStore } from "pinia";
import { User } from "./types"; // ปรับเส้นทางตามจริงของ types
import Cookies from "js-cookie";

export const useUserStore = defineStore("user", {
    state: () => ({
        token: null as string | null,
        user: null as User | null,
        isAuthenticated: false,
        isChecked: false,
    }),
    actions: {
        updatePoint(remainingPoints: number) {
            this.user.points = remainingPoints;
        },
        // ทำการล็อกอิน
        async login(username: string, password: string) {
            this.isChecked = false;
            const { $axios } = useNuxtApp();
            try {
                const response = await $axios.post("/auth/login", { username, password });
                this.token = response.data.access_token;
                this.user = response.data.user;

                // เก็บ token ไว้ใน Cookies
                Cookies.set("token", this.token, { expires: 1 / 3 });
                this.isAuthenticated = true;
            } catch (error) {
                console.error("Error during login:", error);
                throw error; // ส่ง error กลับเพื่อจัดการใน component
            }
        },

        // ล็อกเอาท์
        logout() {
            this.token = null;
            this.user = null;
            this.isAuthenticated = false;
            Cookies.remove("token");
            navigateTo("login");
        },
        async checkAuth() {
            const token = Cookies.get("token");
            if (token) {
                this.token = token;
                try {
                    const { $axios } = useNuxtApp();
                    const response = await $axios.get("/auth/me", { headers: { Authorization: "Bearer " + token } });
                    this.user = response.data;
                    this.isAuthenticated = true;
                } catch (error) {
                    console.error("Error checking authentication:", error);
                    this.logout();
                }
            } else {
                this.isAuthenticated = false;
            }
            this.isChecked = true;
        },
    },
});
