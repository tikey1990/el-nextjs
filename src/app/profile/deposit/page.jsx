"use client";
import { useCreatePaymentMutation } from "@features/profile/features/deposit/index.js";
import {
  useYupValidationResolver,
  useBrowserChecker,
  useTypeDevice,
} from "@hooks";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RHFProvider } from "@providers";
import { useEffect } from "react";

import {
  DepositRefill,
  DepositTable,
  DepositPromo,
} from "@apppages/profile/pages/deposit/components";
import { validationSchemeDeposit } from "@apppages/profile/pages/deposit/utils";
import "@apppages/profile/pages/deposit/assets/styles/deposit.scss";

/**
 * Компонент страницы пополнения баланса
 * @returns {JSX.Element}
 * @constructor
 */
const Deposit = () => {
  const [createPayment, { data }] = useCreatePaymentMutation();
  const { isMobile } = useTypeDevice();
  const resolver = useYupValidationResolver(validationSchemeDeposit);
  const methods = useForm({ mode: "onChange", resolver });
  const { handleSubmit } = methods;
  const payment_system = useSelector(
    (state) => state.profileDeposit.payment_system,
  );
  const { isFirefox, isSafari } = useBrowserChecker();

  const onSubmit = (data) => {
    createPayment({ payment_system: payment_system, sum: data.sum });
  };

  useEffect(() => {
    if (data) {
      if (isSafari || isFirefox)
        window.location.href = data.data["redirect_to"];
      else window.open(data.data["redirect_to"], "_blank");
    }
  }, [data]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <RHFProvider
      onSubmit={handleSubmit(onSubmit)}
      className="deposit__content"
      onKeyPress={handleKeyDown}
      methods={methods}
    >
      {/* Пополнение баланса */}
      <DepositRefill />

      {/* Промокод */}
      {!isMobile && <DepositPromo />}

      {/* Таблица пополнений */}
      <DepositTable />
    </RHFProvider>
  );
};

export default Deposit;
