"use client";
import { lazyReactNaiveRetry } from "@utils";
import { IconPremium } from "@icons";
import { useState } from "react";

const AsidePremiumModal = lazyReactNaiveRetry(
  () => import("./modal/premium/AsidePremiumModal.jsx"),
);

/**
 * Компонент блока просмотра баланса
 * @returns {JSX.Element}
 * @constructor
 */
export const AsidePremium = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleClickPremium = () => setOpenModal(true);

  return (
    <>
      <AsidePremiumModal setOpenModal={setOpenModal} openModal={openModal} />

      <div
        className="h-[60px] aside-bg-premium-bal cursor-pointer rounded-2xl items-center py-[4] px-[25px] flex flex-row gap-[14px] sm:gap-[12px]"
        onClick={handleClickPremium}
      >
        <IconPremium />

        <p className="font-pn-bold text-[16px] color-white">
          Easyliker Premium
        </p>
      </div>
    </>
  );
};
