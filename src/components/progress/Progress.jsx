import PropTypes from "prop-types";

import "./styles/progress.scss";

/**
 * Компонент progressbar
 * @returns {JSX.Element}
 * @constructor
 */
export const Progress = ({ children, ...props }) => {
    return <progress {...props}>{children}</progress>;
};

Progress.propTypes = {
    /**
     * Ребенок
     */
    children: PropTypes.node,
};
