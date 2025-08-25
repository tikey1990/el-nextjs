// Slice
// Api
import { profileSettingsApiReducerPath, profileSettingsApiReducer } from "../api";
import { profileSettingsSlice } from "../profileSettingsSlice";

/**
 * Reducer настроек профиля
 */
export const ProfileSettingsReducer = {
    [profileSettingsApiReducerPath]: profileSettingsApiReducer,
    profileSettings: profileSettingsSlice.reducer,
};
