import { utilFormatDateWithZero } from "@utils";
import { useSelector } from "react-redux";
import moment from "moment";

export const AsidePremiumModalActive = () => {
    const has_premium_subscription = useSelector((state) => state.profileSettings.has_premium_subscription);
    const premium_subscription_end_date = useSelector((state) => state.profileSettings.premium_subscription_end_date);
    const latest_premium_subscription_end_date = useSelector((state) => state.profileSettings.latest_premium_subscription_end_date);

    const isActualSubscription = () => {
        if (!premium_subscription_end_date) return false;
        const endDate = moment(premium_subscription_end_date);
        return endDate.isBefore(moment());
    };

    return (
        <>
            {has_premium_subscription && (
                <div className="flex flex-col gap-2 items-center mt-[200px] sm:mt-[243px] mb-8">
                    <p className="text-[20px] font-pn-boldit text-primary-500">Подписка активна</p>

                    {!isActualSubscription() ? (
                        <p className="text-[15px] font-pn-regular text-gray-600">
                            Дата следующего платежа: {utilFormatDateWithZero(premium_subscription_end_date)}
                        </p>
                    ) : (
                        <p className="text-[15px] font-pn-regular text-gray-600">
                            Дата окончания подписки: {utilFormatDateWithZero(latest_premium_subscription_end_date)}
                        </p>
                    )}
                </div>
            )}
        </>
    );
};
