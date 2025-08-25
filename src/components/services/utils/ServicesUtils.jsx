import {
  configServicesRuNameCategories,
  configIconsReactionsServices,
  pollVoteAnswersName,
  speedPerAdPostName,
  countPerAdPostName,
  speedPerPostName,
  countPerPostName,
  pollVoteAnswers,
  countPerAdPost,
  countPerPost,
  sliderName,
  selectName,
  sliderMin,
  sliderMax,
  comments,
  slider,
  select,
} from "@config";
import { utilYMSuccessfulOrderCreation, setCookie, getCookie } from "@utils";
import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  Fragment,
} from "react";
import { IconStatusWarn } from "@icons/status/index.js";
import { shallowEqual, useSelector } from "react-redux";
import { setMassOrders } from "@features";
import { Button } from "flowbite-react";
import { useTypeDevice } from "@hooks";
import classNames from "classnames";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { IconRuble } from "@icons";
import * as yup from "yup";

import { classButton, classPrice, classRuble } from "../utils";
import { configServicesInfoQuantity } from "../config";
import { BannerInfo } from "@components/services/components/banner";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Рендер типов категории услуги
 */
export const utilServicesRenderTypes = () => {
  const qualities = useSelector((state) => state.services.route.qualities); // Все качества выбранной услуги
  const typeName = useSelector(
    (state) => state.services.route.serviceInfo?.type,
  ); // Название типа выбранной услуги
  const serviceName = useSelector(
    (state) => state.services.route.serviceInfo?.service,
  ); // Название выбранной соц сети
  const categoryName = useSelector(
    (state) => state.services.route.serviceInfo?.name,
  ); // Название выбранной категории соц сети
  const [prevQualities, setPrevQualities] = useState(qualities);
  const [activeButton, setActiveButton] = useState(typeName);
  const router = useRouter();

  const buttonLink = (elem) =>
    `/services/${serviceName}/${categoryName}/${elem?.name}/${
      categoryName === "auto_post_views" ||
      (categoryName === "post_views" && serviceName === "telegram") ||
      /^stream_/.test(categoryName)
        ? elem.quality[0].name
        : elem.quality[0].name.split("_")[0]
    }`;

  const elements = prevQualities?.map((elem, index) => (
    <Button
      className={classNames(
        "w-full transition-all ease-in duration-100 focus:ring-0 ring-0 max-sm:h-[40px] h-[50px] hover:bg-transparent hover:text-white",
        {
          "ring-[#CEF0FF] ring-0 hover:bg-white hover:text-primary-500 pseudoOutlineServicesTabsSafari focus:ring-0 max-sm:h-[40px] h-[50px]":
            elem.name !== activeButton,
        },
      )}
      color={elem.name === activeButton ? "primary" : "secondary"}
      onClick={() => {
        setActiveButton(elem.name);
        router.push(buttonLink(elem));
      }}
      key={index}
      size="xs"
    >
      <p className="!font-pn-semibold ">{elem?.["name_ru"]}</p>
    </Button>
  ));

  useEffect(() => {
    if (qualities && typeName) {
      setPrevQualities(qualities);
      // Обновление активной кнопки после изменения типа выбранной услуги
      setActiveButton(typeName);
    }
  }, [qualities, typeName]);

  return elements;
};

/**
 * Рендер качества категории услуги
 */
