import { utilCallToastOnQueryFulfilled, axiosBaseQuery } from "@utils";
import { createApi } from "@reduxjs/toolkit/query/react";

import { setRefCode } from "../profileRefSlice";

/**
 * Api настроек в профиле
 */
export const profileRefApi = createApi({
    endpoints: (builder) => ({
        /**
         * Изменение реферального кода
         */
        changeRefCode: builder.mutation({
            onQueryStarted: async (arg, api) => {
                const { queryFulfilled, dispatch } = api;
                const { data } = await queryFulfilled;

                utilCallToastOnQueryFulfilled(queryFulfilled, "Реферальный код был изменен");
                dispatch(setRefCode(data?.data));
            },
            query: (payload) => ({
                data: {
                    MethodAndForm: "ChangeRefCode",
                    ...payload,
                },
                url: "/api/ajax",
            }),
        }),

        /**
         * Получение основных данных реф. системы
         */
        getRefData: builder.query({
            onQueryStarted: async (arg, api) => {
                const { queryFulfilled, dispatch } = api;
                const { data } = await queryFulfilled;

                utilCallToastOnQueryFulfilled(queryFulfilled);
                dispatch(setRefCode(data?.data?.ref_code));
            },
            query: () => ({
                data: { MethodAndForm: "GetRefData" },
                url: "/api/ajax",
            }),
        }),
    }),
    reducerPath: "profileRefApi",
    baseQuery: axiosBaseQuery(),
});

export const {
    reducerPath: profileRefApiReducerPath,
    middleware: profileRefApiMiddleware,
    reducer: profileRefApiReducer,
    useChangeRefCodeMutation,
    useGetRefDataQuery,
} = profileRefApi;
