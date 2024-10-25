import axios from "axios";
import Cookies from "js-cookie"; // ใช้การ import แบบถูกต้อง

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    let token = "";
    // Check if the code is running on the client side
    if (process.client) {
        token = Cookies.get("token"); // ใช้ Cookies.get ได้ถูกต้อง
    }

    const axiosInstance = axios.create({
        baseURL: config.public.apiBase,
        headers: { Authorization: "Bearer " + token },
    });

    return {
        provide: {
            axios: axiosInstance,
        },
    };
});
