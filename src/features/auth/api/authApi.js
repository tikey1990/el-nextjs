import { toggleHasPremiumSubscriptionActive, setLoginSocialsResponse, setLoading, setCofetti, setToken, setError } from "@features";
import { utilCallToastOnQueryFulfilled, utilYMRegistration, utilAuthSetTokens, utilRegConfetti, axiosBaseQuery } from "@utils";
import { createApi } from "@reduxjs/toolkit/query/react";
import { VAR_IS_MODE_PREDPROD_OR_PROD } from "@vars";
import { toast } from "react-toastify";

/**
 * Api авторизации
 */
export const authApi = createApi({
    endpoints: (builder) => ({
        /**
         * Регистрация
         */
        register: builder.mutation({
            onQueryStarted: async (args, api) => {
                const { queryFulfilled, dispatch } = api;
                const { data } = await queryFulfilled;

                if (VAR_IS_MODE_PREDPROD_OR_PROD && !data) {
                    dispatch(setLoading(false));
                    dispatch(setError(data?.data.response?.data?.error));
                } else if (!VAR_IS_MODE_PREDPROD_OR_PROD && !data) {
                    dispatch(setLoading(false));
                    dispatch(setError(data.error.message));
                } else {
                    dispatch(setLoading(false));
                    dispatch(setToken(data.data.token));

                    utilAuthSetTokens(data.data);
                    utilYMRegistration();

                    if (data.data?.received_premium) {
                        dispatch(setCofetti(true));
                        localStorage.setItem("has_premium_subscription_active", "true");
                        dispatch(toggleHasPremiumSubscriptionActive({ force: true }));
                    }
                    if (!data.data.isMobile) toast.success("Вы успешно зарегистрировались");
                }
            },
            query: (payload) => ({
                data: {
                    MethodAndForm: "Signup",
                    ...payload,
                    isMobile: undefined,
                },
                url: "/api/ajax/fees",
            }),
        }),

        /**
         * Авторизация
         */
        login: builder.mutation({
            onQueryStarted: async (args, api) => {
                const { queryFulfilled, dispatch } = api;
                const { data } = await queryFulfilled;

                if (VAR_IS_MODE_PREDPROD_OR_PROD && !data) {
                    dispatch(setLoading(false));
                    dispatch(setError(data?.response?.data?.error));
                } else if (!VAR_IS_MODE_PREDPROD_OR_PROD && !data) {
                    dispatch(setLoading(false));
                    dispatch(setError(data.message));
                } else {
                    dispatch(setLoading(false));
                    dispatch(setToken(data.data.token));

                    utilAuthSetTokens(data.data);
                    toast.success("Вы успешно авторизовались");
                }
            },
            query: (payload) => ({
                data: {
                    MethodAndForm: "Login",
                    ...payload,
                },
                url: "/api/ajax/fees",
            }),
        }),

        /**
         * Авторизация с помощью Google
         */
        authWithSocials: builder.mutation({
            onQueryStarted: async (args, api) => {
                const { queryFulfilled, dispatch } = api;

                dispatch(setLoginSocialsResponse(null));

                const { data } = await queryFulfilled;

                if (data) {
                    utilRegConfetti(dispatch, data.data);
                    utilAuthSetTokens(data.data);
                }
            },
            query: (payload) => ({
                data: {
                    MethodAndForm: "LoginBySocials",
                    ...payload,
                },
                url: "/api/ajax/fees",
            }),
        }),

        /**
         * Восстановление аккаунта этап №1
         */
        sendRecoveryEmail: builder.mutation({
            query: (payload) => ({
                data: {
                    MethodAndForm: "SendRecoveryEmail",
                    ...payload,
                },
                url: "/api/ajax/fees",
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled, "Ссылка на восставновление пароля отправлена вам на почту");
            },
        }),
        /**
         * Восстановление аккаунта этап №2
         */
        recoveryPassword: builder.mutation({
            query: (payload) => ({
                data: {
                    MethodAndForm: "RecoveryPassword",
                    ...payload,
                },
                url: "/api/ajax/fees",
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled, "Ваш пароль был успешно восстановлен");
            },
        }),
    }),
    baseQuery: axiosBaseQuery(),
    reducerPath: "authApi",
});

export const {
    reducerPath: authApiReducerPath,
    useSendRecoveryEmailMutation,
    useRecoveryPasswordMutation,
    useAuthWithSocialsMutation,
    middleware: authMiddleware,
    reducer: authApiReducer,
    useRegisterMutation,
    useLoginMutation,
} = authApi;
