import { defineStore } from "pinia";
import { Product } from "./types"; // ปรับเส้นทางตามจริงของ types

export const useProductsStore = defineStore("products", {
    state: () => ({
        products: [] as Product[],
        redeemedProducts: [] as Product[],
    }),
    actions: {
        // ดึงรายการสินค้าจาก API
        async fetchProducts() {
            const { $axios } = useNuxtApp();
            try {
                const response = await $axios.get("/products");
                this.products = response.data;
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        },

        // ดึงรายการสินค้าจาก API
        async fetchRedeemedProducts() {
            const { $axios } = useNuxtApp();
            try {
                const response = await $axios.get("/products/redeemed");
                this.redeemedProducts = response.data;
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        },

        // แลกสินค้า
        async redeemProduct(productId: number) {
            const { $axios } = useNuxtApp();
            try {
                const response = await $axios.post(`/products/redeem/${productId}`);
                return response.data;
            } catch (error) {
                console.error("Error redeeming product:", error);
                throw error; // ส่ง error กลับเพื่อจัดการใน component
            }
        },
    },
});
