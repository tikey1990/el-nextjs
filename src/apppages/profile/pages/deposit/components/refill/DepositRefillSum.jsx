import { useDepositDiscount } from "@apppages/profile/pages/deposit/components/refill/hooks/index.js";
import { utilColorInputValid, utilHelperText } from "@utils";
import { useCreatePaymentMutation } from "@features";
import React, { useEffect, useState } from "react";
import { TextInput, Label } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

import {
  DepositButtonDiscount,
  DepositBonusModal,
  DepositIconSum,
} from "../../components";
import "./assets/styles/depositRefillSum.scss";

/**
 * Компонент суммы пополнения
 * @returns {JSX.Element}
 * @constructor
 */
export const DepositRefillSum = () => {
  /**
   * Форма
   */
  const methods = useFormContext();
  const {
    formState: { dirtyFields, errors },
    getValues,
    register,
  } = methods;
  const [openModal, setOpenModal] = useState(false);
  const payment_system = useSelector(
    (state) => state.profileDeposit.payment_system,
  );

  const { discountProgress, discount } = useDepositDiscount();

  const [createPayment, { data }] = useCreatePaymentMutation();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      createPayment({ payment_system: payment_system, sum: getValues("sum") });
    }
  };

  useEffect(() => {
    if (data) window.open(data.data["redirect_to"], "_blank");
  }, [data]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <DepositBonusModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        discount={discount}
      />

      <div className="w-full">
        <div className="mb-5">
          <Label
            className="text-[16px] sm:text-[20px] font-pn-boldit text-gray-600"
            value="Сумма пополнения"
            htmlFor="sum"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col w-full sm:w-[297px]">
            {/* Сумма пополнения */}
            <TextInput
              rightIcon={() => (
                <DepositIconSum setModal={setOpenModal} discount={discount} />
              )}
              color={utilColorInputValid("sum", errors, dirtyFields)}
              helpertext={utilHelperText("sum", errors)}
              placeholder="Введите сумму"
              onKeyPress={handleKeyDown}
              type="number"
              sizing="lg"
              name="sum"
              id="sum"
              {...register("sum")}
            />
          </div>

          {/* Скидка на пополнение */}
          <DepositButtonDiscount
            discountProgress={discountProgress}
            setModal={setOpenModal}
            discount={discount}
          />
        </div>
      </div>
    </div>
  );
};
