import {
  useChangeApiTokenStatusMutation,
  useCreateApiTokenMutation,
  useGetMyApiDataMutation,
} from "@features";
import { utilColorInputValid, utilHelperText } from "@utils";
import { TextInput, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { ToggleSwitch } from "@components";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RHFProvider } from "@providers";
import { HiKey } from "react-icons/hi";
import PropTypes from "prop-types";

/**
 * Компонент ключа api
 * @param {string} name - Название секции
 * @returns {Element}
 * @constructor
 */
export const ApiKey = ({ name }) => {
  /**
   * Форма
   */
  const methods = useForm({ mode: "onChange" });
  const {
    formState: { dirtyFields, errors },
    handleSubmit,
    register,
    setValue,
  } = methods;

  /**
   * Store
   */
  const { apiTokenStatus, apiKey } = useSelector((state) => state.profileApi);
  const tokenStatus = apiTokenStatus ?? false; // Статус
  const token = apiKey ?? ""; // Токен API
  // Определяем локальное состояние для состояния переключателя
  const [toggleState, setToggleState] = useState(tokenStatus);

  /**
   * Данные создания ключа для api
   */
  const [createApiToken, createApiTokenQuery] = useCreateApiTokenMutation();
  const { isLoadingCreateApiToken, isSuccessCreateApiToken } =
    createApiTokenQuery;
  const isCreateApiToken = !isLoadingCreateApiToken && isSuccessCreateApiToken;

  /**
   * Данные для переключения взаимодействия через api по ключу
   */
  const [changeApiTokenStatus, changeApiTokenStatusQuery] =
    useChangeApiTokenStatusMutation();
  const {
    isLoading: isLoadingChangeApiTokenStatus,
    isSuccess: isSuccessChangeApiTokenStatus,
  } = changeApiTokenStatusQuery;

  /**
   * Данные api
   */
  const [getMyApiData] = useGetMyApiDataMutation();

  useEffect(() => {
    setToggleState(tokenStatus);
  }, [tokenStatus]);

  /**
   * Делаем новый запрос настроек, когда пользователь переключил состояние switch
   */
  useEffect(() => {
    if (!isLoadingChangeApiTokenStatus && isSuccessChangeApiTokenStatus)
      getMyApiData();
  }, [changeApiTokenStatusQuery]);

  useEffect(() => {
    setValue("key", token); // Устанавливаем значение в поле
  }, [apiKey]);

  /**
   * Слушатель на отправку формы
   */
  const onSubmit = () => {
    createApiToken();
  };

  /**
   * Слушатель на переключения взаимодействия через Telegram по ключу
   */
  const handleToggleTelegramKey = async (evt) => {
    // Устанавливаем новое состояние переключателя
    setToggleState(evt); // Number(evt) преобразовывает значение в число

    // Затем выполняем запрос на сервер
    // Этот запрос будет отправлен на сервер после того, как состояние переключателя будет обновлено
    await changeApiTokenStatus({ status: Number(evt) });
  };

  return (
    <>
      <h1 className="text-2xl text-gray-600 font-pn-extraboldit sm:text-[32px]">
        API документация
      </h1>

      <h2
        className="text-[20px] font-pn-boldit text-gray-600 max-sm:-mb-2 sm:text-2xl"
        id={name}
      >
        {name}
      </h2>

      {/* Форма */}
      <RHFProvider
        className="flex w-full flex-col sm:flex-row gap-4"
        onSubmit={handleSubmit(onSubmit)}
        methods={methods}
      >
        {/* ФAPI key */}
        <div className="w-full">
          <TextInput
            color={utilColorInputValid("key", errors, dirtyFields)}
            placeholder={token ? token : "Ключ еще не создан"}
            helpertext={utilHelperText("key", errors)}
            className="w-full"
            rightIcon={HiKey}
            type="text"
            sizing="lg"
            name="key"
            id="key"
            disabled
            {...register("key")}
          />
        </div>

        <Button
          className="whitespace-nowrap"
          color="primary"
          type="submit"
          size="sm"
        >
          {isCreateApiToken
            ? "Загрузка"
            : token
              ? "Изменить ключ"
              : "Создать ключ"}
        </Button>
      </RHFProvider>

      {/* Переключение взаимодействия */}
      <div className="flex flex-row items-center gap-3">
        <ToggleSwitch
          onChange={handleToggleTelegramKey}
          checked={toggleState}
          color="primary"
          label=""
        />
        <p className="text-base font-pn-semibold text-gray-600 sm:text-[16px]">
          {toggleState ? "Можно" : "Нельзя"} взаимодействовать с API по ключу
        </p>
      </div>
    </>
  );
};

ApiKey.propTypes = {
  /**
   * Название секции
   */
  name: PropTypes.string.isRequired,
};
