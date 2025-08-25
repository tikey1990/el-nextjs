import { utilColorInputValid, utilHelperText } from "@utils";
import { TextInput, Textarea, Label } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import { useServicesFormLinksUpdateState } from "@components/services/hooks";

/**
 * Компонент ссылок на заказы
 * @returns {JSX.Element}
 * @constructor
 */
export const ServicesFormLinks = () => {
  /**
   * Форма
   */
  const methods = useFormContext();
  const {
    formState: { dirtyFields, errors },
    getValues,
    register,
  } = methods;
  const isMassorder = getValues().massOrder;
  const labelText = isMassorder ? "Ссылки на заказы" : "Ссылка на заказ";

  const { prevLinkExample } = useServicesFormLinksUpdateState();

  const renderLinksComponent = () => (
    <>
      {isMassorder ? (
        <Textarea
          placeholder={`Укажите список ссылок, каждая ссылка с новой строки
Вы можете указать разное количество для каждой ссылки
Пример ${prevLinkExample}.. | 200`}
          color={utilColorInputValid("link", errors, dirtyFields)}
          helpertext={utilHelperText("link", errors)}
          className="h-[155px] w-full"
          autoComplete="off"
          name="link"
          sizing="lg"
          id="link"
          {...register("link")}
        />
      ) : (
        <TextInput
          color={utilColorInputValid("link", errors, dirtyFields)}
          placeholder={`Пример: ${prevLinkExample}..`}
          helpertext={utilHelperText("link", errors)}
          className="w-full sm:w-[250px]"
          autoComplete="off"
          sizing="lg"
          name="link"
          id="link"
          {...register("link")}
        />
      )}
    </>
  );

  return (
    <div className="max-sm:w-full">
      <div className="mb-2 block">
        <Label value={labelText} htmlFor="link" />
      </div>

      {renderLinksComponent()}
    </div>
  );
};
