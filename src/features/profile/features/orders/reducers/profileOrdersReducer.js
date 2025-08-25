// Slice
// Api
import { profileOrdersApiReducerPath, profileOrdersApiReducer } from "../api";
import { profileOrdersSlice } from "../profileOrdersSlice.js";

/**
 * Reducer моих заказов
 */
export const profileOrdersReducer = {
    [profileOrdersApiReducerPath]: profileOrdersApiReducer,
    profileOrders: profileOrdersSlice.reducer,
};
