import { getUserToken } from "@utils";

/**
 * Начальное состояние аунтефикации
 * @type {{userInfo: {}, userToken: null, success: boolean, loading: boolean, error: null}}
 */
export const authInitState = {
    /**
     * Данные response полученные в результате аутентификации через соц сети
     */
    loginSocialsResponse: null,

    /**
     * Токен пользователя
     */
    auth: getUserToken,

    /**
     * Состояние загрузки
     */
    loading: false,

    /**
     * Ошибки
     */
    error: null,
};
