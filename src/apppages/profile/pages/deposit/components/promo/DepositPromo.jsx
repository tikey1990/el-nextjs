import {
    toggleHasPremiumSubscriptionActive,
    useGetMySettingDataMutation,
    useGetBalanceMutation,
    useGetCouponMutation,
    setCofetti,
} from "@features";
import { utilColorInputValid, utilHelperText } from "@utils";
import { TextInput, Button, Label } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ModalPromo } from "@components";
import { useTypeDevice } from "@hooks";
import { toast } from "react-toastify";

import "./assets/styles/depositPromo.scss";

/**
 * Компонент промокода
 * @returns {JSX.Element}
 * @constructor
 */
export const DepositPromo = () => {
    const { isMobile } = useTypeDevice();
    const dispatch = useDispatch();
    const [modalPromo, setModalPromo] = useState(false);

    // const { dirtyFields, getValues, setValue, register, errors } = useFormContext();
    const methods = useFormContext();
    const {
        formState: { dirtyFields, errors },
        getValues,
        register,
        setValue,
    } = methods;
    /**
     * Получаем баланс пользователя
     */
    const [getBalance] = useGetBalanceMutation();

    /**
     * Данные настроек
     */
    const [getMySettingData] = useGetMySettingDataMutation();

    const [getCoupon, getCouponQuery] = useGetCouponMutation();
    const { isSuccess, isLoading, isError, error, data } = getCouponQuery;

    const handleClickPromo = () => {
        getCoupon({ promocode: getValues().promo });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            getCoupon({ promocode: getValues().promo });
        }
    };

    useEffect(() => {
        if (!isLoading && isError) toast.error(error);
        else if (!isLoading && isSuccess) {
            setValue("promo", "");
            getBalance();

            if (data?.data?.type === "premium") {
                localStorage.setItem("has_premium_subscription_active", "true");
                dispatch(setCofetti(true));
                dispatch(toggleHasPremiumSubscriptionActive({ force: true }));
                getMySettingData();
                document.querySelector(".app").scrollTo({
                    behavior: "instant",
                    left: 0,
                    top: 0,
                });
            }
        }
    }, [getCouponQuery]);

    return (
        <div className="deposit__content__wrapper promo relative flex flex-row sm:h-[193px] max-sm:w-full items-center">
            {/* Модальное окно промокодов */}
            <ModalPromo setOpenModal={setModalPromo} openModal={modalPromo} />

            <div className="flex flex-col gap-4 sm:gap-6 max-sm:w-full">
                <div className="flex flex-row gap-4 items-center max-sm:justify-between">
                    <Label
                        className="text-[16px] sm:text-2xl font-pn-boldit sm:font-pn-extraboldit text-gray-600 mb-0"
                        value="Промокод"
                        htmlFor="sum"
                    />
                    <span
                        className="font-pn-regular sm:font-pn-regularit text-sm  sm:text-[16px] text-primary-500 cursor-pointer translate-y-[2px]"
                        onClick={() => setModalPromo(true)}
                    >
                        Где взять промокод?
                    </span>
                </div>

                <div className="flex flex-col max-sm:w-full sm:flex-row gap-4">
                    {/* Промокод */}
                    <TextInput
                        color={utilColorInputValid("promo", errors, dirtyFields)}
                        helperText={utilHelperText("promo", errors)}
                        placeholder="Введите, если есть"
                        className="w-full sm:w-[357px]"
                        onKeyDown={handleKeyDown}
                        name="promo"
                        type="text"
                        sizing="lg"
                        id="promo"
                        {...register("promo")}
                    />

                    <Button onClick={handleClickPromo} className="max-sm:w-full" color="primary" size="sm">
                        Применить
                    </Button>
                </div>
            </div>

            {!isMobile && <div className="absolute right-0 w-[285px] h-[229px] promo"></div>}
        </div>
    );
};
