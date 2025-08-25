// Импорт библиотек
import { createSlice } from "@reduxjs/toolkit";

// State
import { profileHistoryRefInitState } from "./state";

/**
 * Slice для страницы истории пополнений
 */
export const profileHistorySlice = createSlice({
    initialState: profileHistoryRefInitState,
    name: "profileHistory",
    reducers: {},
});
