import PropTypes from "prop-types";
// eslint-disable-next-line perfectionist/sort-imports
import { Modal } from "@components";

/**
 * Компонент модального окна для документов
 * @returns {JSX.Element}
 * @constructor
 */
export const ModalBanner = ({ setOpenModal, openModal, title, text }) => {
    return (
        <Modal
            className="max-w-[600px] max-sm:max-h-[calc(100vh-2rem)] max-sm:w-[90%] max-sm:overflow-y-scroll max-sm:scrollbar-hidden max-sm:scroll-m-10 sm:-translate-y-[70px]"
            setOpenModal={setOpenModal}
            openModal={openModal}
        >
            <p className="mb-8 text-center text-2xl font-pn-bold text-gray-600">{title}</p>

            <p className="mb-8 text-center text-lg font-pn-regular text-gray-600">{text}</p>
        </Modal>
    );
};

ModalBanner.propTypes = {
    /**
     * Функция для открытия модального окна
     */
    setOpenModal: PropTypes.func.isRequired,

    /**
     * Состояние модального окна
     */
    openModal: PropTypes.bool.isRequired,

    /**
     * Заголовок
     */
    title: PropTypes.any,

    /**
     * Текст
     */
    text: PropTypes.any,
};
