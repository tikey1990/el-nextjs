"use client";
import { classesTvRefill } from "@apppages/home/components/refill/assets/styles";
import Image from "next/image";

import { refillImagesConfig } from "./config/refillImagesConfig";
import "./assets/styles/refill.scss";
import { useRouter } from "next/navigation";

/**
 * Способы пополнения на главной
 * @returns {JSX.Element}
 * @constructor
 */
export const Refill = () => {
  const router = useRouter();

  const {
    tvHomeRefillWrapperItems,
    tvHomeRefillWrapper,
    tvHomeSubtitle,
    tvHomeRefill,
  } = classesTvRefill();

  const handleClickRefill = () => router.push("/register");

  /**
   * Рендер элементов способов пополнения
   * @returns {unknown[]}
   */
  const renderRefillItems = () =>
    refillImagesConfig.map((elem, index) => (
      <div
        className={`${tvHomeRefillWrapperItems()}`}
        onClick={handleClickRefill}
        key={index}
      >
        <Image
          className={`${elem.class}`}
          height={elem.height}
          width={elem.width}
          src={elem.src}
          alt={elem.alt}
        />
      </div>
    ));

  return (
    <div className={`${tvHomeRefill()} opacity-100`}>
      <p className={tvHomeSubtitle()}>Способы пополнения</p>

      <div className={tvHomeRefillWrapper()}>{renderRefillItems()}</div>
    </div>
  );
};
