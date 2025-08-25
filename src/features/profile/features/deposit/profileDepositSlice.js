import { createSlice } from "@reduxjs/toolkit";

import { profileDepositInitState } from "./state/index.js";

/**
 * Slice пополнения баланса в профиле
 */
export const profileDepositSlice = createSlice({
    reducers: {
        setSelectedPayment: (state, { payload }) => {
            state.payment_system = payload;
        },
    },
    initialState: profileDepositInitState,
    name: "profileDeposit",
});

export const { setSelectedPayment } = profileDepositSlice.actions;
