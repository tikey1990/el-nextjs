"use client";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Label } from "@components";
import { IconStatusError } from "@icons/status";
import { DevTool } from "@hookform/devtools";
import PropTypes from "prop-types";
import * as Yup from "yup";

/**
 * Компонент Form для отображения формы с поддержкой валидации и управления состоянием полей.
 *
 * @param {string} name - Название формы
 * @param {boolean | string} serverError - Ошибка с сервера
 * @param {Function} onSubmit - Функция-обработчик, вызываемая при отправке формы.
 * @param {any} buttonSubmitComponent - Кнопка на отправку формы
 * @param {Object} formProps - Дополнительные свойства, которые можно передать компоненту form.
 * @param {Object} defaultValues - Объект со значениями полей по умолчанию.
 * @param {boolean} showDevTools - Флаг для показа React Hook Form DevTools.
 * @param {Object} errorMessages - Флаг для отображения сообщений об ошибке.
 * @param {Object[]} formConfig - Массив объектов, описывающих конфигурацию полей формы.
 */
export const Form = ({
  buttonSubmit: buttonSubmitComponent,
  errorMessages,
  defaultValues,
  showDevTools,
  serverError,
  formConfig,
  formProps,
  onSubmit,
  name,
}) => {
  /**
   * Схема валидации
   */
  const schema = Yup.object().shape(
    formConfig.reduce((accumulator, { validation, name }) => {
      if (validation) {
        accumulator[name] = validation;
      }
      return accumulator;
    }, {}),
  );

  /**
   * Методы RHF
   */
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues,
  });
  const { handleSubmit, register, control, errors } = methods;

  const fieldArrays = formConfig
    .filter(({ type }) => type === "array")
    .map(({ name }) => ({
      useFieldArray: useFieldArray({ control, name }),
      name,
    }));

  /**
   * Рекурсивная функция для рендеринга полей формы на основе конфигурации.
   * @param {Object} fieldConfig - Конфигурация поля формы.
   * @param {Function} register - Функция регистрации поля в react-hook-form.
   * @param {Object[]} fieldArrays - Массив объектов для работы с полями типа "array".
   * @param {string} key - Ключ элемента в списке.
   * @returns {JSX.Element} - Элемент поля формы.
   */
  const renderField = (fieldConfig, register, fieldArrays, key) => {
    const {
      component: { props: fieldComponentProps, element: fieldComponent },
      RemoveButtonComponent,
      AddButtonComponent,
      fieldsConfig,
      label,
      type,
      name,
    } = fieldConfig;

    /**
     * Label
     */
    // Class label
    const labelClass = `form__label ${name}`;
    // Рендер-функция элемента label
    const renderLabel = label ? (
      label(labelClass)
    ) : (
      <Label className={labelClass} />
    );

    /**
     * Рендер-функция сообщения об ошибке
     */
    const renderErrorMessage = errorMessages.show && (
      <ErrorMessage
        render={({ message: textMessage }) => (
          <>
            {errorMessages.message !== false ? (
              <>{errorMessages.message(textMessage)}</>
            ) : (
              <p className="message-error text text-color-black">
                <IconStatusError /> {textMessage}
              </p>
            )}
          </>
        )}
        errors={errors}
        name={name}
      />
    );

    switch (type) {
      // Обработка полей типа "array"
      case "array": {
        const { append, fields, remove } =
          type === "array" &&
          fieldArrays.find(({ name: arrayName }) => arrayName === name);

        return (
          <div key={key}>
            {/* Label */}
            {renderLabel}

            {fields.map((item, index) => (
              <div key={item.id}>
                {fieldsConfig.map((field, idx) =>
                  renderField(
                    { ...field, name: `${name}[${index}].${field.name}` },
                    register,
                    fieldArrays,
                    `${name}[${index}].${field.name}-${idx}`,
                  ),
                )}

                {/* Кнопка удаления элемента из массива */}
                {RemoveButtonComponent ? (
                  <RemoveButtonComponent onClick={() => remove(index)} />
                ) : (
                  <button onClick={() => remove(index)} type="button">
                    Remove
                  </button>
                )}
              </div>
            ))}

            {/* Кнопка добавления элемента в массив */}
            {AddButtonComponent ? (
              <AddButtonComponent onClick={() => append({})} />
            ) : (
              <button onClick={() => append({})} type="button">
                Add
              </button>
            )}

            {/* Отображение сообщения об ошибке */}
            {renderErrorMessage}
          </div>
        );
      }

      // Обработка остальных типов полей
      default: {
        const renderInput = fieldComponent ? (
          fieldComponent({
            className: `form-elem form-elem-${name} ${fieldComponentProps.className}`,
            fieldComponentProps: fieldComponentProps,
            name: name,
          })
        ) : (
          <Input
            {...fieldComponentProps}
            className={`form-elem form-elem-${name} ${fieldComponentProps.className}`}
            name={name}
            id={name}
          />
        );

        return (
          <div className={`form__wrapper ${name}`} key={key}>
            {renderLabel}
            {renderInput}
            {renderErrorMessage}
          </div>
        );
      }
    }
  };

  return (
    <FormProvider {...methods}>
      {/* Ошибка сервера */}
      {serverError && <p className="form-server-error">{serverError}</p>}

      <form
        className={`form form-${name} ${formProps?.className}`}
        onSubmit={handleSubmit(onSubmit)}
        {...formProps}
      >
        {/* Генерация формы */}
        {formConfig.map((fieldConfig, index) =>
          renderField(fieldConfig, register, fieldArrays, `field-${index}`),
        )}

        {/* Submit */}
        {buttonSubmitComponent ? (
          buttonSubmitComponent
        ) : (
          <button type="submit">Отправить</button>
        )}

        {/* Показывать React Hook Form DevTools */}
        {import.meta.env.DEV && showDevTools && (
          <DevTool placement="top-right" control={control} />
        )}
      </form>
    </FormProvider>
  );
};

