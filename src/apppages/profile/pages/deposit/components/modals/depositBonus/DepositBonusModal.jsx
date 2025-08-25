import { Modal } from "@components";
import PropTypes from "prop-types";

import "./styles/depositBonusModal.scss";

/**
 * Модальное окна о системе бонусов
 * @returns {JSX.Element}
 * @constructor
 */
export const DepositBonusModal = ({ setOpenModal, openModal, discount }) => {
    return (
        <Modal
            className="bonus-modal w-[560px] max-sm:max-h-[calc(100vh-2rem)] max-sm:w-[90%] max-sm:overflow-y-scroll max-sm:scrollbar-hidden max-sm:scroll-m-10 sm:-translate-y-[70px]"
            setOpenModal={setOpenModal}
            openModal={openModal}
        >
            <h2 className="text-center font-pn-extraboldit text-2xl text-gray-600 mb-6 sm:mb-10">Система бонусов</h2>

            <div className="wrapper">
                <div className="wrapper__row percentage">
                    <div className="wrapper__row__item">
                        <p className="text text-color-white text-type-semibold text-size-sm">3%</p>
                    </div>
                    <div className="wrapper__row__item">
                        <p className="text text-color-white text-type-semibold text-size-sm">5%</p>
                    </div>
                    <div className="wrapper__row__item">
                        <p className="text text-color-white text-type-semibold text-size-sm">10%</p>
                    </div>
                    <div className="wrapper__row__item">
                        <p className="text text-color-white text-type-semibold text-size-sm">15%</p>
                    </div>
                    <div className="wrapper__row__item">
                        <p className="text text-color-white text-type-semibold text-size-sm">20%</p>
                    </div>
                </div>

                <div className="wrapper__row progress">
                    <div className={`progress-dot ${discount.value >= 3 && "active"}`}></div>
                    <div className={`progress-line ${discount.value >= 5 && "active"}`}></div>
                    <div className={`progress-dot ${discount.value >= 5 && "active"}`}></div>
                    <div className={`progress-line ${discount.value >= 10 && "active"}`}></div>
                    <div className={`progress-dot ${discount.value >= 10 && "active"}`}></div>
                    <div className={`progress-line ${discount.value >= 15 && "active"}`}></div>
                    <div className={`progress-dot ${discount.value >= 15 && "active"}`}></div>
                    <div className={`progress-line ${discount.value >= 20 && "active"}`}></div>
                    <div className={`progress-dot ${discount.value >= 20 && "active"}`}></div>
                </div>

                <div className="wrapper__row sum">
                    <div className="wrapper__row__item">
                        <p className="text text-color-black text-size-sm">{"> 5 000 р."}</p>
                    </div>
                    <div className="wrapper__row__item">
                        <p className="text text-color-black text-size-sm">{"> 10 000 р."}</p>
                    </div>
                    <div className="wrapper__row__item">
                        <p className="text text-color-black text-size-sm">{"> 30 000 р."}</p>
                    </div>
                    <div className="wrapper__row__item">
                        <p className="text text-color-black text-size-sm">{"> 100 000 р."}</p>
                    </div>
                    <div className="wrapper__row__item">
                        <p className="text text-color-black text-size-sm">{"> 200 000 р."}</p>
                    </div>
                </div>
            </div>

            <p className="mt-6 sm:mt-10 font-pn-regular text-[16px] text-gray-600">
                Если у платежной системы есть ограничения на одну транзакцию, то пополняйте частями в течение часа и напишите нам в
                техническую поддержку. Вам выдадут оставшийся бонус.
            </p>
        </Modal>
    );
};

DepositBonusModal.propTypes = {
    /**
     * Close handle
     */
    setOpenModal: PropTypes.func,

    /**
     * State discount
     */
    discount: PropTypes.object,

    /**
     * State модального окна
     */
    openModal: PropTypes.bool,
};
