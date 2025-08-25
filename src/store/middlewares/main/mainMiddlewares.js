// Middlewares приложения
import { profileMiddlewares, serviceMiddleware, authMiddleware } from "@features";

/**
 * Главные middlewares приложения
 */
export const mainMiddlewares = [
    // Middleware сервисов
    serviceMiddleware,

    // Middlewares профиля
    ...profileMiddlewares,

    // Middleware авторизации
    authMiddleware,
];
