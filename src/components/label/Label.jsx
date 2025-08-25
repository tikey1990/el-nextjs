import classNames from "classnames";
import PropTypes from "prop-types";

import "./styles/label.scss";

/**
 * Компонент label
 * @returns {JSX.Element}
 * @constructor
 */
export const Label = ({ direction, children, justify, align, ...props }) => {
    const labelClassName = classNames(
        `label-align-${align}`,
        `label-justify-${justify}`,
        `label-direction-${direction}`,
        // eslint-disable-next-line react/prop-types
        props.className
    );

    return (
        <label {...props} className={labelClassName}>
            {children}
        </label>
    );
};

Label.propTypes = {
    justify: PropTypes.oneOf(["start", "center", "end", "space-between"]),
    align: PropTypes.oneOf(["start", "center", "end", "space-between"]),
    direction: PropTypes.oneOf(["row", "column"]),
    children: PropTypes.node,
};

Label.defaultProps = {
    direction: "column",
    justify: "start",
    align: "start",
};
