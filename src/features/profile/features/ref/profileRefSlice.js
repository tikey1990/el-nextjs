// Импорт библиотек
import { createSlice } from "@reduxjs/toolkit";

// State
import { profileRefInitState } from "./state";

/**
 * Slice для страницы реферальной системы профиля
 */
export const profileRefSlice = createSlice({
    reducers: {
        /**
         * Устанавливаем реферальный код
         */
        setRefCode: (state, action) => {
            state.refCode = action.payload;
        },
    },
    initialState: profileRefInitState,
    name: "profileRef",
});

export const { setRefCode } = profileRefSlice.actions;
