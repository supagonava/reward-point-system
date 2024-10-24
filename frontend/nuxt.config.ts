import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    typescript: {
        tsConfig: {
            extends: "./.nuxt/tsconfig.json",
        },
    },
    plugins: ["~/plugins/vuex-plugin.ts"],
    css: ["~/assets/css/tailwind.css"],
    devtools: { enabled: true },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    compatibilityDate: "2024-10-24",
});
