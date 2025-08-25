"use client";
import AsidePremiumModal from "@components/aside/components/modal/premium/AsidePremiumModal.jsx";
import { VAR_HAS_PREMIUM_VISUAL_MODE } from "@vars";
import classnames from "classnames";
import { useEffect, useState } from "react";

import { utilAsideRenderServices } from "../utils";
import { useDispatch } from "react-redux";
import { setServicesRoute } from "@features";

/**
 * Компонент категорий сервисов
 * @returns {JSX.Element}
 * @constructor
 */
export const AsideCategoriesServices = ({ service, category, feesData }) => {
  const isCheckedVisualMode = VAR_HAS_PREMIUM_VISUAL_MODE();
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setServicesRoute({
        serviceInfo: feesData.data.find((itm) => itm.name === service),
        qualities: null,
        quality: null,
      }),
    );
  }, []);

  const classWrapperCategories = classnames(
    "flex bg-white flex-nowrap flex-col p-[10px] gap-1.5 rounded-2xl shadow-[0_30px_60px_rgba(13,34,79,0.8)]",
    { "aside-bg-premium": isCheckedVisualMode },
  );

  return (
    <>
      <>
        <AsidePremiumModal setOpenModal={setOpenModal} openModal={openModal} />
        <div className={classWrapperCategories}>
          {utilAsideRenderServices(service, category, setOpenModal, feesData)}
        </div>
      </>
    </>
  );
};
