import { profileTemplatesApi, setCreateTemplate } from "@features";
import { useDispatch } from "react-redux";
import { Button } from "flowbite-react";
import { utilScrollTop } from "@utils";
import PropTypes from "prop-types";
import { useState } from "react";

import { TemplatesTableDeleteConfirmModal, TemplatesTableCreateOrderModal } from "./";
import { IconTemplatesDelete, IconTemplatesEdit } from "../../../icons";
import { utilHandleCreateOrder } from "../utils";

/**
 * Компонент кнопки "Заказать" в таблице шаблонов
 * @param createOrderQuery
 * @param elem
 * @returns {JSX.Element}
 * @constructor
 */
export const TemplatesTableButtonCreateOrder = ({ createOrderQuery, elem }) => {
    const [openModal, setOpenModal] = useState(false);

    /**
     * Отправка запроса на создание заказа по шаблону
     */
    const handleCreateOrder = () => {
        setOpenModal(true);
        utilHandleCreateOrder(elem);
    };

    return (
        <>
            <TemplatesTableCreateOrderModal
                createOrderQuery={createOrderQuery}
                setOpenModal={setOpenModal}
                openModal={openModal}
                elem={elem}
            />

            <Button
                className="[&>span]:py-3 [&>span]:px-4 [&>span]:font-pn-bold [&>span]:text-sm"
                onClick={handleCreateOrder}
                color="primary"
                size="custom"
            >
                Заказать
            </Button>
        </>
    );
};

/**
 * Компонент кнопки "Редактировать" в таблице шаблонов
 * @param elem
 * @returns {JSX.Element}
 * @constructor
 */
export const TemplatesTableButtonEditTemplate = ({ elem }) => {
    const dispatch = useDispatch();

    /**
     * Cлушатель клика по кнопке редактирования шаблона.
     */
    const handleEditOrder = () => {
        utilScrollTop();
        dispatch(setCreateTemplate({ type: "edit", ...elem }));
        // Повторно вызвать getTemplatesPage после успешного удаления
        dispatch(profileTemplatesApi.util.invalidateTags(["getWebsiteDetailedServices"]));
    };

    return (
        <Button
            className="[&>span]:w-[32px] rounded-xl focus:ring-0 [&>span]:max-sm:!bg-transparent max-sm:outline-none sm:outline sm:outline-primary-500 sm:outline-1 [&>span]:items-center [&>span]:h-[32px]"
            onClick={handleEditOrder}
            color="custom"
            size="custom"
            outline
        >
            <IconTemplatesEdit className="sm:fill-primary-500 fill-white max-sm:w-[16px] max-sm:h-[16px]" />
        </Button>
    );
};

/**
 * Компонент кнопки "Удалить" в таблице шаблонов
 * @param elem
 * @returns {JSX.Element}
 * @constructor
 */
export const TemplatesTableButtonDeleteTemplate = ({ elem }) => {
    const { id } = elem;
    const [openModal, setOpenModal] = useState(false);

    const handleDeleteOrder = () => {
        setOpenModal(true);
    };

    return (
        <>
            <TemplatesTableDeleteConfirmModal setOpenModal={setOpenModal} openModal={openModal} id={id} />

            <Button
                className="[&>span]:w-[32px] rounded-xl ring-1 ring-gray-500 focus:ring-1 focus:outline-none [&>span]:items-center [&>span]:h-[32px]"
                onClick={handleDeleteOrder}
                color="custom"
                size="custom"
                outline
            >
                <IconTemplatesDelete className="fill-gray-500" />
            </Button>
        </>
    );
};

TemplatesTableButtonCreateOrder.propTypes = {
    createOrderQuery: PropTypes.object,
    elem: PropTypes.object,
};

TemplatesTableButtonEditTemplate.propTypes = {
    elem: PropTypes.object,
};

TemplatesTableButtonDeleteTemplate.propTypes = {
    elem: PropTypes.object,
};
