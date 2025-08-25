// Импорт библиотек
import { createSlice } from "@reduxjs/toolkit";
import { utilMergeOrders } from "@utils";

// State
import { profileTemplateInitState } from "./state";

/**
 * Slice для страницы шаблонов
 */
export const profileTemplatesSlice = createSlice({
    reducers: {
        /**
         * Установка информации о создании шаблона
         */
        setCreateTemplate: (state, action) => {
            if (action.payload === null) {
                state.template.total_price = profileTemplateInitState.template.total_price;
                state.template.services = profileTemplateInitState.template.services;
                state.template.service = profileTemplateInitState.template.service;
                state.template.name = profileTemplateInitState.template.name;
                state.template.type = profileTemplateInitState.template.type;
                state.template.id = undefined;
            } else {
                if (action.payload.services) state.template.services = action.payload.services;
                if (action.payload.name) state.template.name = action.payload.name;
                if (action.payload.service) state.template.service = action.payload.service;
                if (action.payload.type) state.template.type = action.payload.type;
                if (action.payload.id) state.template.id = action.payload.id;
                if (action.payload.total_price) state.template.total_price = action.payload.total_price;
            }
        },

        /**
         * Установка информации о шаблонах
         */
        setTemplates: (state, action) => {
            if (action.payload === null) state.templates = [];
            else if (action.payload.length === 0) state.templates = action.payload;
            else state.templates = utilMergeOrders(state.templates, action.payload);
        },

        /**
         * Удаление услуги из шаблона
         */
        deleteService: (state, action) => {
            if (state.template.services.length === 1) state.template.type = "create";
            state.template.services = state.template.services.filter((elem, index) => index !== action.payload);
        },

        deleteTemplate: (state, action) => {
            state.templates = state.templates.filter((elem) => elem.id !== action.payload);
        },

        /**
         * Установка выбранного select для удаления
         */
        setDeleteSelectTemplate: (state, action) => {
            state.deleteSelect = action.payload;
        },

        /**
         * Установка выбранного select
         */
        setSelectTemplate: (state, action) => {
            state.select = action.payload;
        },
    },
    initialState: profileTemplateInitState,
    name: "profileTemplates",
});

export const { setDeleteSelectTemplate, setSelectTemplate, setCreateTemplate, deleteTemplate, deleteService, setTemplates } =
    profileTemplatesSlice.actions;