export const utilServicesRenderQualities = () => {
  const qualities = useSelector((state) => state.services.route.qualities); // Все качества выбранной услуги
  const serviceName = useSelector(
    (state) => state.services.route.serviceInfo?.service,
  ); // Название выбранной соц сети
  const categoryName = useSelector(
    (state) => state.services.route.serviceInfo?.name,
  ); // Название выбранной категории соц сети
  const typeName = useSelector(
    (state) => state.services.route.serviceInfo?.type,
  ); // Название типа выбранной услуги
  const nameQuality = useSelector(
    (state) => state.services.route.serviceInfo?.quality,
  ); // Название типа выбранной услуги
  const serviceInfo = useSelector(
    (state) => state.services.route.serviceInfo || {},
  );

  const quality =
    Array.isArray(qualities) &&
    qualities?.find((elem) => elem.name === serviceInfo.type)?.quality;

  const [prevQuality, setPrevQuality] = useState(quality);
  const [activeButton, setActiveButton] = useState(nameQuality);

  useEffect(() => {
    if (quality && qualities.length > 0 && typeName && nameQuality) {
      setPrevQuality(quality);
      setActiveButton(nameQuality);
    }
  }, [qualities, quality, typeName, nameQuality]);

  const replaceDotsWithCommas = (str) => {
    return str.replace(/\./g, ",");
  };
  const router = useRouter();

  return (
    Array.isArray(prevQuality) &&
    prevQuality?.map((elem, index) => {
      const isActive = (elem) =>
        serviceInfo.name === "auto_post_views" ||
        (serviceInfo.name === "post_views" && serviceName === "telegram") ||
        /^stream_/.test(serviceInfo?.name)
          ? elem.name === activeButton
          : elem.name.split("_")[0] === activeButton;

      const isReactions = serviceInfo.name === "reactions";
      const isActiveElem = isActive(elem);
      const countQualitys = prevQuality.length;
      const price = `${elem?.["price_per_one"]}`.replace(/\./g, ",");

      const buttonLink = `/services/${serviceName}/${categoryName}/${typeName}/${
        serviceInfo.name === "auto_post_views" ||
        (serviceInfo.name === "post_views" && serviceName === "telegram") ||
        /^stream_/.test(serviceInfo?.name)
          ? elem.name
          : elem.name.split("_")[0]
      }`;

      const renderPrice = (elem, classPrice) => {
        return (
          <>
            {elem.old_price ? (
              <span className="flex  flex-row max-sm:justify-center sm:ml-auto sm:translate-x-[4px] max-sm:-translate-y-[5.5px]">
                <span
                  className={classnames(
                    "relative flex rounded-l-[35px]",
                    { "bg-[#F0FAFF]": !isActiveElem },
                    { "bg-white": isActiveElem },
                  )}
                >
                  <span className="absolute  right-0 whitespace-nowrap translate-y-[1px] text-gray-300 line-through">
                    <div className="flex text-[10px] items-center font-pn-regular text-gray-500 -translate-x-[5px]">
                      {replaceDotsWithCommas(String(elem.old_price))}

                      <IconRuble className="fill-gray-500 w-[6px] -translate-y-[1px] translate-x-[1px]" />
                    </div>
                  </span>
                  <span className="inline-flex items-center translate-y-1.5 px-[10px] py-[8px] text-[13px] font-pn-semibold text-gray-600 translate-x-[6px]">
                    <span>
                      {replaceDotsWithCommas(String(elem.price_per_one))}
                    </span>
                    <IconRuble className="fill-gray-600 w-[8px]" />
                  </span>
                </span>
                <span className="rounded-r-[35px] text-[10px] font-pn-semibold text-white bg-red-500 flex items-center px-[6px] py-[4px]">
                  -{elem.discount}%
                </span>
              </span>
            ) : (
              <>
                {price !== "0" && (
                  <span className={classPrice(isActiveElem, price)}>
                    <p className="translate-y-[1px]">{price}</p>

                    <span
                      className={classNames(
                        "text text-type-bold translate-y-[0.5px]",
                        { "text-primary-500": isActiveElem },
                        { "text-[#62C2EE]": isActiveElem },
                      )}
                    >
                      <IconRuble className={classRuble(isActiveElem)} />
                    </span>
                  </span>
                )}
              </>
            )}
          </>
        );
      };

      const iconReaction =
        configIconsReactionsServices()?.[`${elem?.["name"]}`]?.icon;

      return (
        <Button
          className={classButton(isActiveElem, countQualitys, isReactions)}
          color={isActiveElem ? "primary" : "secondary"}
          href={buttonLink}
          size="custom"
          key={index}
          as={Link}
        >
          {isReactions ? iconReaction : elem?.["ru_name"]}

          {renderPrice(elem, classPrice)}
        </Button>
      );
    })
  );
};

/**
 * Рендер информации о качестве услуги
 * @returns {*}
 */
