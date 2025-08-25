import { setSelectedPayment } from "@features/profile/features/deposit/index.js";
import { useDispatch, useSelector } from "react-redux";
import { customThemeTooltip2 } from "@theme";
import { Input, Label } from "@components";
import { Tooltip } from "flowbite-react";

import "./assets/styles/depositRefillPayments.scss";
import { dataRefillPayments } from "./utils";

/**
 * Компонент выбора платежной системы
 * @returns {JSX.Element}
 * @constructor
 */
export const DepositRefillPayments = () => {
    const dispatch = useDispatch();
    const payment_system = useSelector((state) => state.profileDeposit.payment_system);

    const handleClickPayment = (name) => {
        dispatch(setSelectedPayment(name));
    };

    /**
     * Функция-рендер платежный систем
     */
    const renderPayments = () =>
        dataRefillPayments.map((elem, index) => {
            if (index === 0 && !payment_system) dispatch(setSelectedPayment(elem.name));

            return (
                <Label className={`payments__wrapper__item ${elem.name}`} onClick={() => handleClickPayment(elem.name)} key={index}>
                    {elem?.name === "robokassa" ? (
                        <Tooltip
                            content="Запрещенные страны Visa/MasterCard - Куба, Иран, Ирак, Азербайджан, Судан, Сирия, Венесуэла, Мьянма, Корея, Западная Сахара, Никарагуа, Афганистан, Йемен, Мали, Зимбабве, Судан, Украина, США, Турция, Канада, Беларусь, Корейская НДР"
                            theme={customThemeTooltip2}
                            style="light"
                        >
                            <Input checked={elem.name === payment_system} hasValidation={false} name={elem.name} type="radio" />
                            <div className="payments__elem">
                                {elem.icon}
                                <p className="text-gray-600 text-[15px] sm:text-lg font-pn-regular">{elem.text}</p>
                            </div>
                        </Tooltip>
                    ) : (
                        <>
                            <Input checked={elem.name === payment_system} hasValidation={false} name={elem.name} type="radio" />
                            <div className="payments__elem">
                                {elem.icon}
                                <p className="text-gray-600 text-[15px] sm:text-lg font-pn-regular">{elem.text}</p>
                            </div>
                        </>
                    )}
                </Label>
            );
        });

    return (
        <div className="refill-form__wrapper payments sm:mt-10">
            <Label className="label-column label-left">
                <p>Выбор платежной системы</p>
            </Label>

            <div className="payments__wrapper">{renderPayments()}</div>
        </div>
    );
};
