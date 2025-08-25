import PropTypes from "prop-types";

import "./styles/button.scss";

/**
 * Компонент кнопки
 * @returns {JSX.Element}
 * @constructor
 */
export const Button = ({ disabled, children, variant, size, ...props }) => {
    /**
     * Set button size
     * @returns {string}
     */
    const buttonSize = `button--${size}`;

    /**
     * Set button variant
     * @returns {string}
     */
    const buttonVariant = `button--${variant}`;

    /**
     * Set button variant
     * @returns {string}
     */
    const buttonDisabled = disabled && "button--disabled";

    return (
        // eslint-disable-next-line react/prop-types
        <button {...props} className={`button ${buttonSize} ${buttonVariant} ${buttonDisabled} ${props.className}`} disabled={disabled}>
            {children}
        </button>
    );
};

Button.propTypes = {
    /**
     * Вариант кнопки
     */
    variant: PropTypes.oneOf(["primary", "secondary", "cancel", "transparent", "custom"]),

    /**
     * Размер кнопки
     */
    size: PropTypes.oneOf(["large", "normal", "medium", "small"]),

    /**
     * Состояние кнопки (активная / неактивная)
     */
    disabled: PropTypes.bool,

    /**
     * Ребенок
     */
    children: PropTypes.node,

    /**
     * Props
     */
    props: PropTypes.object,
};

Button.defaultProps = {
    variant: "primary",
    children: "Кнопка",
    disabled: false,
    size: "normal",
    className: "",
};
