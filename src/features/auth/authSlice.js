import { createSlice } from "@reduxjs/toolkit";

// State
import { authInitState } from "./state/authInitState";

/**
 * Slice аутентификации
 */
export const authSlice = createSlice({
    reducers: {
        /**
         * Выход из аккаунта
         */
        logout: (state) => {
            state.loading = false;
            state.auth = null;
            state.error = null;
        },
        setLoginSocialsResponse: (state, action) => {
            state.loginSocialsResponse = action.payload;
        },
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        setError: (state, { payload }) => {
            state.error = payload;
        },
        setToken: (state, { payload }) => {
            state.auth = payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    initialState: authInitState,
    name: "auth",
});

export const { setLoginSocialsResponse, setLoading, clearError, setError, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
