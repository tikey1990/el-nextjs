// Api
import { profileDepositApiReducerPath, profileDepositApiReducer } from "../api/index.js";
// Slice
import { profileDepositSlice } from "../profileDepositSlice.js";

/**
 * Reducer пополнения баланса в профиле
 */
export const profileDepositReducer = {
    [profileDepositApiReducerPath]: profileDepositApiReducer,
    profileDeposit: profileDepositSlice.reducer,
};
