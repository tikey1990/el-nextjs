"use client";
import {
  ServicesForm,
  ServicesFormHead,
  ServicesFormSettings,
} from "@components/services/components/form";
import { BannerButtonWarning } from "@components/services/components/banner";
import classnames from "classnames";
import { VAR_HAS_PREMIUM_VISUAL_MODE } from "@vars";
import { useLoadServices } from "@hooks";
import { useServicesRedirect } from "@components/services/hooks";

const ServiceCategoryPage = () => {
  const isCheckedVisualMode = VAR_HAS_PREMIUM_VISUAL_MODE();
  useLoadServices();
  useServicesRedirect();
  return (
    <>
      <div className="flex flex-col w-full h-fit">
        <div
          className={classnames(
            "flex w-full h-full z-50 flex-col flex-nowrap rounded-2xl bg-white px-5 py-6 shadow-content sm:p-10",
            { "aside-bg-premium-services": isCheckedVisualMode },
          )}
        >
          {/* Шапка формы */}
          <ServicesFormHead />

          {/* Настройки накрутки */}
          <ServicesFormSettings />

          {/* Баннер с предупреждением */}
          <BannerButtonWarning />

          {/* Форма сервисов */}
          <ServicesForm />
        </div>
      </div>
    </>
  );
};

export default ServiceCategoryPage;
