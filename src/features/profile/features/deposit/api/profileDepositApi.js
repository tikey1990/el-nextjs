import { utilCallToastOnQueryFulfilled, axiosBaseQuery } from "@utils";
import { createApi } from "@reduxjs/toolkit/query/react";

/**
 * Api пополнения баланса в профиле
 */
export const profileDepositApi = createApi({
    endpoints: (builder) => ({
        createPayment: builder.mutation({
            query: (payload) => ({
                data: {
                    payment_system: payload.payment_system, // Способ оплаты
                    MethodAndForm: "CreatePayment",
                    sum: payload.sum, // Сумма оплаты
                },
                url: "/api/ajax",
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled, "Платеж на пополнение баланса создан");
            },
        }),
        getCoupon: builder.mutation({
            query: (payload) => ({
                data: {
                    MethodAndForm: "ActivatePromocode",
                    ...payload,
                },
                url: "/api/ajax",
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled, "Промокод активирован");
            },
        }),
    }),
    reducerPath: "profileDepositApi",
    baseQuery: axiosBaseQuery(),
});

export const {
    reducerPath: profileDepositApiReducerPath,
    middleware: profileDepositApiMiddleware,
    reducer: profileDepositApiReducer,
    useCreatePaymentMutation,
    useGetCouponMutation,
} = profileDepositApi;
