// Reducers from features
import { servicesReducer, profileReducers, authReducer, uiReducer } from "@features";

/**
 * Главный reducer приложения
 */
export const mainReducer = {
    /**
     * Аутентификация
     */
    ...authReducer,

    /**
     * Ui
     */
    ...uiReducer,

    /**
     * Тарифы
     */
    ...servicesReducer,

    /**
     * Профиль
     */
    ...profileReducers,
};
