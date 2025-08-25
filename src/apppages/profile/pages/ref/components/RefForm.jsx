import { utilColorInputValid, utilHelperText } from "@utils";
import { useChangeRefCodeMutation } from "@features";
import { TextInput, Button } from "flowbite-react";
import { useYupValidationResolver } from "@hooks";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RHFProvider } from "@providers";
import { IconBtnCopy } from "@icons/btn";
import { toast } from "react-toastify";
import React, { useRef } from "react";

import { refCodeSchemeValidation } from "../utils";

/**
 * Компонент формы реферальной системы
 * @returns {JSX.Element}
 * @constructor
 */
export const RefForm = () => {
  // Ref элемента текста, который нужно скопировать
  const textCopyRef = useRef(null);

  /**
   * Получение данных о рефералах
   */
  const { refCode } = useSelector((state) => state.profileRef);

  /**
   * Изменение реферального кода
   */
  const [changeRefCode] = useChangeRefCodeMutation();

  /**
   * Форма
   */
  const resolver = useYupValidationResolver(refCodeSchemeValidation);
  const methods = useForm({ mode: "onChange", resolver });
  const {
    formState: { dirtyFields, errors },
    handleSubmit,
    register,
  } = methods;

  /**
   * Слушатель на копирование текста
   */
  const copyHandle = () => {
    // Создание текстовой области
    const textArea = document.createElement("textarea");
    textArea.value = textCopyRef.current.outerText; // Присваиваем тексту, который нужно скопировать
    textArea.style.position = "fixed"; // Чтобы текстовая область не появлялась на странице
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      // Свойство document.execCommand("copy") копирует содержимое выбранного элемента в буфер обмена
      document.execCommand("copy");

      toast.success("Реферальная ссылка скопирована!");
    } catch (err) {
      toast.error(`Ошибка при копировании реферальной ссылки - ${err}`);
    }

    document.body.removeChild(textArea); // Удаляем текстовую область с документа после копирования
  };

  /**
   * Отправка формы
   */
  const onSubmit = (data) => {
    changeRefCode(data);
  };

  return (
    <div className="flex flex-col gap-10 mb-5 sm:mb-10 w-full max-sm:bg-white max-sm:shadow-content max-sm:px-5 max-sm:py-6 max-sm:rounded-2xl">
      <div className="flex flex-col gap-4">
        <p className="text-gray-600 font-pn-boldit text-[18px] sm:text-[20px]">
          Делись с друзьями своей реферальной ссылкой
        </p>

        <div className="flex flex-row gap-4">
          <p
            className="sm:max-w-[461px] w-full overflow-hidden shadow-input ring-1 ring-[#E8EBF1] overflow-ellipsis whitespace-nowrap rounded-xl bg-white px-4 py-[14px] font-pn-regular text-[16px] text-[#828FA4]"
            ref={textCopyRef}
          >
            https://easyliker.ru/register?ref={refCode}
          </p>

          {/* Кнопка копирования */}
          <Button
            className="h-[52px] w-[52px] rounded-2xl"
            onClick={copyHandle}
            color="primary"
          >
            <IconBtnCopy className="fill-white" />
          </Button>
        </div>
      </div>

      {/* Изменить код: */}
      <div className="flex flex-col gap-5">
        <p className="font-pn-boldit text-[18px] text-gray-600 sm:text-[20px]">
          Изменить код:
          <br className="sm:hidden" />{" "}
          <span className="text-primary-500">{refCode}</span>
        </p>

        <RHFProvider
          className="flex flex-col sm:flex-row gap-4"
          onSubmit={handleSubmit(onSubmit)}
          methods={methods}
        >
          <div className="sm:max-w-[361px] w-full">
            <TextInput
              color={utilColorInputValid("newRefCode", errors, dirtyFields)}
              helpertext={utilHelperText("newRefCode", errors)}
              placeholder="Введите новый код"
              className="w-full"
              name="newRefCode"
              id="newRefCode"
              type="text"
              sizing="lg"
              {...register("newRefCode")}
            />
          </div>

          {/* Кнопка сохранения */}
          <Button color="primary" type="submit" className="" size="sm">
            Сохранить
          </Button>
        </RHFProvider>
      </div>
    </div>
  );
};
