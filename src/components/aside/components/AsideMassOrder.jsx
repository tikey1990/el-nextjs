"use client";
import { setMassOrderIsOpenedFirstOrder, setMassOrdersStatus } from "@features";
import { configSocialsIcons } from "@config/social/index.js";
import { useSpringValue, animated } from "react-spring";
import { configIconsReactionsServices } from "@config";
import { FaExclamation } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { HiPause } from "react-icons/hi2";
import { MdDone } from "react-icons/md";
import classNames from "classnames";
import classnames from "classnames";
import PropTypes from "prop-types";

import { AsideMassOrderModal } from "./";

/**
 * Элемент массового заказа.
 * @param {any} elem - Объект элемента массового заказа.
 * @param {any} props - Props.
 * @returns {JSX.Element}
 * @constructor
 */
export const AsideMassOrder = ({ elem, ...props }) => {
  const dispatch = useDispatch();

  const isNotEmpty = elem?.isOpenedFirstOrder === false;
  const [openModal, setOpenModal] = useState(false);
  const isReactions = elem?.type === "Реакции";

  const isFinishedOrder = elem?.status === "finished";
  const isErrorOrder = elem?.status === "error";
  const isActiveOrder = elem?.status === "active";

  // Кол-во завершенных заказов
  const countElemsFinished = elem?.data?.filter(
    (elem) => elem.status === "finished" || elem.status === "error",
  ).length;
  // Все ли заказы завершились с ошибкой
  const isAllOrdersError = elem?.data?.every(
    (elem) => elem?.status === "error" && isErrorOrder,
  );
  // Процент выполненных заказов
  const targetPercent = Number(
    ((countElemsFinished / elem?.countAllOrders) * 100).toFixed(),
  );
  // Конфиг соц сети
  const configServiceInfo = configSocialsIcons?.[`${elem?.website}`];
  // Класс для иконки соц сети заказа
  const iconClass = classNames(
    "rounded-full w-[54px] h-[54px] flex justify-center items-center",
    configServiceInfo?.bg,
  );
  // Класс для текста счётчика заказов
  const countElemsFinishedClass = classNames(
    "font-pn-semibold text-sm",
    { "text-primary-500": isFinishedOrder },
    { "text-[#FF3535]": isAllOrdersError },
    { "text-primary-500": !isAllOrdersError },
    { "text-primary-500": isActiveOrder },
  );
  // Отключена ли кнопка паузы / возобновления
  const isDisableButton =
    elem?.status === "finished" || elem?.status === "error";

  const iconReaction =
    configIconsReactionsServices()?.[`${elem?.quality}`]?.icon;

  useEffect(() => {
    if (isNotEmpty) {
      dispatch(
        setMassOrderIsOpenedFirstOrder({
          isOpenedFirstOrder: true,
          id: elem?.id,
        }),
      );
      setOpenModal(true);
    }
  }, [isNotEmpty, dispatch, elem?.id]);

  /**
   * Bg прогресса.
   * @param {number} percent - Процент прогресса.
   * @param isAllOrdersError
   * @returns {{background: string}|string}
   */
  const bgProgress = (percent, isAllOrdersError) => {
    switch (elem?.status) {
      case "error":
        return `conic-gradient(${isAllOrdersError ? "#FF3535" : "#FFD600"} ${percent}%, rgb(242, 242, 242) 0%)`;
      case "active":
        return `conic-gradient(#009FE7 ${percent}%, rgb(242, 242, 242) 0%)`;
      case "paused":
        return `conic-gradient(#009FE7 ${percent}%, rgb(242, 242, 242) 0%)`;
      case "finished":
        return `conic-gradient(#009FE7 ${percent}%, rgb(242, 242, 242) 0%)`;
      default:
        return "";
    }
  };

  /**
   * Иконка прогресса
   * @returns {JSX.Element}
   */
  const iconProgress = () => {
    switch (elem?.status) {
      case "error":
        return isAllOrdersError ? (
          <FaExclamation fill="#FF3535" />
        ) : (
          <FaExclamation fill="#FFD600" />
        );
      case "paused":
        return <BsPlayFill className="translate-x-[1px]" fill="#009FE7" />;
      case "active":
        return <HiPause fill="#828FA4" />;
      case "finished":
        return <MdDone fill="#009FE7" />;
      default:
        return <></>;
    }
  };

  // Обновляем значение процента выполнения прогресса
  useEffect(() => {
    backgroundImage.start(bgProgress(targetPercent, isAllOrdersError)).then();
  }, [targetPercent, elem?.status, isAllOrdersError]);

  // Spring значение фона прогресса
  const backgroundImage = useSpringValue(bgProgress(0, isAllOrdersError));

  /**
   * Слушатель по нажатию на статус
   */
  const handleClickStatus = () => {
    switch (elem?.status) {
      case "paused":
        dispatch(setMassOrdersStatus({ status: "active", id: elem?.id }));
        break;
      case "active":
        dispatch(setMassOrdersStatus({ status: "paused", id: elem?.id }));
        break;
      default:
        dispatch(setMassOrdersStatus({ id: elem?.id, status: "" }));
    }
  };

  /**
   * Слушатель на открытие модального окна
   */
  const handleOpenMassOrderModal = () => setOpenModal(true);

  return (
    <div
      className="bg-white shadow-content flex max-sm:min-w-full p-[5px] pr-3 items-center justify-between rounded-full space-x-4"
      {...props}
    >
      {/* Модальное окно массовых заказов */}
      <AsideMassOrderModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        order={elem}
      />

      <div
        className="flex items-center gap-2.5 cursor-pointer"
        onClick={handleOpenMassOrderModal}
      >
        {/* Иконка масс заказа */}
        <div className={iconClass}>{configServiceInfo?.iconMassOrder}</div>

        {/* Тип и качество масс заказа */}
        <div
          className={classnames(
            "flex gap-1.5",
            { "flex-row items-center": isReactions },
            { "flex-col": !isReactions },
          )}
        >
          <p className="text-gray-600 font-pn-semibold text-[15px] leading-[1]">
            {elem?.ru_name}
          </p>
          <p className="text-gray-600 text-xs">
            {isReactions ? iconReaction : elem?.quality}
          </p>
        </div>
      </div>

      {/* Прогресс масс заказа */}
      <div className="flex gap-[10px] items-center">
        <div className="flex flex-col items-center">
          <p className={countElemsFinishedClass}>{countElemsFinished}</p>
          <p className="font-pn-regular text-gray-600 text-xs">
            {elem?.countAllOrders}
          </p>
        </div>

        {/* Прогресс масс заказа */}
        <button
          className="w-[28px] h-[28px] rounded-[50%] overflow-hidden"
          onClick={handleClickStatus}
          disabled={isDisableButton}
        >
          <animated.div
            style={{
              backgroundImage,
            }}
            className="w-[28px] h-[28px] rounded-[50%] relative"
          >
            <div className="absolute w-[24px] h-[24px] rounded-[50%] bg-white top-[2px] left-[2px] flex justify-center items-center">
              {iconProgress()}
            </div>
          </animated.div>
        </button>
      </div>
    </div>
  );
};

AsideMassOrder.propTypes = {
  props: PropTypes.any,
  elem: PropTypes.any,
};
