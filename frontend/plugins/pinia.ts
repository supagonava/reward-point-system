import { createPinia } from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
    const pinia = createPinia(); // สร้าง instance ของ Pinia
    nuxtApp.vueApp.use(pinia); // ผูก Pinia เข้ากับ Vue แอปพลิเคชัน
});
