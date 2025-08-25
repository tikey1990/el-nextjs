import { utilCallToastOnQueryFulfilled, axiosBaseQuery } from "@utils";
import { createApi } from "@reduxjs/toolkit/query/react";

import { setApiTokenStatus, setApiKey } from "../";

/**
 * Api api в профиле
 */
export const profileApiApi = createApi({
    endpoints: (builder) => ({
        /**
         * Получение основных данных для страницы
         */
        getMyApiData: builder.mutation({
            onQueryStarted: async (arg, api) => {
                const { queryFulfilled, dispatch } = api;
                const { data } = await queryFulfilled;

                utilCallToastOnQueryFulfilled(queryFulfilled);
                dispatch(setApiKey(data?.data["api_token"]));
                dispatch(setApiTokenStatus(data?.data["api_token_status"]));
            },
            query: () => ({
                data: { MethodAndForm: "GetMyApiData" },
                url: "/api/ajax",
            }),
        }),

        /**
         * Сгенерировать новый токен (ключ) для взаимодействия через API
         */
        createApiToken: builder.mutation({
            onQueryStarted: async (arg, api) => {
                const { queryFulfilled, dispatch } = api;
                const { data } = await queryFulfilled;

                utilCallToastOnQueryFulfilled(queryFulfilled, "Новый токен сгенерирован");
                dispatch(setApiKey(data?.data));
            },
            query: () => ({
                data: {
                    MethodAndForm: "CreateApiToken",
                },
                url: "/api/ajax",
            }),
        }),

        /**
         * Включить/Выключить взаимодействие через API по ключу
         */
        changeApiTokenStatus: builder.mutation({
            query: (payload) => ({
                data: {
                    MethodAndForm: "ChangeApiTokenStatus",
                    ...payload,
                },
                url: "/api/ajax",
            }),
            onQueryStarted: async (args, { queryFulfilled }) => {
                utilCallToastOnQueryFulfilled(queryFulfilled);
            },
        }),
    }),
    reducerPath: "profileApiApi",
    baseQuery: axiosBaseQuery(),
});

export const {
    reducerPath: profileApiApiReducerPath,
    middleware: profileApiApiMiddleware,
    useChangeApiTokenStatusMutation,
    reducer: profileApiApiReducer,
    useCreateApiTokenMutation,
    useGetMyApiDataMutation,
} = profileApiApi;
