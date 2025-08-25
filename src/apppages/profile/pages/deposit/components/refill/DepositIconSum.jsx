// Imports
import PropTypes from "prop-types";

/**
 * Иконка суммы пополнения
 * @returns {JSX.Element}
 * @constructor
 */
export const DepositIconSum = ({ discount, setModal }) => (
    <div
        className="flex h-[44px] w-[70px] items-center justify-center rounded-[10px] bg-primary-400 text-[16px] font-pn-bold text-white"
        onClick={() => setModal(true)}
    >
        +{discount.value}%
    </div>
);

DepositIconSum.propTypes = {
    discount: PropTypes.object.isRequired,
    setModal: PropTypes.func.isRequired,
};
