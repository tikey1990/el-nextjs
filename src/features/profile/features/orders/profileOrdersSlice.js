// Импорт библиотек
import { createSlice } from "@reduxjs/toolkit";

// State
import { profileOrdersInitState } from "./state";

/**
 * Slice для страницы моих заказов
 */
export const profileOrdersSlice = createSlice({
    initialState: profileOrdersInitState,
    name: "profileOrders",
    reducers: {},
});
