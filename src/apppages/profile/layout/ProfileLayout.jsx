import { utilServicesChangeStatusMassOrder, lazyReactNaiveRetry } from "@utils";
import { useCreateOrderMutation } from "@features";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Details } from "@components";

import { utilRefreshBalance } from "../utils";
import "../assets/styles/profileLayout.scss";

const Aside = lazyReactNaiveRetry(() => import("@components/aside/Aside"));

/**
 * Компонент layout раздела "Профиль"
 * @returns {JSX.Element}
 * @constructor
 */
const ProfileLayout = () => {
    // Массовые заказы
    const massOrders = useSelector((state) => state.services.massOrders);
    const has_premium_subscription = useSelector((state) => state.profileSettings.has_premium_subscription);

    /**
     * Redux-хук для создания заказа
     */
    const [createOrder, createOrderQuery] = useCreateOrderMutation();

    utilRefreshBalance();

    utilServicesChangeStatusMassOrder(createOrder, createOrderQuery, massOrders);

    return (
        <>
            {!has_premium_subscription && <Details version={4} />}

            <div className="profile__wrapper">
                <Aside />

                <Outlet />
            </div>
        </>
    );
};

export default ProfileLayout;
