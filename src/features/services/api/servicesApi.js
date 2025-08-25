import { setAutoRenewalPremiumSubscription, setSubscription, setIsResident, setBalance } from "@features";
import { utilCallToastOnQueryFulfilled, axiosBaseQuery } from "@utils";
import { createApi } from "@reduxjs/toolkit/query/react";

/**
 * Api сервисов
 */
export const servicesApi = createApi({
    endpoints: (builder) => ({
        /**
         * Получение баланса
         */
        getBalance: builder.mutation({
            onQueryStarted: async (arg, api) => {
                const { queryFulfilled, dispatch } = api;
                const { data } = await queryFulfilled;

                utilCallToastOnQueryFulfilled(queryFulfilled);
                dispatch(setBalance(data?.data?.balance));
                dispatch(
                    setSubscription({
                        latest_premium_subscription_end_date: data?.data?.latest_premium_subscription_end_date,
                        auto_renewal_premium_subscription: data?.data?.auto_renewal_premium_subscription,
                        premium_subscription_end_date: data?.data?.premium_subscription_end_date,
                        has_premium_subscription: data?.data?.has_premium_subscription,
                    })
                );
                dispatch(setIsResident(data?.data?.is_resident));
                dispatch(setAutoRenewalPremiumSubscription(data?.data?.auto_renewal_premium_subscription));
            },
            query: () => ({
                data: {
                    MethodAndForm: "GetBalance",
                },
                url: "/api/ajax",
            }),
        }),

        /**
         * Получение качества категорий
         */
        getFeesQualities: builder.mutation({
            query: (payload) => ({
                data: {
                    MethodAndForm: "getFeesQualities",
                    // prettier-ignore
                    "type": payload,
                },
                url: "/api/ajax/fees",
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled);
            },
        }),

        /**
         * Получение категорий услуги по соц. сетям
         */
        getServices: builder.query({
            query: () => ({
                data: {
                    MethodAndForm: "getFeesTypes",
                },
                url: "/api/ajax/fees",
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled);
            },
        }),

        /**
         * Создание заказа (пользователь авторизован)
         */
        createOrder: builder.mutation({
            query: (payload) => ({
                data: {
                    MethodAndForm: "CreateOrder",
                    ...payload,
                },
                url: "/api/ajax",
            }),
        }),
    }),
    baseQuery: axiosBaseQuery(),
    reducerPath: "servicesApi",
});

export const {
    reducerPath: serviceApiReducerPath,
    middleware: serviceMiddleware,
    useGetFeesQualitiesMutation,
    reducer: serviceApiReducer,
    useCreatePreOrderMutation,
    useCreateOrderMutation,
    useGetBalanceMutation,
    useGetServicesQuery,
} = servicesApi;
