import { utilCallToastOnQueryFulfilled, axiosBaseQuery } from "@utils";
import { createApi } from "@reduxjs/toolkit/query/react";

/**
 * Api моих заказов
 */
export const profileAutoServicesApi = createApi({
    endpoints: (builder) => ({
        /**
         * Изменить статуса заказа автоуслуги (переключатель)
         */
        changeAutoServiceOrderStatus: builder.mutation({
            onQueryStarted: async (args, { queryFulfilled }) => {
                const { status, id } = args;
                utilCallToastOnQueryFulfilled(queryFulfilled, `Отслеживание заказа №${id} ${status ? "включено" : "выключено"}`);
            },
            query: (payload) => ({
                data: {
                    MethodAndForm: "ChangeAutoServiceOrderStatus",
                    ...payload,
                },
                url: "/api/ajax",
            }),
        }),

        /**
         * Получить заказы по австоуслугам по номеру страницы
         */
        getAutoServicesOrdersPage: builder.mutation({
            query: (payload) => ({
                data: {
                    MethodAndForm: "getAutoservicesOrdersPage",
                    ...payload,
                },
                url: "/api/ajax",
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled);
            },
        }),
    }),
    reducerPath: "profileAutoServicesApi",
    baseQuery: axiosBaseQuery(),
});

export const {
    reducerPath: profileAutoServicesApiReducerPath,
    middleware: profileAutoServicesApiMiddleware,
    useChangeAutoServiceOrderStatusMutation,
    reducer: profileAutoServicesApiReducer,
    useGetAutoServicesOrdersPageMutation,
} = profileAutoServicesApi;
