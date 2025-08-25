import { utilCallToastOnQueryFulfilled, axiosBaseQuery } from "@utils";
import { deleteTemplate, setTemplates } from "@features";
import { createApi } from "@reduxjs/toolkit/query/react";

/**
 * Api шаблонов
 */
export const profileTemplatesApi = createApi({
    endpoints: (builder) => ({
        /**
         * Добавить / редактировать шаблон
         */
        saveTemplate: builder.mutation({
            onQueryStarted: async (args, { queryFulfilled, dispatch }) => {
                const { data } = await queryFulfilled;

                utilCallToastOnQueryFulfilled(queryFulfilled, `${data?.data?.message ?? "Ваш шаблон обновлен"}`);

                dispatch(setTemplates(null));
                // Повторно вызвать getTemplatesPage после успешного удаления
                dispatch(profileTemplatesApi.util.invalidateTags(["Templates"]));
            },
            query: (payload) => ({
                data: {
                    MethodAndForm: "saveTemplate",
                    ...payload,
                },
                url: "/api/ajax",
            }),
        }),

        /**
         * Изменение имени
         */
        changeTemplateName: builder.mutation({
            onQueryStarted: async (args, { queryFulfilled, dispatch }) => {
                const { data } = await queryFulfilled;

                utilCallToastOnQueryFulfilled(queryFulfilled, `${data?.data ?? "Имя шаблона было изменено"}`);
                dispatch(profileTemplatesApi.util.invalidateTags(["Templates"]));
            },
            query: (payload) => ({
                data: {
                    MethodAndForm: "changeTemplateName",
                    ...payload,
                },
                url: "/api/ajax",
            }),
        }),

        /**
         * Удалить шаблон
         */
        deleteTemplate: builder.mutation({
            onQueryStarted: async (args, { queryFulfilled, dispatch }) => {
                const { data } = await queryFulfilled;

                utilCallToastOnQueryFulfilled(queryFulfilled, `${data?.data ?? "Ваш шаблон удален"}`);

                dispatch(deleteTemplate(args?.id));
            },
            query: (payload) => ({
                data: {
                    MethodAndForm: "deleteTemplate",
                    ...payload,
                },
                url: "/api/ajax",
            }),
        }),

        /**
         * Получение услуг соц сети в шаблоне
         */
        getServicesWebsites: builder.query({
            query: (payload) => ({
                data: {
                    MethodAndForm: "getWebsiteDetailedServices",
                    ...payload,
                },
                url: "/api/ajax",
            }),
            providesTags: ["getWebsiteDetailedServices"],
        }),

        /**
         * Получение шаблонов
         */
        getTemplatesPage: builder.query({
            query: (payload) => ({
                data: {
                    MethodAndForm: "getTemplates",
                    ...payload,
                },
                url: "/api/ajax",
            }),
            providesTags: ["Templates"],
        }),
    }),
    reducerPath: "profileTemplatesApi",
    baseQuery: axiosBaseQuery(),
});

export const {
    reducerPath: profileTemplatesApiReducerPath,
    middleware: profileTemplatesApiMiddleware,
    reducer: profileTemplatesApiReducer,
    useChangeTemplateNameMutation,
    useGetServicesWebsitesQuery,
    useDeleteTemplateMutation,
    useGetTemplatesPageQuery,
    useSaveTemplateMutation,
} = profileTemplatesApi;
