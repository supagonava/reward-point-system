import type { Commit, Dispatch } from "vuex";
import type { UserState } from "./user";
import type { ProductState } from "./products";

// Root state for combining different module states
export interface RootState {
    user: UserState;
    products: ProductState;
}

// Define the action context type for Vuex actions
export interface ActionContextBase<S, R> {
    commit: Commit;
    dispatch: Dispatch;
    state: S;
    rootState: R;
}
