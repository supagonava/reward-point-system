import { defineNuxtPlugin } from "#app";
import { store } from "~/store/index";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
});
