import { useProfileOrderParamsUrl } from "@apppages/profile/hooks";
import { Select as SelectCustom } from "@components";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Label } from "flowbite-react";
import { useGetPage } from "@hooks";

import { dataFiltersServices, dataFiltersWebsites } from "../config";
import { useFiltersData } from "../hooks";

/**
 * Функция для обновления фильтров
 * @param {{}} filters - State фильтров
 * @param {function} getOrdersPage - Получение моих заказов
 */
export const utilOrderFiltersUpdate = (filters, getOrdersPage) => {
  const { paramWebsite, paramSearch, paramStatus, paramType } =
    useProfileOrderParamsUrl();
  const { page } = useGetPage();
  const filtersData = useFiltersData(filters); // Данные о фильтрах

  useEffect(() => {
    getOrdersPage({ filters: JSON.stringify(filtersData) });
  }, [page, paramStatus, paramType, paramSearch, paramWebsite]);
};

/**
 * Util для рендера соц сетей в select
 * @param {function} selectHandle - Событие select
 * @param {function} filterWebsite - State фильтров
 * @param {function} findFilterWebsite - DefaultValue
 * @returns {JSX.Element}
 */
export const utilRenderOrderSocials = (
  selectHandle,
  filterWebsite,
  findFilterWebsite,
) => {
  const { data } = dataFiltersWebsites();

  return (
    <div className="w-full sm:w-[30%]" id="select">
      <div className="mb-2 block">
        <Label
          className="font-pn-semibold text-[13px]"
          value="Социальная сеть"
          htmlFor="website"
        />
      </div>

      {/* Select filters status */}
      <SelectCustom
        onChange={(elem) => selectHandle(elem, "website")}
        defaultValue={findFilterWebsite}
        state={filterWebsite ?? {}}
        style="large"
        data={data}
      />
    </div>
  );
};

/**
 * Util для рендера категорий соц сетей в select
 * @param {function} selectHandle - Событие select
 * @param {function} filterServices - State фильтров
 * @param {function} findFilterServices - DefaultValue
 * @returns {JSX.Element}
 */
export const utilRenderOrderServices = (
  selectHandle,
  filterServices,
  findFilterServices,
) => {
  const { isParamWebsite, data } = dataFiltersServices();

  const handleClick = () => {
    toast.warning("Сначала необходимо выбрать соц. сеть");
  };

  return (
    <div className="w-full sm:w-[30%] relative" id="select">
      {isParamWebsite && (
        <div
          className="absolute w-full h-full z-10 cursor-pointer"
          onClick={handleClick}
        ></div>
      )}

      <div className="mb-2 block">
        <Label
          className="font-pn-semibold text-[13px]"
          htmlFor="type"
          value="Услуга"
        />
      </div>

      {/* Select filters status */}
      <SelectCustom
        onChange={(elem) => selectHandle(elem, "type")}
        defaultValue={findFilterServices}
        state={filterServices ?? {}}
        disabled={isParamWebsite}
        style="large"
        data={data}
      />
    </div>
  );
};
