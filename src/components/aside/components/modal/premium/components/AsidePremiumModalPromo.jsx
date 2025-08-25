import {
    useActivatePremiumSubscriptionPromocodeMutation,
    toggleHasPremiumSubscriptionActive,
    useGetMySettingDataMutation,
    useGetBalanceMutation,
    setCofetti,
} from "@features";
import { utilColorInputValid, utilHelperText } from "@utils";
import { TextInput, Button } from "flowbite-react";
import { useYupValidationResolver } from "@hooks";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { RHFProvider } from "@providers";
import React, { useEffect } from "react";
import { Modal } from "@components";
import PropTypes from "prop-types";
import * as yup from "yup";

export const AsidePremiumModalPromo = ({ setOpenModal, openModal }) => {
    const dispatch = useDispatch();

    /**
     * Form
     */
    const resolver = useYupValidationResolver(
        yup.object({
            promo: yup.string().required("Поле должно быть заполнено!"),
        })
    );
    const methods = useForm({ mode: "onChange", resolver });
    const {
        formState: { dirtyFields, errors },
        handleSubmit,
        register,
        reset,
    } = methods;

    const [activatePremiumSubscriptionPromocode, activatePremiumSubscriptionPromocodeQuery] =
        useActivatePremiumSubscriptionPromocodeMutation();
    const { isLoading, isSuccess } = activatePremiumSubscriptionPromocodeQuery;

    /**
     * Данные настроек
     */
    const [getMySettingData] = useGetMySettingDataMutation();

    /**
     * Получаем баланс пользователя
     */
    const [getBalance] = useGetBalanceMutation();

    const onSubmit = (data) => {
        activatePremiumSubscriptionPromocode({ promocode: data.promo });
    };

    useEffect(() => {
        if (!isLoading && isSuccess) {
            reset();
            setOpenModal(false);
            localStorage.setItem("has_premium_subscription_active", "true");
            dispatch(setCofetti(true));
            dispatch(toggleHasPremiumSubscriptionActive({ force: true }));
            getMySettingData();
            getBalance();
        }
    }, [activatePremiumSubscriptionPromocodeQuery]);

    return (
        <Modal className="w-[450px] sm:-translate-y-[200px]" setOpenModal={setOpenModal} openModal={openModal}>
            <p className="text-2xl text-gray-600 font-pn-boldit text-center mb-4">Промокод для получения премиум подписки</p>

            <RHFProvider className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)} methods={methods}>
                <div>
                    <TextInput
                        color={utilColorInputValid("promo", errors, dirtyFields)}
                        helperText={utilHelperText("promo", errors)}
                        placeholder="Введите промокод"
                        className="w-full"
                        name="promo"
                        sizing="lg"
                        type="text"
                        id="promo"
                        {...register("promo")}
                    />
                </div>

                {/* Button submit */}
                <Button color="primary" type="submit" size="md">
                    Активировать промокод
                </Button>
            </RHFProvider>
        </Modal>
    );
};

AsidePremiumModalPromo.propTypes = {
    /**
     * State modal set
     */
    setOpenModal: PropTypes.func,

    /**
     * State modal
     */
    openModal: PropTypes.bool,
};
