import { createStore } from "vuex";
import { user } from "./user";
import { products } from "./products";

export const store = createStore({
    modules: {
        user,
        products,
    },
});
