// Импорт библиотек
import { createSlice } from "@reduxjs/toolkit";

// State
import { uiInitState } from "./state";

/**
 * Slice UI
 */
export const uiSlice = createSlice({
    initialState: uiInitState,
    reducers: {},
    name: "ui",
});

export default uiSlice.reducer;
