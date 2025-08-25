import { utilServicesChangeStatusMassOrder, utilServicesCheckOrder } from "@utils";
import { useYupValidationResolver, useTypeDevice, useAuth } from "@hooks";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "@features";
import { IconSpinner } from "@icons/index.js";
import { useForm } from "react-hook-form";
import { RHFProvider } from "@providers";
import { Button } from "flowbite-react";
import React from "react";

import {
    ServicesFormModalCreateOrderYt,
    ServicesBigBannerInfoBanner,
    ServicesFormAutoPostViews,
    ServicesMassOrderToggle,
    ServicesFormPollVotes,
    ServicesFormDuration,
    ServicesFormComments,
    ServicesFormSelect,
    ServicesFormLinks,
    ServicesFormCount,
    ServicesSumOrder,
} from "./";
import { servicesSchemaValidation, utilServicesFormSubmit, classFormLinksSection } from "../../utils";

/**
 * Компонент формы сервисов
 * @returns {JSX.Element}
 * @constructor
 */
export const ServicesForm = () => {
    const { isMobile } = useTypeDevice();
    const dispatch = useDispatch();
    const { isAuth } = useAuth();

    /**
     * Получение данных об услугах и качестве из Redux store
     */
    const serviceInfo = useSelector((state) => state.services.route.serviceInfo);
    const quality = useSelector((state) => state.services.route.quality);

    // Массовые заказы
    const massOrders = useSelector((state) => state.services.massOrders);

    const textButtonSubmit = serviceInfo?.name === "auto_post_views" ? "Отслеживать" : "Купить";

    /**
     * Redux-хук для создания заказа
     */
    const [createOrder, createOrderQuery] = useCreateOrderMutation();
    const { isLoading } = createOrderQuery;

    /**
     * Инициализация формы
     */
    const resolver = useYupValidationResolver(servicesSchemaValidation(quality, serviceInfo, quality), 500);
    const methods = useForm({
        defaultValues: {
            speed_per_ad_post: 1,
            duration_slider: 1,
            speed_per_post: 1,
            massOrder: false,
            speed_slider: 1,
        },
        mode: "onChange",
        resolver,
    });
    const { handleSubmit, getValues, reset, watch } = methods;

    utilServicesCheckOrder(createOrderQuery, getValues, reset);

    utilServicesChangeStatusMassOrder(createOrder, createOrderQuery, massOrders);

    return (
        <>
            <ServicesFormModalCreateOrderYt />

            <RHFProvider
                onSubmit={handleSubmit((data) =>
                    utilServicesFormSubmit(data, createOrder, dispatch, isAuth, serviceInfo, quality, massOrders)
                )}
                className="flex flex-col flex-nowrap gap-5 sm:gap-6"
                methods={methods}
            >
                <h2 className="font-pn-boldit text-[20px] sm:text-2xl text-gray-600">Запуск накрутки</h2>

                <ServicesMassOrderToggle />

                <div className={classFormLinksSection(getValues)}>
                    <ServicesFormLinks />

                    <ServicesFormCount />
                </div>

                <ServicesFormComments />

                <ServicesFormAutoPostViews />

                <ServicesFormSelect />

                {/* Слайдеры */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    {/* Удержание на видео */}
                    <ServicesFormDuration />

                    <ServicesFormPollVotes />

                    {isMobile && <ServicesSumOrder />}

                    {/* Submit */}
                    <Button
                        className="w-full sm:min-w-[200px] sm:max-w-[200px] sm:ml-auto"
                        disabled={isLoading && !watch("massOrder")}
                        color="primary"
                        type="submit"
                        size="sm"
                    >
                        {isLoading && !watch("massOrder") ? <IconSpinner className="w-[20px]" /> : textButtonSubmit}
                    </Button>
                </div>

                <ServicesBigBannerInfoBanner />
            </RHFProvider>
        </>
    );
};
