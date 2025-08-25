import {
  useChangeTemplateNameMutation,
  profileTemplatesApi,
  setCreateTemplate,
} from "@features";
import { utilColorInputValid, utilHelperText } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { TextInput, Label } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import debounce from "lodash.debounce";

/**
 * Компонент названия шаблона
 * @returns {JSX.Element}
 * @constructor
 */
export const CreateAndEditTemplateName = () => {
  const dispatch = useDispatch();
  const template = useSelector((state) => state.profileTemplates.template);
  const isSaveNewName = template.services.length > 0;
  const [prevName, setPrevName] = useState(null);
  const select = useSelector((state) => state.profileTemplates.select);

  const [isInitialRender, setIsInitialRender] = useState(true);

  const {
    formState: { dirtyFields, errors },
    register,
    watch,
  } = useFormContext();
  const nameValue = watch("name");

  const [changeTemplateName] = useChangeTemplateNameMutation();

  const saveTemplateDebounced = useRef(
    debounce((name, currentTemplate) => {
      if (currentTemplate.id !== undefined) {
        changeTemplateName({ id: currentTemplate.id, name: name }).then(() => {
          dispatch(setCreateTemplate({ id: currentTemplate.id, name: name }));
          dispatch(profileTemplatesApi.util.invalidateTags(["Templates"]));
        });
      }
    }, 700),
  ).current;

  useEffect(() => {
    // Проверка, чтобы избежать вызова функции на первом рендере
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    if (template?.type === "create") setPrevName(nameValue);

    // Проверка, было ли изменено поле 'name'
    if (
      dirtyFields.name &&
      isSaveNewName &&
      prevName !== nameValue &&
      template?.type === "edit"
    ) {
      saveTemplateDebounced(nameValue, template, select);

      setPrevName(nameValue);
    }
  }, [nameValue, dirtyFields.name, saveTemplateDebounced, template, select]);

  return (
    <div className="max-sm:w-full">
      <div className="mb-3 block">
        <Label value="Название шаблона" htmlFor="name" />
      </div>
      <TextInput
        color={utilColorInputValid("name", errors, dirtyFields)}
        helpertext={utilHelperText("name", errors)}
        placeholder="Введите название"
        autoComplete="off"
        className="w-full"
        type="text"
        sizing="lg"
        name="name"
        id="name"
        {...register("name")}
      />
    </div>
  );
};
