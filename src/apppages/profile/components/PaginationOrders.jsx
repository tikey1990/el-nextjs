import { useTypeDevice, useGetPage } from "@hooks";

import { Pagination } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Компонент пагинации моих заказов
 * @returns {React.JSX.Element}
 * @constructor
 */
// eslint-disable-next-line react/prop-types
const PaginationOrders = ({
  paymentsAllCount,
  countOrderFirst,
  countOrderLast,
  pagesCount,
  setFilters,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const { isMobile } = useTypeDevice();
  const { page } = useGetPage(); // Получаем текущий номер страницы

  return (
    <div className="flex-col gap-3 sm:flex-row flex w-full items-center justify-between">
      <p>
        Показано
        <span className="text-gray-600 font-pn-bold">
          {" "}
          {countOrderFirst}-{countOrderLast}{" "}
        </span>
        из{" "}
        <span className="text-gray-600 font-pn-bold">{paymentsAllCount}</span>
      </p>

      <Pagination
        onPageChange={(page) => {
          setFilters((prev) => ({ ...prev, scrollPage: null }));
          router.push(`/profile/orders/${page}?` + params.toString());
        }}
        layout={isMobile ? "navigation" : "pagination"}
        currentPage={Number(page)}
        totalPages={pagesCount}
        previousLabel=""
        nextLabel=""
        showIcons
      />
    </div>
  );
};

export default PaginationOrders;
