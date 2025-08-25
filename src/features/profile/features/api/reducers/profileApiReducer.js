// Slice
// Api
import { profileApiApiReducerPath, profileApiApiReducer } from "../api";
import { profileApiSlice } from "../profileApiSlice.js";

/**
 * Reducer api профиля
 */
export const profileApiReducer = {
    [profileApiApiReducerPath]: profileApiApiReducer,
    profileApi: profileApiSlice.reducer,
};
