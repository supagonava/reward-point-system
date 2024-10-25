import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    typescript: {
        tsConfig: {
            extends: "./.nuxt/tsconfig.json",
        },
    },
    plugins: ["~/plugins/axios.ts", "~/plugins/pinia.ts"],
    css: ["~/assets/css/tailwind.css"],
    devtools: { enabled: true },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        public: {
            apiBase: "http://localhost:3001", // base URL ของ API
        },
    },
});
