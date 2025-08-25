import { createSlice } from "@reduxjs/toolkit";

// State
import { servicesInitState } from "./state";

/**
 * Slice сервисов
 */
export const servicesSlice = createSlice({
  reducers: {
    /**
     * Установка статуса заказа
     */
    setMassOrder: (state, action) => {
      state?.massOrders?.forEach((elem) => {
        const findElem = elem?.data?.find(
          (elem) => elem?.id === action.payload.id,
        );

        // Меняем статус
        if (findElem?.status) {
          findElem.status = action.payload?.status;

          if (findElem?.status === "finished") {
            if (action.payload?.["newId"])
              findElem.newId = action.payload?.["newId"];
            if (action.payload?.["currBal"])
              findElem.currBal = action.payload?.["currBal"];
            if (action.payload?.["link"])
              findElem.link = action.payload?.["link"];
          }
        }

        // Если есть сообщение об ошибке
        if (action.payload?.errorMessage && findElem)
          findElem.errorMessage = action.payload?.errorMessage;
      });
    },

    /**
     * Установка статуса первого открытия модалки
     */
    setMassOrderIsOpenedFirstOrder: (state, action) => {
      state.massOrders.find(
        (elem) => elem.id === action.payload.id,
      ).isOpenedFirstOrder = action.payload.isOpenedFirstOrder;
    },

    /**
     * Установка статуса массового заказа
     */
    setMassOrdersStatus: (state, action) => {
      state.massOrders.find((elem) => elem.id === action.payload.id).status =
        action.payload.status;
    },

    /**
     * Данные о массовом заказе
     */
    setMassOrders: (state, action) => {
      state.massOrders = [action.payload, ...state.massOrders];
    },

    /**
     * Action для этапов сервисов
     */
    setBannerStep: (state, { payload }) => {
      state.bannerStep.step = payload;
    },

    /**
     * Установка информации маршрута
     */
    setServicesRoute: (state, action) => {
      console.log(action.payload);
      state.route = action.payload;
    },

    /**
     * Очистка данных о массовом заказе
     */
    clearMassOrders: (state) => {
      state.massOrders = [];
    },
  },
  initialState: servicesInitState,
  name: "services",
});

export const {
  setMassOrderIsOpenedFirstOrder,
  setMassOrdersStatus,
  setServicesRoute,
  clearMassOrders,
  setBannerStep,
  setMassOrders,
  setMassOrder,
} = servicesSlice.actions;
