import AsidePremiumModal from "@components/aside/components/modal/premium/AsidePremiumModal.jsx";
import { useFormContext, Controller } from "react-hook-form";
import Tooltip from "@components/popup/Tooltip.jsx";
import { IconPremiumStar } from "@icons/index.js";
import { ToggleSwitch } from "@components";
import { useSelector } from "react-redux";
import { useTypeDevice } from "@hooks";
import { useState } from "react";

/**
 * Компонент переключателя массовых заказов
 * @returns {JSX.Element}
 * @constructor
 */
export const ServicesMassOrderToggle = () => {
    const [openModalPremium, setOpenModalPremium] = useState(false);
    const has_premium_subscription = useSelector((state) => state.profileSettings.has_premium_subscription);
    const { control } = useFormContext();
    const { isMobile } = useTypeDevice();

    return (
        <>
            <AsidePremiumModal setOpenModal={setOpenModalPremium} openModal={openModalPremium} />

            {has_premium_subscription ? (
                <div className="flex gap-3 items-center">
                    <Controller
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <ToggleSwitch onChange={onChange} checked={value} onBlur={onBlur} inputRef={ref} />
                        )}
                        control={control}
                        name="massOrder"
                    />

                    <p className="text-[16px] font-pn-semibold text-gray-600">Массовое продвижение</p>
                </div>
            ) : (
                <div className="flex flex-row relative items-center gap-2">
                    <div className="absolute w-[252px] h-full cursor-pointer z-10" onClick={() => setOpenModalPremium(true)}></div>
                    <div className="flex gap-3 items-center">
                        <Controller
                            render={({ field: { value } }) => <ToggleSwitch checked={value} onChange={null} disabled />}
                            control={control}
                            name="massOrder"
                        />

                        <p className="text-[16px] font-pn-semibold text-gray-200">Массовое продвижение</p>
                    </div>

                    <div onClick={() => setOpenModalPremium(true)} className="relative cursor-pointer">
                        <Tooltip
                            nodePopup={
                                <p>
                                    Функция доступна только
                                    <br /> с Premium подпиской
                                </p>
                            }
                            className="flex flex-row items-center gap-2"
                            direction={isMobile ? "left" : "top"}
                        >
                            <IconPremiumStar className="fill-[url(#purple_grad)]" />
                        </Tooltip>
                    </div>
                </div>
            )}
        </>
    );
};
