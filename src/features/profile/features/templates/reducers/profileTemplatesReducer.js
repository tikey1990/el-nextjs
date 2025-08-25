import { profileTemplatesApiReducerPath, profileTemplatesApiReducer } from "../api";
import { profileTemplatesSlice } from "../profileTemplatesSlice.js";

/**
 * Reducer шаблонов
 */
export const profileTemplatesReducer = {
    [profileTemplatesApiReducerPath]: profileTemplatesApiReducer,
    profileTemplates: profileTemplatesSlice.reducer,
};