export const utilServicesRenderInfos = () => {
  const { isMobile } = useTypeDevice();

  const currentQuality = useSelector(
    (state) => state.services.route.quality,
    shallowEqual,
  )?.["order_subtleties"]?.description; // Текущее качество услуги
  const [prevCurrentQuality, setPrevCurrentQuality] = useState(currentQuality);

  useEffect(() => {
    if (currentQuality) setPrevCurrentQuality(currentQuality);
  }, [currentQuality]);

  const formatTextServiceQualityInfo = useCallback(
    (
      text,
      boldWords = [],
      breakWords = [],
      breakWordsMobile = [],
      isMobile = false,
    ) => {
      const filteredBoldWords = boldWords.filter((word) => text.includes(word));
      const filteredBreakWords = isMobile
        ? breakWordsMobile.filter((word) => text.includes(word))
        : breakWords.filter((word) => text.includes(word));

      const nextBoldWordIndex = Math.min(
        ...filteredBoldWords
          .map((word) => text.indexOf(word))
          .filter((index) => index !== -1),
      );
      const nextBreakWordIndex = Math.min(
        ...filteredBreakWords
          .map((word) => text.indexOf(word))
          .filter((index) => index !== -1),
      );

      if (filteredBoldWords.length === 0 && filteredBreakWords.length === 0) {
        return [
          <span key={filteredBreakWords.length} className="font-pn-boldit">
            {text}
          </span>,
        ];
      } else if (
        filteredBoldWords.length !== 0 &&
        (filteredBreakWords.length === 0 ||
          nextBoldWordIndex < nextBreakWordIndex)
      ) {
        const word = filteredBoldWords?.find(
          (word) => text.indexOf(word) === nextBoldWordIndex,
        );
        const [firstPart, secondPart] = text.split(word);
        return [
          firstPart,
          word,
          ...formatTextServiceQualityInfo(
            secondPart,
            filteredBoldWords,
            filteredBreakWords,
            breakWordsMobile,
            isMobile,
          ),
        ];
      } else {
        const word = filteredBreakWords?.find(
          (word) => text.indexOf(word) === nextBreakWordIndex,
        );
        const [firstPart, secondPart] = text.split(word);
        return [
          firstPart,
          word,
          <br key={filteredBreakWords.length} />,
          ...formatTextServiceQualityInfo(
            secondPart,
            filteredBoldWords,
            filteredBreakWords,
            breakWordsMobile,
            isMobile,
          ),
        ];
      }
    },
    [],
  );

  return useMemo(
    () =>
      prevCurrentQuality?.map((elem, index) => {
        const isHtml = /<\/?[a-z][\s\S]*>/i.test(elem?.text); // Проверка, содержит ли текст HTML

        const formatText = isHtml ? (
          <span dangerouslySetInnerHTML={{ __html: elem?.text || "" }} />
        ) : (
          formatTextServiceQualityInfo(
            elem?.text,
            [
              "Моментальный",
              "Скорость",
              "Без",
              "Гарантия",
              "Списание",
              "Переходы",
              "Старт",
              "Возможно",
              "Быстрый",
              "Удержание",
              "Продвигают",
              "Все зрители",
              "Дроп",
            ],
            [
              "Моментальный",
              "Скорость",
              "Гарантия",
              "Без",
              "Списание",
              "Старт",
              "Возможно",
              "Быстрый",
              "лайки",
              "Переходы",
              "Засчитываются",
              "Удержание",
              "Продвигают",
              "Все зрители",
              "Дроп",
            ],
            ["Переходы"],
            isMobile,
          )
        );

        const isAvailableStreamViewersCount =
          elem?.name === "available_stream_viewers_count";
        const isSmallBannerInfo = elem?.name === "small_banner_info";
        const isBigBannerInfo = elem?.name === "big_banner_info";

        return (
          <Fragment key={index}>
            {!isAvailableStreamViewersCount &&
              !isSmallBannerInfo &&
              !isBigBannerInfo && (
                <div
                  className="flex flex-row-reverse sm:flex-row flex-nowrap items-center max-sm:gap-3 justify-end sm:justify-between w-full xl:w-[calc(50%-6px)] shadow-block rounded-xl p-[5px] pl-4"
                  key={index}
                >
                  <p className="font-pn-regularit text-sm text-gray-600">
                    {formatText}
                  </p>
                  <div className="w-[44px] h-[44px] rounded-xl bg-[#F0FAFF] flex items-center justify-center">
                    {configServicesInfoQuantity[`${elem?.name}`]?.icon}
                  </div>
                </div>
              )}

            {isAvailableStreamViewersCount && (
              <BannerInfo text={<span>Доступно зрителей: {elem?.text}</span>} />
            )}

            {isSmallBannerInfo && (
              <BannerInfo
                text={
                  <div className="flex flex-col gap-2">
                    <span
                      dangerouslySetInnerHTML={{ __html: elem?.text || "" }}
                    />
                  </div>
                }
                icon={
                  <IconStatusWarn className="fill-primary-500 w-[15px] min-w-[16px] text-[16px]" />
                }
              />
            )}
          </Fragment>
        );
      }),
    [prevCurrentQuality, formatTextServiceQualityInfo],
  );
};

