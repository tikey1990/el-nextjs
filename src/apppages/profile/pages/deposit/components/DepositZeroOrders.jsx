import { IconZeroPremium, IconEmpty } from "@icons";
import PropTypes from "prop-types";

/**
 * Компонент пустых шаблонов на аккаунте
 * @returns {JSX.Element}
 * @param {number} state - Страница
 * @param {string} text - Текст компонента
 * @constructor
 */
export const DepositZeroOrders = ({ state, text }) => {
    return (
        <div className="w-full flex flex-col z-[50] gap-6 sm:gap-10 items-center bg-white rounded-2xl justify-center py-16">
            {state === 1 ? <IconZeroPremium /> : <IconEmpty />}

            <p className="text-xl sm:text-2xl text-center font-pn-boldit max-sm:text-center text-gray-600">{text}</p>
        </div>
    );
};

DepositZeroOrders.propTypes = {
    /**
     * Страница
     */
    state: PropTypes.number.isRequired,

    /**
     * Текст компонента
     */
    text: PropTypes.string,
};

DepositZeroOrders.defaultProps = {
    text: "История пополнений еще пуста :(",
    state: 1,
};
