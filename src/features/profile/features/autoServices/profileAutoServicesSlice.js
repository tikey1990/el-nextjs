// Импорт библиотек
import { createSlice } from "@reduxjs/toolkit";

// State
import { profileAutoServicesInitState } from "./state";

/**
 * Slice для страницы моих заказов
 */
export const profileAutoServicesSlice = createSlice({
    initialState: profileAutoServicesInitState,
    name: "profileAutoServices",
    reducers: {},
});
