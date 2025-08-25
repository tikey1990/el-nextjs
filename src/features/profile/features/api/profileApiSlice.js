// Импорт библиотек
import { createSlice } from "@reduxjs/toolkit";

// State
import { profileApiInitState } from "./state";

/**
 * Slice для страницы api
 */
export const profileApiSlice = createSlice({
    reducers: {
        /**
         * Устанавливаем данные api статуса токена
         */
        setApiTokenStatus: (state, action) => {
            state.apiTokenStatus = action.payload;
        },
        /**
         * Устанавливаем данные ключа api
         */
        setApiKey: (state, action) => {
            state.apiKey = action.payload;
        },
    },
    initialState: profileApiInitState,
    name: "profileRef",
});

export const { setApiTokenStatus, setApiKey } = profileApiSlice.actions;