/**
 * Схема валидации для формы заказа услуги
 */
export const servicesSchemaValidation = (params, serviceInfo, quality) => {
  const minCount = quality?.["min_count"];

  // Валидация полей по-умолчанию
  const defaultFields = {
    link: yup
      .string()
      .test(
        "test-link",
        `Указанное кол-во в ссылке должно быть не меньше  ${minCount}`,
        (value) => {
          const links = value?.split("\n");

          for (let item of links) {
            const hasSeparator = item.includes(" | ");

            if (hasSeparator) {
              const parts = item.split(" | ");
              const count = parseInt(parts[1]);

              if (!isNaN(count) && count < minCount) {
                return false;
              }
            }
          }

          return true;
        },
      )
      .required("Поле должно быть заполнено!"),
  };

  // Валидация, если не авто просмотры
  if (serviceInfo?.name !== "auto_post_views")
    defaultFields.count = yup
      .number()
      .typeError("Поле должно быть заполнено!")
      .required("Поле должно быть заполнено!")
      .positive("Число должно быть положительным")
      .min(
        params?.["min_count"],
        `Количество не должно быть меньше чем ${params?.["min_count"]}`,
      );
  // Валидация, если есть поле с комментариями
  if (comments(params))
    defaultFields.comments = yup
      .string()
      .required("Поле должно быть заполнено!");
  // Валидация, если есть поле с количеством на обычные посты
  if (countPerPost(params))
    defaultFields[countPerPostName(params)] = yup
      .string()
      .required("Поле должно быть заполнено!");
  if (countPerAdPost(params))
    defaultFields[countPerAdPostName(params)] = yup
      .string()
      .required("Поле должно быть заполнено!");
  // Валидация, если есть поле с количеством на рекламные посты
  if (pollVoteAnswers(params))
    defaultFields[pollVoteAnswersName(params)] = yup
      .string()
      .required("Поле должно быть заполнено!");
  // Валидация, если есть поле с удержанием на видео
  if (slider(params))
    defaultFields[sliderName(params)] = yup
      .number()
      .required("Поле должно быть заполнено!")
      .min(
        sliderMin(params),
        `Удержание не должно быть больше чем ${sliderMin(params)}`,
      )
      .max(
        sliderMax(params),
        `Удержание не должно быть меньше чем ${sliderMax(params)}`,
      );

  return yup.object({
    ...defaultFields,
  });
};

/**
 * Утилита обработки отправки формы
 */
