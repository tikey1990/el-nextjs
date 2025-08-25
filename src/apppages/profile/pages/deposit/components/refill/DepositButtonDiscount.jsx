import { HiQuestionMarkCircle } from "react-icons/hi";
import { utilFormatNumberWithSpaces } from "@utils";
import { Progress } from "flowbite-react";
import PropTypes from "prop-types";

/**
 * Компонент скидки на пополнение
 * @returns {JSX.Element}
 * @constructor
 */
export const DepositButtonDiscount = ({ discountProgress, setModal, discount }) => {
    return (
        <div
            className="flex h-[62px] cursor-pointer flex-col gap-2 rounded-lg bg-transparent px-3 py-2 ring-1 ring-[#E8EBF1]"
            onClick={() => setModal(true)}
        >
            <div className="flex flex-row justify-between items-center gap-3">
                <p className="whitespace-nowrap text-[15px] text-gray-600 font-pn-semiboldit">
                    {discount.value === 20 ? (
                        <span className="text-gray-600">Максимальный уровень скидки!</span>
                    ) : (
                        <>
                            Еще {utilFormatNumberWithSpaces(discount.valueNext)} до{" "}
                            <span className="text-primary-500">+{discount.valuePercent}%</span>
                        </>
                    )}
                </p>

                <HiQuestionMarkCircle className="fill-gray-400 text-lg" />
            </div>

            {/* Прогресс бар скидки */}
            <div>
                <Progress progress={discountProgress} color="green" size="md" />
            </div>
        </div>
    );
};

DepositButtonDiscount.propTypes = {
    discountProgress: PropTypes.number.isRequired,
    discount: PropTypes.object.isRequired,
    setModal: PropTypes.func.isRequired,
};
