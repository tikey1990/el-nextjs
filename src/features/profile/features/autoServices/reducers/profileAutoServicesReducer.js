import { profileAutoServicesApiReducerPath, profileAutoServicesApiReducer } from "../api";
import { profileAutoServicesSlice } from "../";

/**
 * Reducer моих заказов
 */
export const profileAutoServicesReducer = {
    [profileAutoServicesApiReducerPath]: profileAutoServicesApiReducer,
    profileAutoServices: profileAutoServicesSlice.reducer,
};
