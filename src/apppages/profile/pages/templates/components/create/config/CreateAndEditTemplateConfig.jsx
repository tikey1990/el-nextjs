import { useSelector } from "react-redux";

/**
 * Заголовок страницы создания/редактирования шаблона
 */
export const titlePageCreateOrEdit = () => {
    const templateType = useSelector((state) => state.profileTemplates.template.type);

    return templateType === "create" ? "Добавить шаблон" : "Редактирование шаблона";
};

/**
 * Дефолтные значения для полей формы создания/редактирования шаблона
 */
export const defaultValuesPageCreateOrEdit = () => {
    const templateType = useSelector((state) => state.profileTemplates.template.type);
    const template = useSelector((state) => state.profileTemplates.template);
    const select = useSelector((state) => state.profileTemplates.select);

    const speedPerAdPostMin = select?.option?.find((item) => item.name === "speed_per_ad_post")?.default ?? 1;
    const speedPerPostMin = select?.option?.find((item) => item.name === "speed_per_post")?.default ?? 1;
    const speedSliderMin = select?.option?.find((item) => item.name === "speed_slider")?.default ?? 1;
    const durationSliderMin = select?.option?.find((item) => item.name === "duration_slider")?.default ?? 1;

    return speedPerAdPostMin && templateType?.type === "create"
        ? {
              speed_per_ad_post: speedPerAdPostMin,
              duration_slider: durationSliderMin,
              speed_per_post: speedPerPostMin,
              speed_slider: speedSliderMin,
              name: "",
          }
        : {
              speed_per_ad_post: speedPerAdPostMin,
              duration_slider: durationSliderMin,
              speed_per_post: speedPerPostMin,
              speed_slider: speedSliderMin,
              name: template.name,
          };
};
