// Импорт библиотек
import { createSlice } from "@reduxjs/toolkit";

// State
import { profileSettingsInitState } from "./state";

/**
 * Slice для страницы настроек профиля
 */
export const profileSettingsSlice = createSlice({
    reducers: {
        /**
         * Установить подписку
         */
        setSubscription: (state, action) => {
            if (action.payload.has_premium_subscription) state.has_premium_subscription = action.payload.has_premium_subscription;
            if (action.payload.premium_subscription_end_date)
                state.premium_subscription_end_date = action.payload.premium_subscription_end_date;
            if (action.payload.auto_renewal_premium_subscription)
                state.auto_renewal_premium_subscription = action.payload.auto_renewal_premium_subscription;
            if (action.payload.latest_premium_subscription_end_date)
                state.latest_premium_subscription_end_date = action.payload.latest_premium_subscription_end_date;
        },

        toggleHasPremiumSubscriptionActive: (state, action) => {
            if (action?.payload?.force === true) {
                state.has_premium_subscription_active = true;
            } else {
                const hasPremiumSubscriptionActive = localStorage.getItem("has_premium_subscription_active");
                localStorage.setItem("has_premium_subscription_active", `${hasPremiumSubscriptionActive === "true" ? "false" : "true"}`);

                state.has_premium_subscription_active = localStorage.getItem("has_premium_subscription_active") === "true";
            }
        },

        /**
         * Устанавливаем баланс
         */
        setBalance: (state, action) => {
            if (state.prevBalance !== action.payload && state.balance !== null) {
                state.prevBalance = state.balance;
            } else if (state.balance !== null) state.prevBalance = action.payload;
            else {
                state.prevBalance = action.payload;
            }

            state.balance = action.payload;
        },

        /**
         * Выставить параметры звездного неба
         */
        setStars: (state, action) => {
            state.stars = action.payload;
            localStorage.setItem("stars_status", action.payload.status);
            localStorage.setItem("stars_fps", action.payload.fps);
        },

        /**
         * Выставить статус автопродления премиум подписки
         */
        setAutoRenewalPremiumSubscription: (state, action) => {
            state.auto_renewal_premium_subscription = action.payload;
        },

        /**
         * Выставить статус взаимодействия через Telegram по ключу
         */
        setTelegramTokenStatus: (state, action) => {
            state.telegramTokenStatus = action.payload;
        },

        /**
         * Выставить статус подтверждения почты пользователя
         */
        setEmailIsConfirmed: (state, action) => {
            state.emailIsConfirmed = action.payload;
        },

        setPrevBalance: (state, action) => {
            state.prevBalance = action.payload;
        },

        /**
         * Установить статус пользователя
         */
        setIsResident: (state, action) => {
            state.is_resident = action.payload;
        },

        setCofetti: (state, action) => {
            state.confetti = action.payload;
        },

        /**
         * Выставить ключ Telegram
         */
        setTgKey: (state, action) => {
            state.tgKey = action.payload;
        },

        /**
         * Выставить почту пользователя
         */
        setEmail: (state, action) => {
            state.email = action.payload;
        },
    },
    initialState: profileSettingsInitState,
    name: "profileSettings",
});

export const {
    toggleHasPremiumSubscriptionActive,
    setAutoRenewalPremiumSubscription,
    setTelegramTokenStatus,
    setEmailIsConfirmed,
    setSubscription,
    setPrevBalance,
    setIsResident,
    setCofetti,
    setBalance,
    setEmail,
    setStars,
    setTgKey,
} = profileSettingsSlice.actions;
