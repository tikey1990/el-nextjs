"use client";
import { capitalizeFirstLetter } from "@utils";
import { useSelector } from "react-redux";

/**
 * Компонент шапки формы
 * @returns {JSX.Element}
 * @constructor
 */
export const ServicesFormHead = () => {
  const title = useSelector(
    (state) => state.services.route.serviceInfo?.ru_name || "",
  );
  const service = useSelector(
    (state) => state.services.route.serviceInfo?.service || "",
  );
  const nameService = () => {
    switch (service) {
      case "vk":
        return "VK";
      case "youtube":
        return "YouTube";

      default:
        return capitalizeFirstLetter(service);
    }
  };

  return (
    <div className="flex flex-wrap flex-row justify-between mb-6">
      {/* Заголовок формы */}
      <h1 className="font-pn-extraboldit text-2xl sm:text-3xl text-gray-600">
        {title} {nameService()}
      </h1>
    </div>
  );
};
