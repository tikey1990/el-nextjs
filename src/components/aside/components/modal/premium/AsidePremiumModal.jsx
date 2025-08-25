"use client";
import {
  usePurchasePremiumSubscriptionMutation,
  toggleHasPremiumSubscriptionActive,
  useGetMySettingDataMutation,
  useGetBalanceMutation,
  setCofetti,
  setStars,
} from "@features";
import { useDispatch, useSelector } from "react-redux";
import { useBrowserChecker, useAuth } from "@hooks";
import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import { HiX } from "react-icons/hi";
import classnames from "classnames";
import { Modal } from "@components";
import PropTypes from "prop-types";
import { IconRuble } from "@icons";

import {
  AsidePremiumModalActive,
  AsidePremiumModalPromo,
  AsidePremiumModalPlan,
} from "./components";
import { renderPremiumModalAdv } from "./utils";
import "./assets/styles/asidePremiumModal.css";
import { plans } from "./config";

/**
 * Модальное окно с массовыми заказами
 * @param setOpenModal
 * @param openModal
 * @param order
 * @returns {JSX.Element}
 * @constructor
 */
const AsidePremiumModal = ({ setOpenModal, openModal }) => {
  const { isAuth } = useAuth();
  const dispatch = useDispatch();
  const [openModalPromo, setOpenModalPromo] = useState(false);
  const [plan, setPlan] = useState(plans[0]);
  const has_premium_subscription = useSelector(
    (state) => state.profileSettings.has_premium_subscription,
  );
  const fpsStars = useSelector((state) => state.profileSettings.stars.fps);
  const { isSafari } = useBrowserChecker();

  /**
   * Данные подписки
   */
  const [purchasePremiumSubscription, purchasePremiumSubscriptionQuery] =
    usePurchasePremiumSubscriptionMutation();
  const { isLoading, isSuccess } = purchasePremiumSubscriptionQuery;

  /**
   * Данные настроек
   */
  const [getMySettingData] = useGetMySettingDataMutation();

  /**
   * Получаем баланс пользователя
   */
  const [getBalance] = useGetBalanceMutation();

  /**
   * Оформление подписки
   */
  const handleClickSubscription = () => {
    if (!isAuth) toast.warning("Сначала необходимо авторизоваться");
    else {
      purchasePremiumSubscription({ duration: plan.durationCount * 30 });
      dispatch(setStars({ fps: fpsStars, status: false }));
    }
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setOpenModal(false);
      dispatch(setCofetti(true));
      localStorage.setItem("has_premium_subscription_active", "true");
      dispatch(toggleHasPremiumSubscriptionActive({ force: true }));
      getMySettingData();
      getBalance();
    }
  }, [purchasePremiumSubscriptionQuery]);

  return (
    <>
      <AsidePremiumModalPromo
        setOpenModal={setOpenModalPromo}
        openModal={openModalPromo}
      />

      <Modal
        className={classnames(
          "w-[600px] max-sm:max-h-[calc(100vh-2rem)] max-sm:overflow-y-scroll max-sm:overscroll-none max-sm:scrollbar-hidden max-sm:scroll-m-10 sm:mt-[45vh] 2xl:mt-[13vh]",
          { "max-sm:max-h-[calc(85vh)]": isSafari },
        )}
        elemClose={
          <HiX
            className="absolute hover:scale-110 w-5 h-5 right-5 top-5 z-10 cursor-pointer fill-white opacity-50"
            onClick={() => setOpenModal(false)}
          />
        }
        setOpenModal={setOpenModal}
        openModal={openModal}
      >
        <div className="w-full absolute h-[200px] sm:h-[243px] flex justify-center items-center bg-premium-modal -translate-y-[2.1rem] -translate-x-[1.5rem] sm:-translate-y-[2.6rem] sm:-translate-x-[2.5rem] rounded-t-2xl">
          <p
            className="font-pn-extraboldit text-[40px] text-white text-center"
            style={{ textShadow: "0px 2px 13px rgba(255, 255, 255, 0.32)" }}
          >
            Easyliker Premium
          </p>
        </div>

        <AsidePremiumModalActive />

        <div
          className={`flex flex-row gap-3 flex-wrap justify-center ${!has_premium_subscription && "mt-[200px] sm:mt-[243px]"}`}
        >
          {renderPremiumModalAdv()}
        </div>

        <AsidePremiumModalPlan setPlan={setPlan} plans={plans} plan={plan} />

        <div className="w-full flex flex-col items-center justify-center gap-5">
          <Button
            onClick={handleClickSubscription}
            className="mt-6"
            color="primary"
            size="sm"
          >
            <p className="flex flex-row items-center gap-0.5">
              Активировать за {plan?.price}{" "}
              <IconRuble className="fill-white w-[11px] h-[11px] -translate-y-[1px]" />
            </p>
          </Button>

          <p
            onClick={() => {
              setOpenModal(false);
              setOpenModalPromo(true);
            }}
            className="text-primary-500 cursor-pointer text-[16px] font-pn-regular"
          >
            У меня есть промокод
          </p>
        </div>
      </Modal>
    </>
  );
};

AsidePremiumModal.propTypes = {
  /**
   * State modal set
   */
  setOpenModal: PropTypes.func,

  /**
   * State modal
   */
  openModal: PropTypes.bool,
};

export default AsidePremiumModal;
