// Slice
// Api
import { profileHistoryApiReducerPath, profileHistoryApiReducer } from "../api";
import { profileHistorySlice } from "../profileHistorySlice.js";

/**
 * Reducer настроек профиля
 */
export const profileHistoryReducer = {
    [profileHistoryApiReducerPath]: profileHistoryApiReducer,
    profileHistory: profileHistorySlice.reducer,
};
