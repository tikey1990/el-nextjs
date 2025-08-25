import { useToggleTelegramTokenStatusMutation, useGetMySettingDataMutation, useSetTgKeyMutation } from "@features";
import { ModalPromo, Switch, Button, Label, Form } from "@components";
import { DecoratorDataComponent } from "@decorators";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RHFProvider } from "@providers";

import "../assets/styles/settingsKey.scss";

/**
 * Компонент взаимодействия по клочу в настройках
 * @returns {JSX.Element}
 * @constructor
 */
export const SettingsKey = () => {
    const [modalPromo, setModalPromo] = useState(false);
    const methods = useForm(); // Форма с switch

    /**
     * Store
     */
    const tgKey = useSelector((state) => state.profileSettings.tgKey);
    const telegramTokenStatus = useSelector((state) => state.profileSettings.telegramTokenStatus);

    /**
     * Данные создания ключа для telegram
     */
    const [setTgKey, setTgKeyQuery] = useSetTgKeyMutation();
    const { isLoading: isLoadingSetTgKey } = setTgKeyQuery;

    /**
     * Данные для переключения взаимодействия через Telegram по ключу
     */
    const [toggleTelegramTokenStatus, toggleTelegramTokenStatusQuery] = useToggleTelegramTokenStatusMutation();

    /**
     * Данные настроек
     */
    const [getMySettingData, getMySettingDataQuery] = useGetMySettingDataMutation();

    const tgTokenStatus = telegramTokenStatus ?? false; // Статус
    const tgToken = tgKey ?? ""; // Токен Telegram

    /**
     * Делаем новый запрос настроек, когда пользователь переключил состояние switch
     */
    useEffect(() => {
        getMySettingData();
    }, [toggleTelegramTokenStatusQuery]);

    /**
     * Слушатель на создание ключа для Telegram
     */
    const handleSubmitKey = () => {
        setTgKey();
    };

    /**
     * Слушатель на переключения взаимодействия через Telegram по ключу
     */
    const handleToggleTelegramKey = (evt) => {
        toggleTelegramTokenStatus(Number(evt.target.checked));
    };

    return (
        <div className="settings__wrapper key">
            {/* Модальное окно промокодов */}
            <ModalPromo setOpenModal={setModalPromo} openModal={modalPromo} />

            <h1 className="text text-color-black text-type-extrabold-it text-size-xl">Настройки</h1>

            <DecoratorDataComponent query={getMySettingDataQuery}>
                <Form
                    formConfig={[
                        {
                            label: (labelClass) => (
                                <Label className={labelClass}>
                                    <p className="text text-color-black text-type-extrabold-it text-size-lg">
                                        Ваш Telegram ключ для{" "}
                                        <noindex>
                                            <a
                                                href="https://t.me/EasyLikerBot"
                                                className="text-color-primary"
                                                rel="nofollow noreferrer"
                                                target="_blank"
                                            >
                                                @EasyLikerBot
                                            </a>
                                        </noindex>
                                    </p>
                                </Label>
                            ),
                            component: {
                                props: {
                                    placeholder: "Ключ еще не создан",
                                    className: "key-input",
                                    value: tgToken,
                                    disabled: true,
                                    type: "text",
                                },
                            },
                            type: "input",
                            name: "key",
                        },
                    ]}
                    buttonSubmit={
                        <Button disabled={isLoadingSetTgKey} aria-label="Создать ключ" variant="primary" type="submit" size="medium">
                            {isLoadingSetTgKey ? "Загрузка" : "Создать ключ"}
                        </Button>
                    }
                    defaultValues={{ key: tgToken }}
                    onSubmit={handleSubmitKey}
                    serverError={false}
                    name="key"
                />

                <RHFProvider methods={methods}>
                    <Switch onChange={handleToggleTelegramKey} checked={tgTokenStatus} position="right" name="isKey">
                        <p className="text text-color-black text-type-semibold text-size-md">
                            Можно взаимодействовать через Telegram по ключу
                        </p>
                    </Switch>
                </RHFProvider>
            </DecoratorDataComponent>

            <p className="text-promo text text-color-black text-type-semibold text-size-md">
                Привяжите свой аккаунт к нашему Telegram боту для удобного оформления заказов и участия в ежедневных розыгрышах промокодов.{" "}
                <button onClick={() => setModalPromo(true)} className="text-color-primary">
                    Подробнее...
                </button>
            </p>
        </div>
    );
};
