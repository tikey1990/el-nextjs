import { useTypeDevice } from "@hooks";
import { useSumOrder } from "@components/services/hooks";

/**
 * Компонент суммы заказа
 * @returns {JSX.Element}
 * @constructor
 */
export const ServicesSumOrder = () => {
  const { isMobile } = useTypeDevice();
  const { isSumLinksMultiply, prevPricePerOne, xSumLinks, sum } = useSumOrder();

  return (
    <>
      {isMobile ? (
        <p className="text-lg text-gray-600 font-pn-boldit text-right">
          Сумма:{" "}
          <span className="font-md-moz-fix text-primary-500 font-pn-bold">
            {sum} руб
          </span>
        </p>
      ) : (
        <p className="text-[20px] font-pn-regular text-gray-600">
          {isSumLinksMultiply && <>x {xSumLinks}</>} х {prevPricePerOne} руб{" "}
          <span className="font-md-moz-fix font-pn-bold text-gray-600">
            {" "}
            = {sum} руб
          </span>
        </p>
      )}
    </>
  );
};
