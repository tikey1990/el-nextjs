import {
  useToggleTelegramTokenStatusMutation,
  useGetMySettingDataMutation,
  useSetTgKeyMutation,
} from "@features";
import { utilColorInputValid, utilHelperText } from "@utils";
import { ToggleSwitch, ModalPromo } from "@components";
import React, { useEffect, useState } from "react";
import { TextInput, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RHFProvider } from "@providers";
import { HiKey } from "react-icons/hi";

/**
 * Компонент telegram ключа
 * @returns {JSX.Element}
 * @constructor
 */
export const SettingsTgKey = () => {
  const [modalPromo, setModalPromo] = useState(false);

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
  const { telegramTokenStatus, tgKey } = useSelector(
    (state) => state.profileSettings,
  );
  const tgTokenStatus = telegramTokenStatus ?? false; // Статус
  const tgToken = tgKey ?? ""; // Токен Telegram
  // Определяем локальное состояние для состояния переключателя
  const [toggleState, setToggleState] = useState(tgTokenStatus ?? false);

  /**
   * Данные создания ключа для telegram
   */
  const [setTgKey] = useSetTgKeyMutation();

  /**
   * Данные для переключения взаимодействия через Telegram по ключу
   */
  const [toggleTelegramTokenStatus, toggleTelegramTokenStatusQuery] =
    useToggleTelegramTokenStatusMutation();
  const {
    isLoading: isLoadingToggleTelegramTokenStatus,
    isSuccess: isSuccessToggleTelegramTokenStatus,
  } = toggleTelegramTokenStatusQuery;

  /**
   * Данные настроек
   */
  const [getMySettingData] = useGetMySettingDataMutation();

  /**
   * Делаем новый запрос настроек, когда пользователь переключил состояние switch
   */
  useEffect(() => {
    if (
      !isLoadingToggleTelegramTokenStatus &&
      isSuccessToggleTelegramTokenStatus
    ) {
      getMySettingData();
    }
  }, [toggleTelegramTokenStatusQuery]);

  useEffect(() => {
    setValue("key", tgToken); // Устанавливаем значение в поле
  }, [tgToken]);

  /**
   * Слушатель на отправку формы
   */
  const onSubmit = () => {
    setTgKey();
  };

  // Обрабатывайте переключение состояния
  const handleToggleTelegramKey = async (evt) => {
    // Устанавливаем новое состояние переключателя
    setToggleState(evt); // Number(evt) преобразовывает значение в число

    // Затем выполняем запрос на сервер
    // Этот запрос будет отправлен на сервер после того, как состояние переключателя будет обновлено
    await toggleTelegramTokenStatus(Number(evt));
  };

  return (
    <div className="bg-white shadow-content px-5 py-6 rounded-2xl sm:p-10">
      <ModalPromo setOpenModal={setModalPromo} openModal={modalPromo} />

      {/* Заголовок */}
      <h1 className="text-2xl text-gray-600 font-pn-extraboldit mb-6 sm:text-[32px]">
        Настройки
      </h1>

      {/* Подзаголовок */}
      <h2 className="mb-[20px] sm:mb-6 text-[20px] text-gray-600 font-pn-boldit sm:font-pn-extraboldit sm:text-2xl">
        <span>
          Ваш Telegram ключ <br className="sm:hidden" /> для
        </span>{" "}
        <noindex>
          <a
            href="https://t.me/EasyLikerBot"
            className="text-primary-500"
            rel="nofollow noreferrer"
            aria-label="telegram bot"
            target="_blank"
          >
            @EasyLikerBot
          </a>
        </noindex>
      </h2>

      {/* Форма */}
      <RHFProvider
        className="flex w-full flex-col gap-4 sm:flex-row"
        onSubmit={handleSubmit(onSubmit)}
        methods={methods}
      >
        {/* Telegram key */}
        <div className="w-full">
          <TextInput
            color={utilColorInputValid("key", errors, dirtyFields)}
            placeholder={tgToken ? tgToken : "Создайте ключ"}
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
          {tgToken ? "Изменить ключ" : "Создать ключ"}
        </Button>
      </RHFProvider>

      {/* Переключение взаимодействия */}
      <div className="max-sm:mt-5 my-6 flex flex-row items-center text-gray-600 text-sm sm:text-[16px] font-pn-semibold gap-2 sm:gap-3">
        <ToggleSwitch
          onChange={handleToggleTelegramKey}
          checked={toggleState}
          color="primary"
          label=""
        />
        <p>
          {toggleState ? "Можно" : "Нельзя"} взаимодействовать через Telegram по
          ключу
        </p>
      </div>

      <p className="font-pn-semibold text-sm sm:text-[16px] text-gray-600">
        Привяжите свой аккаунт к нашему Telegram боту для удобного оформления
        заказов и участия в ежедневных розыгрышах промокодов.
        <span
          className="cursor-pointer text-primary-500"
          onClick={() => setModalPromo(!modalPromo)}
        >
          {" "}
          Подробнее...
        </span>
      </p>
    </div>
  );
};