Form.propTypes = {
  /**
   * (обязательный): Массив объектов, описывающих конфигурацию полей формы. Каждый объект должен содержать следующие свойства:
   */
  formConfig: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * (опционально): Массив объектов, описывающих конфигурацию полей внутри массива (для типа "array").
       */
      fieldsConfig: PropTypes.arrayOf(
        PropTypes.shape({
          component: PropTypes.shape({
            props: PropTypes.object,
            element: PropTypes.any,
          }),
          type: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          validation: PropTypes.any,
          label: PropTypes.element,
        }),
      ),

      /**
       * (опционально): Конфигурация компонента для отображения поля.
       */
      component: PropTypes.shape({
        props: PropTypes.object,
        element: PropTypes.any,
      }),

      /**
       * (опционально): Кастомный компонент для кнопки удаления элемента из массива (для типа "array").
       */
      RemoveButtonComponent: PropTypes.element,

      /**
       * (опционально): Кастомный компонент для кнопки добавления элемента в массив (для типа "array").
       */
      AddButtonComponent: PropTypes.element,

      /**
       * (обязательный): Тип поля (например, "array", "input", и т.д.).
       */
      type: PropTypes.string.isRequired,

      /**
       * (обязательный): Имя поля.
       */
      name: PropTypes.string.isRequired,

      /**
       *  (опционально): Метка поля.
       */
      label: PropTypes.any,
    }),
  ).isRequired,

  /**
   * (опционально): Настройка отображения сообщений об ошибке.
   */
  errorMessages: PropTypes.shape({
    message: PropTypes.any,
    show: PropTypes.bool,
  }),

  /**
   * (обязательный): Функция-обработчик, вызываемая при отправке формы.
   */
  onSubmit: PropTypes.func.isRequired,

  /**
   * (опционально): Объект со значениями полей по умолчанию.
   */
  defaultValues: PropTypes.object,

  /**
   * (опционально): Кастомный компонент кнопки отправки формы
   */
  buttonSubmit: PropTypes.element,

  /**
   * (опционально): Генерация dev tools к форме
   */
  showDevTools: PropTypes.bool,

  /**
   * (опционально): Дополнительные свойства, которые можно передать компоненту form (например, className, style, и т.д.).
   */
  formProps: PropTypes.object,

  /**
   * (опционально): Ошибка с сервера
   */
  serverError: PropTypes.any,

  /**
   * (опционально): Название формы
   */
  name: PropTypes.string,
};

Form.defaultProps = {
  buttonSubmit: (
    <Button
      className="btn-submit"
      aria-label="Отправить"
      variant="primary"
      type="submit"
      size="medium"
    />
  ),
  errorMessages: {
    message: false,
    show: true,
  },
  serverError: false,
  showDevTools: true,
};
