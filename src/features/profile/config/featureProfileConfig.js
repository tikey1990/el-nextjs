import { profileSettingsApiMiddleware, ProfileSettingsReducer } from "@features/profile/features/settings";
import { profileDepositApiMiddleware, profileDepositReducer } from "@features/profile/features/deposit";
import { profileAutoServicesApiMiddleware } from "@features/profile/features/autoServices/api";
import { profileAutoServicesReducer } from "@features/profile/features/autoServices/reducers";
import { profileTemplatesReducer } from "@features/profile/features/templates/reducers";
import { profileTemplatesApiMiddleware } from "@features/profile/features/templates";
import { profileHistoryApiMiddleware } from "@features/profile/features/history/api";
import { profileHistoryReducer } from "@features/profile/features/history/reducers";
import { profileOrdersReducer } from "@features/profile/features/orders/reducers";
import { profileOrdersApiMiddleware } from "@features/profile/features/orders";
import { profileApiApiMiddleware } from "@features/profile/features/api/api";
import { profileRefApiMiddleware } from "@features/profile/features/ref/api";
import { profileRefReducer } from "@features/profile/features/ref/reducers";
import { profileApiReducer } from "@features/profile/features/api/reducers";

/**
 * Middlewares профиля
 */
export const profileMiddlewares = [
    profileDepositApiMiddleware,
    profileSettingsApiMiddleware,
    profileRefApiMiddleware,
    profileHistoryApiMiddleware,
    profileOrdersApiMiddleware,
    profileApiApiMiddleware,
    profileAutoServicesApiMiddleware,
    profileTemplatesApiMiddleware,
];

/**
 * Reducers профиля
 */
export const profileReducers = {
    ...profileDepositReducer,
    ...ProfileSettingsReducer,
    ...profileRefReducer,
    ...profileHistoryReducer,
    ...profileOrdersReducer,
    ...profileApiReducer,
    ...profileAutoServicesReducer,
    ...profileTemplatesReducer,
};
