import { utilCallToastOnQueryFulfilled, axiosBaseQuery } from "@utils";
import { createApi } from "@reduxjs/toolkit/query/react";

/**
 * Api моих заказов
 */
export const profileOrdersApi = createApi({
    endpoints: (builder) => ({
        /**
         * Получение моих заказов
         */
        getOrdersPage: builder.mutation({
            query: (payload) => ({
                data: {
                    MethodAndForm: "getOrdersPage",
                    ...payload,
                },
                url: "/api/ajax",
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled);
            },
        }),
    }),
    reducerPath: "profileOrdersApi",
    baseQuery: axiosBaseQuery(),
});

export const {
    reducerPath: profileOrdersApiReducerPath,
    middleware: profileOrdersApiMiddleware,
    reducer: profileOrdersApiReducer,
    useGetOrdersPageMutation,
} = profileOrdersApi;
