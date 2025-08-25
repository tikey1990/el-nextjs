import { IconInst, IconTg, IconVk } from "@icons/social";
import { VAR_SOCIAL_LINKS } from "@vars";
import { Modal } from "@components";
import PropTypes from "prop-types";

/**
 * Компонент модального окна для промокода
 * @param {function} setOpenModal - Функция для открытия модального окна
 * @param {boolean} openModal - Состояние модального окна
 * @returns {JSX.Element}
 * @constructor
 */
export const ModalPromo = ({ setOpenModal, openModal }) => {
    return (
        <Modal className="max-w-[500px] sm:-translate-y-[110px]" setOpenModal={setOpenModal} openModal={openModal}>
            <h2 className="mb-6 text-center sm:mb-10 text-2xl text-gray-600 font-pn-extraboldit">
                Где взять
                <br className="xs:hidden" /> промокод
            </h2>

            <p className="text-gray-600 font-pn-regular text-sm sm:text-base mb-6 sm:mb-10">
                Каждый день в 20:00 мы случайным образом раздаём промокоды среди всех пользователей, которые связали аккаунт сайта с нашим
                Telegram ботом <br />
                <a href={VAR_SOCIAL_LINKS.tgBot} className="text-primary-500" aria-label="telegram bot" rel="noreferrer" target="_blank">
                    @EasyLikerBot
                </a>
            </p>

            <div className="flex w-full flex-col sm:flex-row sm:justify-between max-sm:items-center max-sm:gap-5">
                <p className="text-gray-600 max-sm:text-center font-pn-boldit text-[20px] leading-[1.3]">
                    Раздача промокодов
                    <br /> в наших соцсетях
                </p>

                <div className="flex flex-row gap-3 items-center flex-nowrap">
                    <a
                        className="bg-gradient-telegram flex justify-center items-center w-[44px] h-[44px] rounded-xl"
                        href={VAR_SOCIAL_LINKS.tgInfo}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <IconTg className="w-[30px]" />
                    </a>
                    <a
                        className="bg-[#2787F5] flex justify-center items-center w-[44px] h-[44px] rounded-xl"
                        href={VAR_SOCIAL_LINKS.vk}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <IconVk className="w-[40px]" />
                    </a>
                    <a
                        className="bg-gradient-inst flex justify-center items-center w-[44px] h-[44px] rounded-xl"
                        href={VAR_SOCIAL_LINKS.inst}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <IconInst className="w-[35px]" />
                    </a>
                </div>
            </div>
        </Modal>
    );
};

ModalPromo.propTypes = {
    /**
     * Функция для открытия модального окна
     */
    setOpenModal: PropTypes.func.isRequired,

    /**
     * Состояние модального окна
     */
    openModal: PropTypes.bool.isRequired,
};
