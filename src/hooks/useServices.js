"use client";
import {
  speedPerAdPostDefault,
  speedPerPostDefault,
  speedPerAdPostName,
  speedPerPostName,
  sliderDefault,
  selectDefault,
  sliderName,
  selectName,
  slider,
  select,
} from "@config";
import {
  useGetFeesQualitiesMutation,
  useGetServicesQuery,
  setServicesRoute,
  setBannerStep,
} from "@features";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";

/**
 * Хук для определения маршрутам страницы услуги
 */
export const useRouteServices = () => {
  const dispatch = useDispatch();

  /**
   * Получение данных сервисов
   */
  const queryServices = useGetServicesQuery();
  const { isLoading: servicesIsLoading, data: servicesData } = queryServices;

  /**
   * Информация о маршруте
   */
  const pathname = usePathname();

  /**
   * Состояние информации о странице услуги
   */
  const [serviceInfo, setServiceInfo] = useState({});

  // Обработка информации о странице услуги
  useEffect(() => {
    if (!servicesIsLoading) {
      /**
       * Получение соц. сети и категорий из маршрута
       */
      const service = pathname.split("/")[2];
      if (service) dispatch(setBannerStep("second"));
      else dispatch(setBannerStep("first"));

      /**
       * Получение категории из маршрута
       */
      const category = pathname.split("/")[3];

      /**
       * Получение типа из маршрута
       */
      const type = pathname.split("/")[4];

      /**
       * Получение типа из маршрута
       */
      const quality = pathname.split("/")[5] ?? null;

      if (category || type || quality) dispatch(setBannerStep("third"));

      // Получение информации о соц. сети и категории
      const infoService =
        servicesData?.data?.find((elem) => elem.name === service) ?? null;

      // Получение информации о категории соц. сети
      const infoCategory =
        infoService?.categories?.find((elem) => elem.name === category) ?? null;

      // Установка информации о странице услуги
      setServiceInfo({
        ...infoService,
        ...infoCategory,
        quality,
        service,
        type,
      });
    }
  }, [queryServices, pathname]);

  return { serviceInfo };
};

/**
 * Хук для загрузки данных услуги и качества
 */
export const useLoadServices = () => {
  const dispatch = useDispatch();
  const [prevCategoryName, setPrevCategoryName] = useState(null);
  const qualities = useSelector((state) => state.services.route.qualities);

  const { serviceInfo } = useRouteServices();

  /**
   * Получение качества услуги
   */
  const [getFeesQualities, feesQualitiesQuery] = useGetFeesQualitiesMutation();
  const {
    isSuccess: feesQualitiesIsSuccess,
    isLoading: feesQualitiesIsLoading,
    data: feesQualitiesData,
  } = feesQualitiesQuery;

  useEffect(() => {
    if (
      prevCategoryName !== serviceInfo.name &&
      serviceInfo.name &&
      serviceInfo.service !== serviceInfo.name
    ) {
      const type = `${serviceInfo.service}_${serviceInfo.name}`;
      getFeesQualities(type);
      setPrevCategoryName(serviceInfo.name);
    } else if (
      prevCategoryName === serviceInfo.name &&
      serviceInfo.name &&
      serviceInfo.service !== serviceInfo.name
    ) {
      const quality = qualities
        ?.find((elem) => elem.name === serviceInfo.type)
        ?.quality?.find(
          (elem) =>
            elem.name === `${serviceInfo.quality}_quality` ||
            elem.name === `${serviceInfo.quality}` ||
            elem.name === `${serviceInfo.quality}_post`,
        );

      const newServiceInfo = {
        ...serviceInfo,
        type_ru: feesQualitiesData?.data?.qualities?.find(
          (elem) => elem?.name === serviceInfo?.type,
        )?.["name_ru"],
      };

      dispatch(
        setServicesRoute({
          serviceInfo: newServiceInfo,
          qualities: qualities,
          quality: quality,
        }),
      );
    } else {
      dispatch(
        setServicesRoute({
          serviceInfo: serviceInfo,
          qualities: null,
          quality: null,
        }),
      );
      setPrevCategoryName(null);
    }
  }, [serviceInfo]);

  useEffect(() => {
    if (!feesQualitiesIsLoading && feesQualitiesIsSuccess) {
      const quality = feesQualitiesData?.data?.qualities
        ?.find((elem) => elem.name === serviceInfo.type)
        ?.quality?.find(
          (elem) =>
            elem.name === `${serviceInfo.quality}_quality` ||
            elem.name === `${serviceInfo.quality}` ||
            elem.name === `${serviceInfo.quality}_post`,
        );

      const newServiceInfo = {
        ...serviceInfo,
        type_ru: feesQualitiesData?.data?.qualities?.find(
          (elem) => elem?.name === serviceInfo?.type,
        )?.["name_ru"],
      };

      dispatch(
        setServicesRoute({
          qualities: feesQualitiesData?.data?.qualities,
          serviceInfo: newServiceInfo,
          quality: quality,
        }),
      );
    } else {
      dispatch(
        setServicesRoute({
          serviceInfo: serviceInfo,
          qualities: null,
          quality: null,
        }),
      );
    }
  }, [feesQualitiesQuery]);
};

/**
 * Хук для установки значений по умолчанию в форме для автопросмотров
 * @param setValue
 * @param params
 * @param type
 * @param mode
 */
export const useUpdateDefaultValueAuto = (
  setValue,
  params,
  type,
  mode = true,
) => {
  useEffect(() => {
    if (mode) {
      if (speedPerPostDefault(params, type))
        setValue(
          speedPerPostName(params, type),
          speedPerPostDefault(params, type),
        );

      if (speedPerAdPostDefault(params, type))
        setValue(
          speedPerAdPostName(params, type),
          speedPerAdPostDefault(params, type),
        );
    }
  }, [
    speedPerPostDefault(params, type),
    speedPerAdPostDefault(params, type),
    mode,
  ]);
};

/**
 * Хук для установки значений по умолчанию в форме для слайдеров
 * @param setValue
 * @param params
 * @param type
 * @param mode
 */
export const useUpdateDefaultValueSlider = (
  setValue,
  params,
  type,
  mode = true,
) => {
  useEffect(() => {
    if (mode) {
      if (slider(params, type))
        setValue(sliderName(params, type), sliderDefault(params, type));
    }
  }, [slider(params, type), mode]);
};

/**
 * Хук для установки значений по умолчанию в форме для select
 * @param setValue
 * @param params
 * @param type
 * @param mode
 */
export const useUpdateDefaultValueSelect = (
  setValue,
  params,
  type,
  mode = true,
) => {
  useEffect(() => {
    if (mode) {
      if (select(params, type))
        setValue(selectName(params, type), selectDefault(params, type));
    }
  }, [select(params, type), mode]);
};
