import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";
// Reducers
import { mainReducer } from "@reducers";

// Middlewares
import { mainMiddlewares } from "./middlewares";

/**
 * Store Приложения
 */

export const makeStore = () => {
  return configureStore({
    /**
     * Middleware
     */
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        mainMiddlewares,
      ),

    /**
     * Reducer
     */
    reducer: { ...mainReducer },

    devTools: true,
  });
};
