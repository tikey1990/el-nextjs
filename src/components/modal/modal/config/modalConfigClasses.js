// Imports
import classNames from "classnames";

/**
 * Классы модального окна
 * @type {function(*): string}
 */
export const configModalClassModal = (props) =>
    classNames(
        "relative rounded-2xl max-sm:py-8 sm:mx-auto sm:mt-[230px] my-10 bg-white z-40 px-6 sm:p-10 transform shadow-xl transition-all",
        // eslint-disable-next-line react/prop-types
        props.className
    );
