import { useProfileOrderParamsUrl } from "@apppages/profile/hooks";
import { useGetPage } from "@hooks";

/**
 * Получение данных фильтров
 * @param filters
 * @returns {{page_number: number, status: string}}
 */
export const useFiltersData = (filters) => {
  const { paramStatus } = useProfileOrderParamsUrl();
  const { page } = useGetPage();

  // Фильтры
  const filtersData = { status: "autoservices_all", page_number: Number(page) };

  if (paramStatus === "все" || filters.name === "все")
    filtersData.status = "autoservices_all";
  if (paramStatus === "активные" || filters.name === "активные")
    filtersData.status = "autoservices_active";

  return filtersData;
};
