"use client";
import { utilServicesChangeStatusMassOrder } from "@utils";
import { useCreateOrderMutation } from "@features";
import { useSelector } from "react-redux";
import { Details } from "@components";

import { utilRefreshBalance } from "@apppages/profile/utils";
import "@apppages/profile/assets/styles/profileLayout.scss";
import { AsideProfile } from "@components/aside/components";

/**
 * Компонент layout раздела "Профиль"
 * @returns {JSX.Element}
 * @constructor
 */
const ProfileLayout = ({ children }) => {
  // Массовые заказы
  const massOrders = useSelector((state) => state.services.massOrders);
  const has_premium_subscription = useSelector(
    (state) => state.profileSettings.has_premium_subscription,
  );

  /**
   * Redux-хук для создания заказа
   */
  const [createOrder, createOrderQuery] = useCreateOrderMutation();

  utilRefreshBalance();

  utilServicesChangeStatusMassOrder(createOrder, createOrderQuery, massOrders);

  return (
    <section className="page profile">
      {!has_premium_subscription && <Details version={4} />}
      <div className="profile__wrapper">
        <aside className="aside max-sm:w-full sm:min-w-[278px] relative flex flex-nowrap flex-col gap-4">
          <AsideProfile />
        </aside>

        {children}
      </div>
    </section>
  );
};

export default ProfileLayout;
