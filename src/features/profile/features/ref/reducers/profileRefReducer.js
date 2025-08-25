// Slice
// Api
import { profileRefApiReducerPath, profileRefApiReducer } from "../api";
import { profileRefSlice } from "../profileRefSlice";

/**
 * Reducer настроек профиля
 */
export const profileRefReducer = {
    [profileRefApiReducerPath]: profileRefApiReducer,
    profileRef: profileRefSlice.reducer,
};
