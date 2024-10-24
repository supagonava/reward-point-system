import type { Product } from "~/types/product";
import type { ActionContextBase, RootState } from "./types";

export interface ProductState {
    products: Product[];
}

const state: ProductState = {
    products: [],
};

export const products = {
    namespaced: true,
    state,
    mutations: {
        setProducts(state: ProductState, products: Product[]) {
            state.products = products;
        },
        redeemProduct(state: ProductState, productId: number) {
            const product = state.products.find((p) => p.id === productId);
            if (product) {
                product.isRedeemed = true;
            }
        },
    },
    actions: {
        fetchProducts({ commit }: ActionContextBase<ProductState, RootState>) {
            // Mocked product list - normally this would come from an API call
            const mockProducts: Product[] = [
                { id: 1, name: "Product 1", description: "Description 1", imageUrl: "product1.jpg", pointsRequired: 500, isRedeemed: false },
                { id: 2, name: "Product 2", description: "Description 2", imageUrl: "product2.jpg", pointsRequired: 800, isRedeemed: false },
            ];

            commit("setProducts", mockProducts);
        },
        redeemProduct({ commit, dispatch, rootState }: ActionContextBase<ProductState, RootState>, productId: number) {
            const product = rootState.products.products.find((p: Product) => p.id === productId);
            const userPoints = rootState.user.user?.points;

            if (product && userPoints !== undefined && userPoints >= product.pointsRequired) {
                dispatch("user/deductPoints", product.pointsRequired, { root: true }); // Deduct points from the user
                commit("redeemProduct", productId); // Mark the product as redeemed
            } else {
                throw new Error("Not enough points to redeem this product");
            }
        },
    },
    getters: {
        availableProducts: (state: ProductState) => state.products.filter((p) => !p.isRedeemed),
        redeemedProducts: (state: ProductState) => state.products.filter((p) => p.isRedeemed),
    },
};
