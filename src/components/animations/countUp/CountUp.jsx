import ReactCountUp from "react-countup";
import PropTypes from "prop-types";
import { memo } from "react";

/**
 * Компонент с анимацией счётчика.
 * @type {React.NamedExoticComponent<{readonly value?: *}>}
 */
export const CountUp = memo(function CountUp({ value, ...props }) {
    return <ReactCountUp formattingFn={(value) => value} duration={1} decimals={2} end={value} {...props} />;
});

CountUp.propTypes = {
    value: PropTypes.number.isRequired,
    props: PropTypes.object,
};
