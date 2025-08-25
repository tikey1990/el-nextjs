import { Button } from "flowbite-react";
import { useTypeDevice } from "@hooks";

import { DepositRefillPayments, DepositRefillSum } from "./";
import "./assets/styles/depositRefill.scss";
import { DepositPromo } from "../promo";

/**
 * Компонент пополнения баланса
 * @returns {JSX.Element}
 * @constructor
 */
export const DepositRefill = () => {
    const { isMobile } = useTypeDevice();

    return (
        <>
            <div className="deposit__content__wrapper refill-deposit">
                <h1 className="text text-color-black text-size-xl text-type-extrabold-it">Пополнить баланс</h1>

                <div className="refill-form">
                    {/* Сумма пополнения */}
                    <DepositRefillSum />

                    {/* Купон */}
                    {/* <DepositRefillCoupon />*/}

                    {/* Выбор платежной системы */}
                    <DepositRefillPayments />

                    <Button className="w-full sm:w-[200px] sm:ml-auto max-sm:!h-[56px]" color="primary" type="submit" size="sm">
                        Пополнить
                    </Button>
                </div>
            </div>

            {isMobile && (
                <div className="deposit__content__wrapper refill-deposit">
                    {/* Промокод */}
                    <DepositPromo />
                </div>
            )}
        </>
    );
};
