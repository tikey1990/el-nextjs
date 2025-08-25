"use client";
import { DecoratorIntersectionObserver } from "@decorators";
import { useIntersectionObserveElements } from "@hooks";
import React from "react";

import {
  MethodsApiGenerator,
  ApiDecodingServices,
  CallApiMethod,
  ExampleApi,
  ApiHeading,
  ApiKey,
} from "@apppages/profile/pages/api/components";
import { classDecorators } from "@apppages/profile/pages/api/utils";
import { configApiDocs } from "@apppages/profile/pages/api/config";

/**
 * Страница API
 * @returns {JSX.Element}
 * @constructor
 */
const Api = () => {
  const { currentSection, register } = useIntersectionObserveElements();

  return (
    <div className="w-full flex h-auto z-[100] flex-row gap-6">
      <div className="flex flex-col gap-16 w-full sm:gap-6">
        {/* Ваш API ключ */}
        <DecoratorIntersectionObserver
          className={classDecorators}
          name="Ваш API ключ"
          register={register}
        >
          <ApiKey name="Ваш API ключ" />

          {/* Вызов методов API */}
          <DecoratorIntersectionObserver
            name="Вызов методов API"
            register={register}
            className=""
          >
            <CallApiMethod name="Вызов методов API" />
          </DecoratorIntersectionObserver>
        </DecoratorIntersectionObserver>

        {/* Пример API */}
        <DecoratorIntersectionObserver register={register} name="Пример API">
          <ExampleApi name="Пример API" />
        </DecoratorIntersectionObserver>

        {/* Метод getBalance */}
        <MethodsApiGenerator
          successResponse={configApiDocs.getBalance.successResponse}
          dataParamsQuery={configApiDocs.getBalance.dataParamsQuery}
          dataErrors={configApiDocs.getBalance.dataErrors}
          subtitle={configApiDocs.getBalance.subtitle}
          name={configApiDocs.getBalance.name}
          register={register}
        />

        {/* Метод getServiceVersion */}
        <MethodsApiGenerator
          successResponse={configApiDocs.getServiceVersion.successResponse}
          dataParamsQuery={configApiDocs.getServiceVersion.dataParamsQuery}
          dataErrors={configApiDocs.getServiceVersion.dataErrors}
          subtitle={configApiDocs.getServiceVersion.subtitle}
          name={configApiDocs.getServiceVersion.name}
          register={register}
        />

        {/* Метод getServices */}
        <MethodsApiGenerator
          successResponse={configApiDocs.getServices.successResponse}
          dataParamsQuery={configApiDocs.getServices.dataParamsQuery}
          dataErrors={configApiDocs.getServices.dataErrors}
          subtitle={configApiDocs.getServices.subtitle}
          name={configApiDocs.getServices.name}
          register={register}
        />

        {/* Расшифровка услуг */}
        <div className={classDecorators}>
          <ApiDecodingServices name="Расшифровка услуг" />
        </div>

        {/* Метод createTask */}
        <MethodsApiGenerator
          successResponse={configApiDocs.createTask.successResponse}
          dataParamsQuery={configApiDocs.createTask.dataParamsQuery}
          dataErrors={configApiDocs.createTask.dataErrors}
          subtitle={configApiDocs.createTask.subtitle}
          name={configApiDocs.createTask.name}
          register={register}
        />

        {/* Метод getTasks */}
        <MethodsApiGenerator
          successResponse={configApiDocs.getTasks.successResponse}
          dataParamsQuery={configApiDocs.getTasks.dataParamsQuery}
          dataErrors={configApiDocs.getTasks.dataErrors}
          subtitle={configApiDocs.getTasks.subtitle}
          name={configApiDocs.getTasks.name}
          register={register}
        />

        {/* Метод getPaymentMethods */}
        <MethodsApiGenerator
          successResponse={configApiDocs.getPaymentMethods.successResponse}
          dataParamsQuery={configApiDocs.getPaymentMethods.dataParamsQuery}
          dataErrors={configApiDocs.getPaymentMethods.dataErrors}
          subtitle={configApiDocs.getPaymentMethods.subtitle}
          name={configApiDocs.getPaymentMethods.name}
          register={register}
        />

        {/* Метод createPayment */}
        <MethodsApiGenerator
          successResponse={configApiDocs.createPayment.successResponse}
          dataParamsQuery={configApiDocs.createPayment.dataParamsQuery}
          dataErrors={configApiDocs.createPayment.dataErrors}
          subtitle={configApiDocs.createPayment.subtitle}
          name={configApiDocs.createPayment.name}
          register={register}
        />

        {/* Метод getPayment */}
        <MethodsApiGenerator
          successResponse={configApiDocs.getPayment.successResponse}
          dataParamsQuery={configApiDocs.getPayment.dataParamsQuery}
          dataErrors={configApiDocs.getPayment.dataErrors}
          subtitle={configApiDocs.getPayment.subtitle}
          name={configApiDocs.getPayment.name}
          register={register}
        />

        {/* Метод getProfileData */}
        <MethodsApiGenerator
          successResponse={configApiDocs.getProfileData.successResponse}
          dataParamsQuery={configApiDocs.getProfileData.dataParamsQuery}
          dataErrors={configApiDocs.getProfileData.dataErrors}
          subtitle={configApiDocs.getProfileData.subtitle}
          name={configApiDocs.getProfileData.name}
          register={register}
        />
      </div>

      {/* Оглавление документации */}
      <ApiHeading currentSection={currentSection} />
    </div>
  );
};

export default Api;
