import { useProfileOrderParamsUrl } from "@apppages/profile/hooks";
import { capitalizeFirstLetter } from "@utils";
import { useGetPage } from "@hooks";

/**
 * Получение данных фильтров
 * @param filters
 * @returns {{page_number: number, data_search: string}}
 */
export const useFiltersData = (filters) => {
  const { paramWebsite, paramSearch, paramStatus, paramType } =
    useProfileOrderParamsUrl();

  const { page } = useGetPage();

  // Фильтры
  const filtersData = { page_number: page, data_search: "" };

  // Если есть статус
  if (filters.status || paramStatus)
    filtersData.status = capitalizeFirstLetter(paramStatus);
  // Если есть соц сеть
  if (filters.website || paramWebsite) {
    if (filters.website === "Все соцсети") filtersData.website = "all";
    else filtersData.website = paramWebsite;
  }
  // Если есть услуга
  if (filters.type || paramType) {
    if (paramType === "Все услуги") filtersData.type = "all";
    else filtersData.type = paramType;
  }
  // Если есть поиск
  if (filters.search || paramSearch) filtersData.data_search = paramSearch;

  return filtersData;
};
