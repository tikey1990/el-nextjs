import { utilCallToastOnQueryFulfilled, axiosBaseQuery } from "@utils";
import { createApi } from "@reduxjs/toolkit/query/react";

/**
 * Api историй пополнений
 */
export const profileHistoryApi = createApi({
    endpoints: (builder) => ({
        /**
         * Получение истории депозитов
         */
        getMyPayments: builder.mutation({
            query: (payload) => ({
                data: { MethodAndForm: "GetMyPayments", ...payload },
                url: "/api/ajax",
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled);
            },
        }),
    }),
    reducerPath: "profileHistoryApi",
    baseQuery: axiosBaseQuery(),
});

export const {
    reducerPath: profileHistoryApiReducerPath,
    middleware: profileHistoryApiMiddleware,
    reducer: profileHistoryApiReducer,
    useGetMyPaymentsMutation,
} = profileHistoryApi;
