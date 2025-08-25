import { HiQuestionMarkCircle, HiExclamationCircle, HiCheckCircle, HiXCircle, HiPlay } from "react-icons/hi";
import { PiClockClockwiseBold } from "react-icons/pi";
import { lazyReactNaiveRetry } from "@utils";
import { IoMdTime } from "react-icons/io";
import { pluralize } from "numeralize-ru";
import { Progress } from "flowbite-react";
import { useCountdown } from "@hooks";
import React, { memo } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Tooltip = lazyReactNaiveRetry(() => import("@components/popup/Tooltip.jsx"));

/**
 * Компонент прогресса в таблице с моими заказами.
 * @returns {JSX.Element}
 * @constructor
 */
const OrdersProgress = ({ data }) => {
    const { cancellation_reason: cancellationReason, service_start_date, status: dataStatus, service_end_date, count, done, type } = data;
    const isActiveTimer = dataStatus === "Активен" && service_end_date && service_start_date; // Если нужно отрисовать таймер.
    const isWaitingTimer = dataStatus === "Запускается" && /^stream_/.test(type); // Если есть таймер, но заказ только запускается.

    // Получаем параметры таймера
    const { percent: percentTimer, timeString } = useCountdown(service_start_date, service_end_date);
    const declinedWord = pluralize(count, "зритель", "зрителя", "зрителей"); // Склонение зрителей
    const isTimeEndAndActive = dataStatus === "Активен" && percentTimer === 0; // Если заказ с таймером завершился
    const status = isTimeEndAndActive ? "Выполнено" : dataStatus; // Статус заказа

    const isRenderPopup = cancellationReason || (isActiveTimer && !isTimeEndAndActive) || dataStatus === "В очереди";
    const popupContent = () => {
        if (cancellationReason) return cancellationReason;
        else if (dataStatus === "В очереди") return "По данной ссылке уже есть активный заказ. Пожалуйста, дождитесь его завершения";
        else if (isActiveTimer && !isTimeEndAndActive)
            return (
                <>
                    {count} {declinedWord}
                </>
            );
    };

    /**
     * Процент выполнения заказа
     * @returns {number|string}
     */
    const percent = () => {
        if (isActiveTimer) {
            if (isTimeEndAndActive) return 100;
            else return percentTimer.toFixed(2);
        } else return (done / count) * 100;
    };

    /**
     * Цвет статуса
     */
    const colorStatus = () => {
        switch (status) {
            case "Выполняется":
                return {
                    fill: "fill-primary-500",
                    color: "primary",
                };

            case "Активен":
                return {
                    fill: "fill-primary-500",
                    color: "primary",
                };

            case "Запускается":
                return {
                    fill: "fill-yellow-500",
                    color: "yellow",
                };

            case "В очереди":
                return {
                    fill: "fill-yellow-500",
                    color: "yellow",
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

            case "Запускается":
                return <IoMdTime className={classIconStatus} />;

            case "В очереди":
                return <PiClockClockwiseBold className={classIconStatus} />;

            case "Активен":
                return <HiPlay className={classIconStatus} />;

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
            <div className="w-full flex flex-row items-center cursor-pointer sm:justify-center gap-[6px]">
                {/* Иконка статуса */}
                {iconStatus()}

                {/* Текст статуса */}
                <p className="text-sm font-pn-regular text-gray-600">{status}</p>
            </div>
        );
    };

    return (
        <div className="w-full flex max-sm:ml-2 flex-col gap-1.5 items-start justify-center sm:items-center h-[60px] sm:h-[53px]">
            {/* Статус */}
            {isRenderPopup ? (
                <Tooltip classNamePopup="!min-w-[150px]" nodePopup={popupContent()}>
                    {renderStatus()}
                </Tooltip>
            ) : (
                renderStatus()
            )}
            {/* /!* Прогресс *!/ */}
            {!isWaitingTimer && <Progress color={colorStatus().color} progress={percent()} size="sm" />}

            {isActiveTimer ? (
                isTimeEndAndActive ? (
                    <>
                        {count} / {count}
                    </>
                ) : (
                    timeString
                )
            ) : (
                <p className="whitespace-nowrap text-sm font-pn-regular text-gray-600">
                    {isWaitingTimer ? (
                        <>
                            {count} {declinedWord}
                        </>
                    ) : (
                        <>
                            {done} / {count}
                        </>
                    )}
                </p>
            )}
        </div>
    );
};

OrdersProgress.propTypes = {
    data: PropTypes.shape({
        /**
         * Status of the order
         */
        status: PropTypes.oneOf(["Выполняется", "Выполнено", "Частично", "Отменен", "Не оплачен", "Активен", "Запускается", "В очереди"]),
        /**
         * Reason for cancellation
         */
        cancellation_reason: PropTypes.string,
        /**
         * Service start date
         */
        service_start_date: PropTypes.string,
        /**
         * Service end date
         */
        service_end_date: PropTypes.string,
        /**
         * Total amount of work
         */
        count: PropTypes.number,
        /**
         * Type of service
         */
        type: PropTypes.string,
        /**
         * Amount of work done
         */
        done: PropTypes.number,
    }).isRequired,
};

export default memo(OrdersProgress);
