import { Modal } from "@components";
import PropTypes from "prop-types";

/**
 * Модальное окно для шаблонов "Как это работает"
 * @param setOpenModal
 * @param openModal
 * @returns {JSX.Element}
 * @constructor
 */
export const TempaltesModal = ({ setOpenModal, openModal }) => {
    return (
        <Modal
            className="max-w-[500px] max-sm:max-h-[calc(100vh-2rem)] max-sm:w-[90%] max-sm:overflow-y-scroll max-sm:scrollbar-hidden max-sm:scroll-m-10 sm:-translate-y-[70px]"
            setOpenModal={setOpenModal}
            openModal={openModal}
        >
            <h2 className="mb-6 text-center sm:mb-10 text-2xl text-gray-600 font-pn-extraboldit">Как это работает?</h2>

            <p className="font-pn-regular text-[16px] text-gray-600">
                Шаблоны — это инновационная и удобная функция на нашем сайте, которая позволяет создавать и сохранять наборы необходимых
                услуг. Достаточно заполнить их всего один раз, после чего вы сможете заказывать весь набор услуг разом на необходимые ссылки
                в два клика. Это избавит вас от необходимости каждый раз заполнять услуги по отдельности, значительно упрощая и ускоряя
                процесс запуска.
            </p>
        </Modal>
    );
};

TempaltesModal.propTypes = {
    setOpenModal: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
};
