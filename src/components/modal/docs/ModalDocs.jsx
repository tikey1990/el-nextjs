import { Modal } from "@components";
import PropTypes from "prop-types";
import Link from "next/link";

/**
 * Компонент модального окна для документов
 * @returns {JSX.Element}
 * @constructor
 */
export const ModalDocs = ({ setOpenModal, openModal }) => {
  return (
    <Modal setOpenModal={setOpenModal} openModal={openModal}>
      <p className="font-md-moz-fix mb-8 text-center text-xl font-medium">
        Документы
      </p>

      <div className="flex flex-col gap-3">
        <Link
          className="font-md-moz-fix text-sm font-medium"
          target="_blank"
          href="/docs/offer.pdf"
        >
          Публичная оферта
        </Link>
        <Link
          className="font-md-moz-fix text-sm font-medium"
          target="_blank"
          href="/docs/agreement.pdf"
        >
          Пользовательское соглашение
        </Link>
        <Link
          className="font-md-moz-fix text-sm font-medium"
          target="_blank"
          href="/docs/privacy.pdf"
        >
          Политика конфиденциальности
        </Link>
      </div>
    </Modal>
  );
};

ModalDocs.propTypes = {
  /**
   * Функция для открытия модального окна
   */
  setOpenModal: PropTypes.func.isRequired,

  /**
   * Состояние модального окна
   */
  openModal: PropTypes.bool.isRequired,
};
