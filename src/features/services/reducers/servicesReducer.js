// Slice
// Services
import { serviceApiReducerPath, serviceApiReducer } from "../api/servicesApi";
import { servicesSlice } from "../servicesSlice";

/**
 * Reducer сервисов
 */
export const servicesReducer = {
    [serviceApiReducerPath]: serviceApiReducer,
    services: servicesSlice.reducer,
};
