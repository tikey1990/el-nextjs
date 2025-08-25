import { useDeleteTemplateMutation } from "@features";
import { Button } from "flowbite-react";
import { Modal } from "@components";
import PropTypes from "prop-types";

/**
 * Компонент модального окна для подтверждения удаления шаблона
 * @param {function} setOpenModal - Функция для открытия модального окна
 * @param {boolean} openModal - Состояние модального окна
 * @param {number} id - id шаблона
 * @returns {JSX.Element}
 * @constructor
 */
export const TemplatesTableDeleteConfirmModal = ({ setOpenModal, openModal, id }) => {
    const [deleteTemplate] = useDeleteTemplateMutation();

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleDeleteTemplate = () => {
        deleteTemplate({ id });
        setOpenModal(false);
    };

    return (
        <Modal
            className="max-w-[500px] max-sm:max-h-[calc(100vh-2rem)] max-sm:w-[90%] max-sm:overflow-y-scroll max-sm:scrollbar-hidden max-sm:scroll-m-10 sm:-translate-y-[70px]"
            setOpenModal={setOpenModal}
            openModal={openModal}
        >
            <h2 className="mb-6 text-center sm:mb-10 text-2xl text-gray-600 font-pn-extraboldit">Вы точно хотите удалить шаблон?</h2>

            <div className="flex justify-center gap-4">
                <Button className="w-[100px] sm:w-[150px]" onClick={handleDeleteTemplate} color="primary" size="sm">
                    Да
                </Button>
                <Button className="w-[100px] sm:w-[150px]" onClick={handleCloseModal} color="red" size="sm">
                    Отмена
                </Button>
            </div>
        </Modal>
    );
};

TemplatesTableDeleteConfirmModal.propTypes = {
    /**
     * Функция для открытия модального окна
     */
    setOpenModal: PropTypes.func.isRequired,

    /**
     * Состояние модального окна
     */
    openModal: PropTypes.bool.isRequired,

    /**
     * id шаблона
     */
    id: PropTypes.number.isRequired,
};
