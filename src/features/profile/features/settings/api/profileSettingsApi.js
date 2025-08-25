import { setTelegramTokenStatus, setEmailIsConfirmed, setTgKey, setEmail } from "@features";
import { utilCallToastOnQueryFulfilled, axiosBaseQuery } from "@utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

/**
 * Api настроек в профиле
 */
export const profileSettingsApi = createApi({
    endpoints: (builder) => ({
        /**
         * Получение данных о настройках
         */
        getMySettingData: builder.mutation({
            onQueryStarted: async (arg, api) => {
                const { queryFulfilled, dispatch } = api;
                const { data } = await queryFulfilled;

                utilCallToastOnQueryFulfilled(queryFulfilled);
                dispatch(setTelegramTokenStatus(data?.data["telegram_token_status"]));
                dispatch(setTgKey(data?.data["telegram_token"]));
                dispatch(setEmail(data?.data["email"]));
                dispatch(setEmailIsConfirmed(data?.data["email_is_confirmed"]));
            },
            query: () => ({
                data: { MethodAndForm: "GetMySettingData" },
                url: "/api/ajax",
            }),
        }),

        /**
         * Покупка премиум подписки
         */
        purchasePremiumSubscription: builder.mutation({
            onQueryStarted: async (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled, "Премиум подписка успешно приобретена");
                setTimeout(() => queryFulfilled.then(() => toast.warning("Автопродление подписки можно выключить в настройках")), 3500);
            },
            query: (payload) => ({
                data: {
                    MethodAndForm: "PurchasePremiumSubscription",
                    ...payload,
                },
                url: "/api/ajax",
            }),
        }),

        /**
         * Сделать новый ключ api для telegram
         */
        setTgKey: builder.mutation({
            onQueryStarted: async (arg, api) => {
                const { queryFulfilled, dispatch } = api;
                const { data } = await queryFulfilled;

                utilCallToastOnQueryFulfilled(queryFulfilled, "Новый ключ API для Telegram был успешно создан");
                dispatch(setTgKey(data?.data));
            },
            query: () => ({
                data: {
                    MethodAndForm: "CreateTelegramToken",
                },
                url: "/api/ajax",
            }),
        }),

        /**
         * Изменение статуса автопродления премиум подписки
         */
        changeAutoRenewalPremiumSubscriptionStatus: builder.mutation({
            query: (payload) => ({
                data: {
                    MethodAndForm: "ChangeAutoRenewalPremiumSubscriptionStatus",
                    ...payload,
                },
                url: "/api/ajax",
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled, "Статус автопродления премиум подписки был успешно изменен");
            },
        }),

        /**
         * Aктивация промокода на получение премиум-подписки.
         */
        activatePremiumSubscriptionPromocode: builder.mutation({
            query: (payload) => ({
                data: {
                    MethodAndForm: "ActivatePremiumSubscriptionPromocode",
                    ...payload,
                },
                url: "/api/ajax",
            }),
            onQueryStarted: (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled, "Промокод успешно активирован");
            },
        }),

        /**
         * Подтверждение почты этап №2
         */
        confirmEmail: builder.mutation({
            query: (payload) => ({
                data: {
                    MethodAndForm: "ConfirmEmail",
                    ...payload,
                },
                url: "/api/ajax",
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled, "Ваша почты была успешно подтверждена");
            },
        }),

        /**
         * Изменение почты
         */
        changeEmail: builder.mutation({
            query: (payload) => ({
                data: {
                    MethodAndForm: "ChangeEmail",
                    ...payload,
                },
                url: "/api/ajax",
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled, "Ваша почта была успешно изменена");
            },
        }),

        /**
         * Смена пароля
         */
        changePassword: builder.mutation({
            query: (payload) => ({
                data: {
                    MethodAndForm: "ChangePassword",
                    ...payload,
                },
                url: "/api/ajax",
            }),
            onQueryStarted: (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled, "Ваш пароль был успешно изменен");
            },
        }),

        /**
         * Переключение возможности взаимодействия через Telegram по ключу
         */
        toggleTelegramTokenStatus: builder.mutation({
            query: (payload) => ({
                data: {
                    MethodAndForm: "ChangeTelegramTokenStatus",
                    status: payload,
                },
                url: "/api/ajax",
            }),
            onQueryStarted: (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled);
            },
        }),

        /**
         * Подтверждение почты этап №1
         */
        sendConfirmEmail: builder.mutation({
            onQueryStarted: (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled, "Ссылка на подтверждение почты была отослана на ваш email");
            },
            query: () => ({
                data: {
                    MethodAndForm: "SendConfirmEmail",
                },
                url: "/api/ajax",
            }),
        }),
    }),
    reducerPath: "profileSettingsApi",
    baseQuery: axiosBaseQuery(),
});

export const {
    useChangeAutoRenewalPremiumSubscriptionStatusMutation,
    useActivatePremiumSubscriptionPromocodeMutation,
    reducerPath: profileSettingsApiReducerPath,
    middleware: profileSettingsApiMiddleware,
    usePurchasePremiumSubscriptionMutation,
    useToggleTelegramTokenStatusMutation,
    reducer: profileSettingsApiReducer,
    useGetMySettingDataMutation,
    useSendConfirmEmailMutation,
    useChangePasswordMutation,
    useConfirmEmailMutation,
    useChangeEmailMutation,
    useSetTgKeyMutation,
} = profileSettingsApi;
