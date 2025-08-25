// Api
import { authApiReducerPath, authApiReducer } from "../api";
import authSlice from "../authSlice";

/**
 * Reducer аутентификации
 */
export const authReducer = {
    [authApiReducerPath]: authApiReducer,
    auth: authSlice,
};
