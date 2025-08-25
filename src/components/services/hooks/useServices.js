import { utilServicesCalcCountInMassLinks } from "@utils";
import { useEffect, useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { servicesUtilResetForm } from "@components/services/utils";

export const useSumOrder = () => {
  servicesUtilResetForm();

  const { watch } = useFormContext();
  const formWatchMassOrder = watch()?.massOrder;
  const formWatchCount = Number(watch()?.count);
  const formWatchLink = watch()?.link;
  const formWatchDurationSlider = watch()?.["duration_slider"] ?? 1;

  const formWatchLinksArray = formWatchLink?.split("\n");
  const formWatchLinksArrayFilterSpace = formWatchLinksArray?.filter(
    (elem) => elem?.length > 0,
  );

  const xSumLinks = formWatchMassOrder
    ? (formWatchLinksArrayFilterSpace?.length ?? 1)
    : 1; // Множитель ссылок (зависит от количества)
  const isSumLinksMultiply = xSumLinks > 1; // Больше ли одной ссылки указанно

  /**
   * Получаем данные из store о типах и качествах услуг
   */
  const quality = useSelector((state) => state.services.route.quality);
  const pricePerOne = quality?.["price_per_one"];
  const [prevSum, setPrevSum] = useState(0);
  const [prevPricePerOne, setPricePerOne] = useState(pricePerOne);

  // Сумма заказа
  const sum = useMemo(() => {
    const countInMassLinks = utilServicesCalcCountInMassLinks(
      formWatchLinksArray,
      formWatchCount,
    );

    const calcCountLinks =
      countInMassLinks > 0 ? countInMassLinks : formWatchCount;

    const count = formWatchMassOrder ? calcCountLinks : formWatchCount;

    if (count !== 0 && count) {
      if (xSumLinks === 0)
        return parseFloat(
          (
            count *
            quality?.["price_per_one"] *
            formWatchDurationSlider
          ).toFixed(4),
        );
      return parseFloat(
        (count * quality?.["price_per_one"] * formWatchDurationSlider).toFixed(
          4,
        ),
      );
    } else return 0;
  }, [watch()]);

  useEffect(() => {
    if (!isNaN(sum)) setPrevSum(sum);
  }, [sum]);

  useEffect(() => {
    if (pricePerOne) setPricePerOne(pricePerOne);
  }, [pricePerOne]);

  return {
    speedSlider: formWatchDurationSlider,
    isSumLinksMultiply,
    prevPricePerOne,
    sum: prevSum,
    xSumLinks,
  };
};

export const useServicesFormLinksUpdateState = () => {
  const quality = useSelector((state) => state.services.route.quality);
  const { setValue, watch } = useFormContext();

  const linkField = watch("link");
  const massOrderField = watch("massOrder");
  const linkExample = quality?.["link_example"];

  const [prevLinkExample, setPrevLinkExample] = useState(linkExample);
  const [linkMass, setLinkMass] = useState(null);
  const [linkSingle, setLinkSingle] = useState(null);

  useEffect(() => {
    if (massOrderField) setValue("link", linkMass);
    else setValue("link", linkSingle);
  }, [massOrderField]);

  useEffect(() => {
    if (massOrderField) setLinkMass(linkField);
    else setLinkSingle(linkField);
  }, [linkField]);

  useEffect(() => {
    if (linkExample) setPrevLinkExample(linkExample);
  }, [linkExample]);

  return { prevLinkExample };
};
