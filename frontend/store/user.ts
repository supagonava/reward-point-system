import type { ActionContextBase, RootState } from "./types";
import type { User, LoginPayload } from "~/types/user";
import Cookies from "js-cookie";

// Define the state interface for the User module
export interface UserState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

const state: UserState = {
    user: null,
    token: null,
    isAuthenticated: false,
};

export const user = {
    namespaced: true,
    state,
    mutations: {
        setUser(state: UserState, user: User) {
            state.user = user;
            state.isAuthenticated = true;
        },
        setToken(state: UserState, token: string) {
            state.token = token;
        },
        logout(state: UserState) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            Cookies.remove("token");
        },
    },
    actions: {
        login({ commit }: ActionContextBase<UserState, RootState>, payload: LoginPayload) {
            return new Promise((resolve, reject) => {
                const { username, password } = payload;
                if (username === "admin" && password === "password") {
                    const user = { username: "admin", points: 1000 };
                    const token = "fake-jwt-token";

                    commit("setUser", user);
                    commit("setToken", token);
                    Cookies.set("token", token, { expires: 1 / 3 }); // Token valid for 8 hours
                    resolve(user);
                } else {
                    reject(new Error("Invalid credentials"));
                }
            });
        },
        // ฟังก์ชันตรวจสอบ token จาก cookies
        checkAuth({ commit }: ActionContextBase<UserState, RootState>) {
            const token = Cookies.get("token");
            if (token) {
                // สมมติว่าเราตรวจสอบ token ผ่านการตรวจสอบแล้ว
                const user = { username: "admin", points: 1000 };
                commit("setUser", user);
                commit("setToken", token);
            }
        },
        logout({ commit }: ActionContextBase<UserState, RootState>) {
            commit("logout");
        },
        deductPoints({ commit, state }: ActionContextBase<UserState, RootState>, points: number) {
            if (state.user && state.user.points >= points) {
                const updatedUser = { ...state.user, points: state.user.points - points };
                commit("setUser", updatedUser);
            }
        },
    },
    getters: {
        getUser: (state: UserState) => state.user,
        isAuthenticated: (state: UserState) => state.isAuthenticated,
        getPoints: (state: UserState) => state.user?.points ?? 0,
    },
};
