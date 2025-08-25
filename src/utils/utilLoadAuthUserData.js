"use client";
import {
  useGetMySettingDataMutation,
  useGetMyApiDataMutation,
  useGetBalanceMutation,
  profileTemplatesApi,
} from "@features";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAuth } from "@hooks";

/**
 * Утилита для загрузки данных об авторизованном пользователе
 */
export const utilLoadAuthUserData = () => {
  const { isAuth } = useAuth();
  const dispatch = useDispatch();

  /**
   * Данные настроек
   */
  const [getMySettingData] = useGetMySettingDataMutation();

  /**
   * Данные api
   */
  const [getMyApiData] = useGetMyApiDataMutation();

  /**
   * Получаем баланс пользователя
   */
  const [getBalance] = useGetBalanceMutation();

  useEffect(() => {
    if (isAuth) {
      getMySettingData();
      getMyApiData();
      getBalance();
      // Повторно вызвать getTemplatesPage после успешного удаления
      dispatch(profileTemplatesApi.util.invalidateTags(["Templates"]));
    }
  }, [isAuth]);
};
