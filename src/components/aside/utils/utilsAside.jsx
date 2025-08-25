"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef, Fragment } from "react";
import Tooltip from "@components/popup/Tooltip.jsx";
import { IconPremiumStar } from "@icons";
import { servicesCategories } from "@config";
import { VAR_LINK_ROUTES } from "@vars";
import { useTypeDevice } from "@hooks";
import classnames from "classnames";
import classNames from "classnames";

import {
  IconAutoService,
  IconTemplates,
  IconSettings,
  IconRefs,
  IconHelp,
  IconCopy,
  IconApi,
} from "../assets/icons";
import { AsideMassOrder } from "../components";
import Link from "next/link";

export const profileCategories = (name, isText) => {
  switch (name) {
    case "Мои заказы":
      return isText ? VAR_LINK_ROUTES.orders : <IconCopy />;
    case "Автоуслуги":
      return isText ? VAR_LINK_ROUTES.autoServices : <IconAutoService />;
    case "Рефералы":
      return isText ? VAR_LINK_ROUTES.ref : <IconRefs />;
    case "Настройки":
      return isText ? VAR_LINK_ROUTES.settings : <IconSettings />;
    case "API":
      return isText ? VAR_LINK_ROUTES.api : <IconApi />;
    case "Помощь":
      return isText ? VAR_LINK_ROUTES.faq : <IconHelp />;
    case "Шаблоны":
      return isText ? VAR_LINK_ROUTES.templates : <IconTemplates />;
    default:
      return "";
  }
};

export const utilAsideRenderServices = (
  service,
  category,
  setOpenModal,
  feesData,
) => {
  const has_premium_subscription = useSelector(
    (state) => state.profileSettings.has_premium_subscription,
  );
  const containerRef = useRef(null);
  const { isMobile } = useTypeDevice();

  const [dataService, setDataService] = useState([]);

  const serviceRuName = servicesCategories(service)?.ru_name;

  useEffect(() => {
    if (feesData && service) {
      const dataCategories = feesData?.data?.find(
        (elem) => elem.name === service,
      )?.categories;
      setDataService(dataCategories);
    }
  }, [feesData, service]);
  console.log(feesData, service);
  return (
    Array.isArray(dataService) &&
    dataService?.map((elem, index) => {
      const ruNameCategory = elem?.["ru_name"];
      const nameCategory = elem?.name;

      const isUnlockPremiumSubscription =
        nameCategory.includes("auto_") && !has_premium_subscription;
      const iconCategory = isUnlockPremiumSubscription
        ? servicesCategories(nameCategory, true)?.icon
        : servicesCategories(nameCategory)?.icon;

      const classItem = classNames(
        "flex flex-nowrap rounded-[30px] cursor-pointer flex-row gap-3 p-[14px] items-center",
        {
          "hover:bg-[#e5f5fd] rounded-[30px]": !isUnlockPremiumSubscription,
          "hover:bg-transparent": isUnlockPremiumSubscription,
          "bg-[#e5f5fd]": ruNameCategory === serviceRuName,
        },
      );

      const propsLink = () => (index === 0 ? { ref: containerRef } : {});

      return (
        <Fragment key={elem.name}>
          {isUnlockPremiumSubscription ? (
            <div
              {...propsLink()}
              onClick={() => setOpenModal(true)}
              className={classItem}
            >
              {iconCategory}
              <p className="text-[#E8EBF1] font-pn-regular text-[15px]">
                {ruNameCategory}
              </p>

              <div className="ml-auto relative">
                <Tooltip
                  nodePopup={
                    <p>
                      Функция доступна только
                      <br /> с Premium подпиской
                    </p>
                  }
                  direction={isMobile ? "left" : "top"}
                >
                  <IconPremiumStar className="fill-[url(#purple_grad)]" />
                </Tooltip>
              </div>
            </div>
          ) : (
            <Link
              href={`/${VAR_LINK_ROUTES.services}/${service}/${nameCategory}`}
              {...propsLink()}
              className={classItem}
            >
              {iconCategory}
              <p
                className={classnames(
                  "text-gray-600 font-pn-regular text-[15px]",
                  {
                    "!text-[#4674d3] font-pn-semibold":
                      ruNameCategory === "Бусты",
                  },
                )}
              >
                {ruNameCategory}
              </p>
            </Link>
          )}
        </Fragment>
      );
    })
  );
};

/**
 * Утилита для рендера массовых заказов в боковом меню.
 * @param {[]} orders - Массив с заказами.
 * @returns {*}
 */
export const utilAsideRenderMassorders = (orders) =>
  Array.isArray(orders) &&
  orders?.map((elem, index) => (
    <AsideMassOrder index={index} elem={elem} key={index} />
  ));
