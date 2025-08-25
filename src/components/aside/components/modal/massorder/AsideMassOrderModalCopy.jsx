import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import { useTypeDevice } from "@hooks";
import { utilCopyText } from "@utils";
import classnames from "classnames";
import PropTypes from "prop-types";

/**
 * Компонент с копированием ссылок и id массового заказа
 * @param order
 * @returns {JSX.Element}
 * @constructor
 */
export const AsideMassOrderModalCopy = ({ order }) => {
    const { isMobile } = useTypeDevice();

    // Сумма потраченных денег на массовый заказ
    const spentOrders = parseFloat(
        Number(
            order?.data.reduce((total, elem) => {
                if (elem?.status === "finished") {
                    if (elem?.website === "youtube" && elem?.type === "views") return total + elem?.price * elem?.option[0];
                    else return total + elem?.price;
                } else return total;
            }, 0)
        ).toFixed(2)
    );
    // Класс кнопки для копирования
    const copyButtonClass = classnames(
        "font-pn-regular py-[10px] max-sm:w-full sm:h-[52px] h-[36px] text-[13px] px-[25px] pseudoOutlineBlueSafari hover:after:shadow-none outline-none ring-0 focus:outline-none focus:ring-0 leading-4"
    );

    /**
     * Копирование информации о заказе.
     * @param {string} filter - Статус, по которому осуществляется фильтрация.
     * @param {string} mapTo - Свойство объекта, которое хотим получить.
     * @param {string} onSuccessMessage - Сообщение при успешном копировании.
     * @param {string} failureMessage -Сообщение при неудачном копировании.
     * @param {string} notFoundMessage - Сообщение, когда нет данных.
     * @returns {(function(): void)|*}
     */
    const copyToClipboard = (filter, mapTo, onSuccessMessage, failureMessage, notFoundMessage) => () => {
        const copiedData = order?.data
            ?.filter((elem) => elem?.status === filter)
            .map((elem) => elem[mapTo])
            .join("\n");

        if (copiedData) utilCopyText(copiedData, onSuccessMessage, failureMessage);
        else toast.error(notFoundMessage);
    };

    /**
     * Слушатель на копирование ссылок успешно выполненных заказов
     */
    const handleCopyFinishedOrdersLinks = copyToClipboard(
        "finished",
        "link",
        "Ссылки созданных заказов скопированы",
        "Произошла ошибка при копировании ссылок на заказы",
        "Ссылки созданных заказов не обнаружены"
    );

    /**
     * Слушатель на копирование id успешно выполненных заказов
     */
    const handleCopyFinishedOrdersId = copyToClipboard(
        "finished",
        "newId",
        "Id созданных заказов скопированы",
        "Произошла ошибка при копировании id заказов",
        "Id созданных заказов не обнаружены"
    );

    /**
     * Слушатель на копирование ссылок невыполненных заказов
     */
    const handleCopyErrorsOrdersId = copyToClipboard(
        "error",
        "link",
        "Ссылки невыполненных заказов скопированы",
        "Произошла ошибка при копировании ссылок невыполненных заказов",
        "Ссылки невыполненных заказов не обнаружены"
    );

    return (
        <div className="flex flex-col sm:flex-row flex-nowrap justify-between rounded-xl items-center py-[14px] mb-[20px] px-[15px] sm:px-5 shadow-block2">
            {/* Потрачено */}
            <span className="text-lg flex flex-row sm:flex-col max-sm:items-center max-sm:w-full max-sm:gap-3">
                <p className="text-gray-600 font-pn-semiboldit">Потрачено</p>
                <p className="text-primary-500 font-pn-boldit">{isNaN(spentOrders) ? 0 : spentOrders} руб</p>
            </span>

            {/* Кнопки копирования */}
            <div className="flex flex-col sm:flex-row items-center gap-3 max-sm:mt-4 max-sm:w-full">
                <Button onClick={handleCopyFinishedOrdersLinks} className={copyButtonClass} color="secondary" size="custom">
                    {isMobile ? "Скопп." : "Скопировать"} ссылки
                    <br className="hidden sm:block" /> созданных заказов
                </Button>

                <Button onClick={handleCopyFinishedOrdersId} className={copyButtonClass} color="secondary" size="custom">
                    {isMobile ? "Скопп." : "Скопировать"} id
                    <br className="hidden sm:block" /> созданных заказов
                </Button>

                <Button onClick={handleCopyErrorsOrdersId} className={copyButtonClass} color="secondary" size="custom">
                    {isMobile ? "Скопп." : "Скопировать"}
                    <br className="hidden sm:block" /> неуспешные ссылки
                </Button>
            </div>
        </div>
    );
};

AsideMassOrderModalCopy.propTypes = {
    /**
     * Order
     */
    order: PropTypes.object,
};
