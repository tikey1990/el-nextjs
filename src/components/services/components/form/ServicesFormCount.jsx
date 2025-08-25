import { utilColorInputValid, utilHelperText } from "@utils";
import { TextInput, Label } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTypeDevice } from "@hooks";

import { ServicesSumOrder } from "./";
import { useSumOrder } from "@components/services/hooks";

/**
 * Компонент количества заказов и отображение стоимости
 * @returns {JSX.Element}
 * @constructor
 */
export const ServicesFormCount = () => {
  const { isMobile } = useTypeDevice();
  const { speedSlider } = useSumOrder();

  /**
   * Получение данных об услугах и качестве из Redux store
   */
  const quality = useSelector((state) => state.services.route.quality);
  const serviceInfo = useSelector((state) => state.services.route.serviceInfo);
  const balance = useSelector((state) => state.profileSettings.balance);
  const minCount = quality?.["min_count"];
  const [prevMinCount, setPrevMinCount] = useState(minCount);

  /**
   * Форма
   */
  const methods = useFormContext();
  const {
    formState: { dirtyFields, errors },
    register,
    setValue,
    watch,
  } = methods;

  const toggleMassOrders = watch("massOrder");

  useEffect(() => {
    if (minCount) setPrevMinCount(minCount);
  }, [minCount]);

  /**
   * Обработка нажатия кнопки MAX
   */
  const handleMax = () => {
    setValue(
      "count",
      Math.floor(balance / quality["price_per_one"] / speedSlider),
    );
  };

  return (
    <>
      {serviceInfo?.name !== "auto_post_views" && (
        <div className="max-sm:w-full">
          <div className="mb-2 block">
            <Label value="Количество" htmlFor="count" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="max-sm:w-full sm:w-[250px]">
              <TextInput
                rightIcon={() => (
                  <>
                    {!toggleMassOrders && (
                      <button
                        className="absolute right-0 z-20 h-[64px] translate-x-[1px] cursor-pointer rounded-r-2xl bg-transparent px-5 py-3 text-gray-600"
                        onClick={handleMax}
                        type="button"
                      >
                        <span className="font-pn-regular text-base">MAX</span>
                      </button>
                    )}
                  </>
                )}
                color={utilColorInputValid("count", errors, dirtyFields)}
                className="w-full rounded-l-xl sm:w-[250px]"
                helpertext={utilHelperText("count", errors)}
                placeholder={`Минимум ${prevMinCount} шт.`}
                autoComplete="off"
                type="number"
                name="count"
                sizing="lg"
                id="count"
                {...register("count")}
              />
            </div>

            {!isMobile && (
              <div className="mt-[15px]">
                {/* Сумма заказа */}
                <ServicesSumOrder />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