export const utilServicesFormSubmit = (
  data,
  createOrder,
  dispatch,
  isAuth,
  serviceInfo,
  quality,
  massOrders,
) => {
  const links = data?.link.split("\n"); // Массив ссылок на заказ
  const source = data?.massOrder ? "massorders" : "site"; // Тип заказа
  const isNotEmpty = massOrders?.length > 0; // Есть ли массовые заказы

  /**
   * Поле options
   * @returns {{[p: string]: *}}
   */
  const option = () => {
    let result;

    // Если есть комментарии
    if (comments(quality) && data.comments) {
      if (`${serviceInfo?.name}`.includes("auto_"))
        result = [`${data.comments}`];
      else result = `${data.comments}`;
    }
    // Если есть номер голосования
    else if (
      pollVoteAnswers(quality)?.name &&
      data[pollVoteAnswers(quality)?.name]
    ) {
      if (`${serviceInfo?.name}`.includes("auto_"))
        result = [data[pollVoteAnswers(quality).name]];
      else result = data[pollVoteAnswers(quality).name];
    }
    // Если есть слайдер
    else if (slider(quality) && data[sliderName(quality)]) {
      if (`${serviceInfo?.name}`.includes("auto_"))
        result = [data[sliderName(quality)]];
      else result = data[sliderName(quality)];
    }
    // Если есть select
    else if (select(quality) && data[selectName(quality)]) {
      if (`${serviceInfo?.name}`.includes("auto_"))
        result = [data[selectName(quality)]];
      else result = data[selectName(quality)];
    }
    // Если авто просмотры
    else if (serviceInfo?.name === "auto_post_views")
      result = JSON.stringify({
        [`${countPerAdPostName(quality)}`]: data[countPerAdPostName(quality)],
        [`${speedPerAdPostName(quality)}`]: data[speedPerAdPostName(quality)],
        [`${countPerPostName(quality)}`]: data[countPerPostName(quality)],
        [`${speedPerPostName(quality)}`]: data[speedPerPostName(quality)],
      });
    else result = [""];

    // Если результат является массивом, удаляем пустые строки
    if (Array.isArray(result)) {
      result = result.filter((item) => item.trim() !== "");
    }

    // Если результат является строкой, разделяем его на элементы с учетом новых строк и удаляем пустые
    if (typeof result === "string") {
      result = result
        .split("\n")
        .filter((line) => line.trim() !== "")
        .join("\n");
    }

    return result;
  };

  const speed =
    serviceInfo?.service === "telegram" && data[sliderName(quality)]
      ? data[sliderName(quality)]
      : 0;

  const count =
    serviceInfo?.name === "auto_post_views" ? undefined : Number(data.count);

  // Данные дял отправки формы
  const orderData = {
    quality: `${serviceInfo.type}_${quality.name}`,
    website: serviceInfo.service,
    type: serviceInfo.name,
    option: option(),
    source: source,
    count: count,
    speed: speed,
    link: links,
  };

  // Если массовые заказы
  if (source === "massorders") {
    const idMassOrder = uuidv4();

    // Преобразовываем данные с формы в массив заказов
    // Информация о заказах
    const data = orderData.link
      .map((elem) => {
        const idOrder = uuidv4();

        const isSeparatorPresent = elem?.includes(" | ");
        const countLastElem = elem?.split(" | ")[1];
        const notEmptySeparatorPresentValue = countLastElem?.trim().length > 0;
        const isSeparator = isSeparatorPresent && notEmptySeparatorPresentValue;
        const countLink = isSeparator ? countLastElem : orderData?.count;
        const link = isSeparatorPresent ? elem?.split(" | ")[0] : elem;

        const price = (quality?.["price_per_one"] * countLink).toFixed(2);

        return {
          ...orderData,
          errorMessage: null,
          status: "active",
          count: countLink,
          currBal: null,
          price: price,
          id: idOrder,
          newId: null,
          link,
        };
      })
      .filter((item) => item.link.trim().length > 0);

    // Информация о массовом заказе
    const newOrderData = {
      type: configServicesRuNameCategories?.[`${orderData?.type}`],
      isOpenedFirstOrder: isNotEmpty ? undefined : false,
      price_per_one: quality?.price_per_one,
      countAllOrders: data?.length,
      type_ru: serviceInfo.type_ru,
      ru_name: serviceInfo.ru_name,
      website: orderData.website,
      quality: quality?.ru_name,
      id: `${idMassOrder}`,
      status: "active",
      data: data,
    };

    // Кидаем в стор массовый заказ
    dispatch(setMassOrders(newOrderData));
  }
  // Если одиночный заказ
  else {
    const resultOrderData = {
      ...orderData,
      link: data?.link,
    };

    // Создаем одиночный заказ
    createOrder(resultOrderData).then((res) => {
      if (
        resultOrderData.website === "youtube" &&
        resultOrderData.type === "views" &&
        resultOrderData.quality.includes("offers_") &&
        !getCookie("is_alert_n1_done") &&
        res.data !== undefined
      ) {
        setCookie("is_alert_n1_done", "true");
      } else if (res.data !== undefined) {
        utilYMSuccessfulOrderCreation(res?.data?.data?.price);
      }
    });
  }
};
