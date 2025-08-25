import { HiQuestionMarkCircle, HiExclamationCircle, HiCheckCircle, HiXCircle, HiPlay } from "react-icons/hi";
import { Progress, Tooltip } from "flowbite-react";
import classNames from "classnames";
import PropTypes from "prop-types";

/**
 *
 * @param {"Выполняется" | "Выполнено" | "Частично" | "Отменен" | "Не оплачен"} status - Статус заказа
 * @param {number} done - Кол-во выполненного
 * @param {number} count - Кол-во всего
 * @param {string} cancellationReason - Причина отмены
 * @returns {JSX.Element}
 * @constructor
 */
export const OrdersProgress = ({ cancellationReason, status, count, done }) => {
    // Процент выполнения
    const percent = (done / count) * 100;

    /**
     * Цвет статуса
     */
    const colorStatus = () => {
        switch (status) {
            case "Выполняется":
                return {
                    fill: "fill-primary-500",
                    color: "purple",
                };

            case "Выполнено":
                return { fill: "fill-green-400", color: "green" };

            case "Частично":
                return { fill: "fill-yellow-500", color: "yellow" };

            case "Отменен":
                return { fill: "fill-red-500", color: "red" };

            case "Не оплачен":
                return { fill: "fill-yellow-300", color: "yellow" };

            default:
                return "";
        }
    };

    /**
     * Иконка статуса
     * @returns {JSX.Element}
     */
    const iconStatus = () => {
        // Класс иконки статуса
        const classIconStatus = classNames("h-[18px] w-[18px]", colorStatus().fill);

        switch (status) {
            case "Выполняется":
                return <HiPlay className={classIconStatus} />;

            case "Выполнено":
                return <HiCheckCircle className={classIconStatus} />;

            case "Частично":
                return <HiExclamationCircle className={classIconStatus} />;

            case "Отменен":
                return <HiXCircle className={classIconStatus} />;

            case "Не оплачен":
                return <HiQuestionMarkCircle className={classIconStatus} />;

            default:
                return <HiPlay className={classIconStatus} />;
        }
    };

    /**
     * Рендер статуса
     * @returns {JSX.Element}
     */
    const renderStatus = () => {
        return (
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-[6px]">
                    {/* Иконка статуса */}
                    {iconStatus()}

                    {/* Текст статуса */}
                    <p className="text-sm font-pn-regular text-gray-600">{status}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="max-sm:w-full flex max-sm:ml-2 flex-col gap-1.5 items-start sm:items-center h-[60px] sm:h-[53px]">
            {/* Статус */}
            <Tooltip className={`max-w-100 cursor-pointer ${!cancellationReason && "hidden"}`} content={cancellationReason} style="dark">
                {renderStatus()}
            </Tooltip>

            {/* Прогресс */}
            <Progress color={colorStatus().color} progress={percent} size="sm" />

            <p className="whitespace-nowrap text-sm font-pn-regular text-gray-600">
                {done} / {count}
            </p>
        </div>
    );
};

OrdersProgress.propTypes = {
    /**
     * Статус заказа
     */
    status: PropTypes.oneOf(["Выполняется", "Выполнено", "Частично", "Отменен", "Не оплачен"]),

    /**
     * Причина отмены
     */
    cancellationReason: PropTypes.number,

    /**
     * Кол-во всего
     */
    count: PropTypes.number,

    /**
     * Кол-во выполненного
     */
    done: PropTypes.number,
};
