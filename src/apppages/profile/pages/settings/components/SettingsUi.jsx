import {
    useChangeAutoRenewalPremiumSubscriptionStatusMutation,
    toggleHasPremiumSubscriptionActive,
    setAutoRenewalPremiumSubscription,
    setStars,
} from "@features";
import { useDispatch, useSelector } from "react-redux";
import { VAR_HAS_PREMIUM_VISUAL_MODE } from "@vars";
import { ToggleSwitch } from "@components";
import { useForm } from "react-hook-form";
import { RHFProvider } from "@providers";
import classnames from "classnames";

import "../assets/styles/settingsUi.scss";

/**
 * Компонент настройки ui
 * @returns {JSX.Element}
 * @constructor
 */
export const SettingsUi = () => {
    const dispatch = useDispatch();
    const methods = useForm();
    const statusStars = useSelector((state) => state.profileSettings.stars.status);
    const fpsStars = useSelector((state) => state.profileSettings.stars.fps);
    const hasPremiumSubscription = useSelector((state) => state.profileSettings.has_premium_subscription);
    const has_premium_subscription_active = useSelector((state) => state.profileSettings.has_premium_subscription_active);
    const auto_renewal_premium_subscription = useSelector((state) => state.profileSettings.auto_renewal_premium_subscription);
    const isCheckedVisualMode = VAR_HAS_PREMIUM_VISUAL_MODE();

    const [changeAutoRenewalPremiumSubscriptionStatus] = useChangeAutoRenewalPremiumSubscriptionStatusMutation();

    const handleToggleStars = () => {
        dispatch(setStars({ status: !statusStars, fps: fpsStars }));
    };

    const handleTogglePremiumDesign = () => {
        dispatch(toggleHasPremiumSubscriptionActive());

        if (has_premium_subscription_active) dispatch(setStars({ fps: fpsStars, status: true }));
    };

    const handleToggleAutoRenewalPremiumSubscription = () => {
        changeAutoRenewalPremiumSubscriptionStatus({ status: Number(!auto_renewal_premium_subscription) });
        dispatch(setAutoRenewalPremiumSubscription(!auto_renewal_premium_subscription));
    };

    const classWrapper = classnames(
        "bg-white z-10 px-5 sm:h-[140px] h-[100px] py-6 xl:max-w-[365px] sm:max-w-[310px] xl:min-w-[365px] sm:min-w-[310px] rounded-2xl sm:p-10",
        { "sm:h-[215px] h-[180px]": hasPremiumSubscription }
    );

    return (
        <div className={classWrapper}>
            <RHFProvider methods={methods}>
                <div className="flex flex-row mt-3 items-center gap-3">
                    <div className="h-[30px]">
                        <ToggleSwitch onChange={handleToggleStars} checked={statusStars} />
                    </div>

                    <p className="text-left text-gray-600 whitespace-nowrap font-pn-semibold text-[16px]">
                        Звезды {statusStars ? "включены" : "выключены"}
                    </p>
                </div>

                {hasPremiumSubscription && (
                    <>
                        <div className="flex flex-row mt-3 items-center gap-3">
                            <div className="h-[30px]">
                                <ToggleSwitch onChange={handleTogglePremiumDesign} checked={isCheckedVisualMode} />
                            </div>

                            <p className="text-left text-gray-600 whitespace-nowrap font-pn-semibold text-[16px]">
                                Premium дизайн {has_premium_subscription_active ? "включен" : "выключен"}
                            </p>
                        </div>

                        <div className="flex flex-row mt-3 items-center gap-3">
                            <div className="h-[30px]">
                                <ToggleSwitch
                                    onChange={handleToggleAutoRenewalPremiumSubscription}
                                    checked={auto_renewal_premium_subscription}
                                />
                            </div>

                            <p className="text-left text-gray-600 whitespace-nowrap font-pn-semibold text-[16px]">
                                Автопродление {auto_renewal_premium_subscription ? "включено" : "выключено"}
                            </p>
                        </div>
                    </>
                )}
            </RHFProvider>
        </div>
    );
};
