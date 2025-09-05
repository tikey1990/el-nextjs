"use client";
import { useSelector } from "react-redux";
import { ServicesQualityInfo } from "@components/services/components/ServicesQualityInfo";
import {
  utilServicesRenderQualities,
  UtilServicesRenderTypes,
} from "@components/services/utils";

/**
 * Компонент раздела "Качество накрутки" формы сервисов
 * @returns {JSX.Element}
 * @constructor
 */
export const ServicesFormSettings = () => {
  const serviceName = useSelector(
    (state) => state.services.route.serviceInfo?.name,
  );
  const title = /^stream_/.test(serviceName)
    ? "Время действия"
    : "Качество накрутки";

  return (
    // Настройки накрутки
    <form className="flex flex-col flex-nowrap mb-6 sm:flex-row sm:gap-8 lg:gap-10 sm:mb-10 items-start justify-between">
      {/* Настройки */}
      <div className="flex flex-nowrap flex-col gap-5 max-w-full sm:w-[350px] lg:w-[450px] xl:w-[420px] w-full sm:p-5 bg-white sm:bg-[#f0faff] rounded-xl">
        {/* Тип категории услуги */}
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-2.5 sm:gap-4">
          <UtilServicesRenderTypes />
        </div>

        {/* Качество категории услуги */}
        <div className="flex flex-col gap-4">
          <p className="font-pn-extraboldit text-gray-600">{title}</p>

          <div className="flex flex-row flex-wrap items-center gap-1.5 sm:gap-4">
            {utilServicesRenderQualities()}
          </div>
        </div>
      </div>

      {/* Преимущества */}
      <ServicesQualityInfo />
    </form>
  );
};
