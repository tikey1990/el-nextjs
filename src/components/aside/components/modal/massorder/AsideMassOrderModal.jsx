import { Modal } from "@components";
import PropTypes from "prop-types";

import { AsideMassOrderModalOrders, AsideMassOrderModalInfo, AsideMassOrderModalCopy, AsideMassOrderModalBal } from "../index.js";
import { IconModalMassOrderMobile, IconModalMassOrder } from "../../../assets/icons/index.js";

/**
 * Модальное окно с массовыми заказами
 * @param setOpenModal
 * @param openModal
 * @param order
 * @returns {JSX.Element}
 * @constructor
 */
export const AsideMassOrderModal = ({ setOpenModal, openModal, order }) => {
    const { data: orderData } = order;

    return (
        <Modal
            elemClose={
                <p
                    className="absolute hover:text-primary-500 right-10 top-[26px] sm:top-10 cursor-pointer text-gray-500 text-xs font-pn-semibold underline underline-offset-[1px]"
                    onClick={() => setOpenModal(false)}
                >
                    Свернуть окно
                </p>
            }
            className="w-[790px] 2xl:-translate-y-[100px] sm:-translate-y-[10px] max-sm:max-h-[calc(100vh-2rem)] max-sm:overflow-y-scroll max-sm:scrollbar-hidden max-sm:scroll-m-10]"
            setOpenModal={setOpenModal}
            openModal={openModal}
        >
            <p className="text-gray-500 font-pn-regular absolute top-6 sm:top-10 text-sm">
                Не закрывайте сайт
                <br className="sm:hidden" /> до завершения создания заказов
            </p>

            <IconModalMassOrder className="-ml-4 mt-6 w-[calc(100%+16px)] hidden sm:block" />
            <IconModalMassOrderMobile className="-ml-2 mt-8 w-[calc(100%+15px)] block sm:hidden" />

            {/* Ссылки */}
            <AsideMassOrderModalCopy order={order} />

            {/* Баланс */}
            <AsideMassOrderModalBal order={order} />

            {/* Информация */}
            <AsideMassOrderModalInfo order={order} />

            {/* Список заказов */}
            <AsideMassOrderModalOrders orders={orderData} order={order} />
        </Modal>
    );
};

AsideMassOrderModal.propTypes = {
    /**
     * State modal set
     */
    setOpenModal: PropTypes.func,

    /**
     * State modal
     */
    openModal: PropTypes.bool,

    /**
     * Order
     */
    order: PropTypes.object,
};
