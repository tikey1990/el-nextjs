import {
    configIconsReactionsServices,
    pollVoteAnswersName,
    countPerAdPostName,
    countPerAdPostMin,
    countPerPostName,
    pollVoteAnswers,
    countPerPostMin,
    servicesConfig,
    countPerAdPost,
    countPerPost,
    sliderName,
    sliderMin,
    sliderMax,
    comments,
    slider,
} from "@config";
import { setDeleteSelectTemplate, profileTemplatesApi, setCreateTemplate } from "@features";
import { utilFormatNumberWithSpaces } from "@utils";
import { IconRuble } from "@icons/index.js";
import { useSelector } from "react-redux";
import classnames from "classnames";
import * as yup from "yup";

import { IconTemplatesDelete, IconTemplatesEdit } from "../../../icons";

/**
 * Схема валидации формы создания или редактирования шаблона
 */
export const createOrEditTemplateSchemaValidation = () => {
    const select = useSelector((state) => state.profileTemplates.select);

    // Валидация полей по-умолчанию
    const defaultFields = {
        name: yup.string().required("Поле должно быть заполнено!"),
    };

    // Валидация, если не авто просмотры
    if (select?.category?.name !== "auto_post_views")
        defaultFields.count = yup
            .number()
            .typeError("Поле должно быть заполнено!")
            .required("Поле должно быть заполнено!")
            .positive("Число должно быть положительным")
            .min(select?.["min_count"], `Количество не должно быть меньше чем ${select?.["min_count"]}`);

    // Валидация, если есть поле с комментариями
    if (comments(select?.option, "templates")) defaultFields.comments = yup.string().required("Поле должно быть заполнено!");

    // Валидация, если есть поле с количеством на обычные посты
    if (countPerPost(select?.option, "templates"))
        defaultFields[countPerPostName(select?.option, "templates")] = yup
            .number()
            .required("Поле должно быть заполнено!")
            .typeError("Поле должно быть заполнено!")
            .min(
                countPerPostMin(select?.option, "templates"),
                `Количество не должно быть меньше чем ${countPerPostMin(select?.option, "templates")}`
            );

    // Валидация, если есть поле с количеством на рекламные посты
    if (countPerAdPost(select?.option, "templates"))
        defaultFields[countPerAdPostName(select?.option, "templates")] = yup
            .number()
            .required("Поле должно быть заполнено!")
            .typeError("Поле должно быть заполнено!")
            .min(
                countPerAdPostMin(select?.option, "templates"),
                `Количество не должно быть меньше чем ${countPerAdPostMin(select?.option, "templates")}`
            );

    // Валидация, если есть поле с количеством на рекламные посты
    if (pollVoteAnswers(select?.option, "templates"))
        defaultFields[pollVoteAnswersName(select?.option, "templates")] = yup.string().required("Поле должно быть заполнено!");

    // Валидация, если есть поле с удержанием на видео
    if (slider(select?.option, "templates"))
        defaultFields[sliderName(select?.option, "templates")] = yup
            .number()
            .required("Поле должно быть заполнено!")
            .min(sliderMin(select?.option, "templates"), `Удержание не должно быть больше чем ${sliderMin(select?.option, "templates")}`)
            .max(sliderMax(select?.option, "templates"), `Удержание не должно быть меньше чем ${sliderMax(select?.option, "templates")}`);

    return yup.object({
        ...defaultFields,
    });
};

/**
 * Слушатель отправки формы создания или редактирования шаблона
 */
export const handleSubmitCreateOrEditTemplate = (
    data,
    saveTemplate,
    template,
    select,
    serviceTemplate,
    dispatch,
    reset,
    formState,
    deleteSelect
) => {
    const isToggleMode = template.services.length === 0;

    if (deleteSelect === null) {
        const createData = {
            ...template,
            services: isToggleMode
                ? [...utilTransformResponseAddService(select, data)]
                : [...utilTransformServices(template.services), ...utilTransformResponseAddService(select, data)],
            id: isToggleMode ? null : template.id,
            service: serviceTemplate,
            price_per_one: undefined,
            total_price: undefined,
            name: data.name,
        };

        saveTemplate({
            data: JSON.stringify(createData),
        }).then((res) => {
            const resData = res?.data?.data?.["template_data"];

            dispatch(setCreateTemplate({ ...resData, type: "edit" }));
            dispatch(profileTemplatesApi.util.invalidateTags(["getWebsiteDetailedServices"]));

            reset({
                ...formState.defaultValues, // Сбрасываем все поля до значений по умолчанию
                name: data.name, // Сохраняем текущее значение для одного поля
                count: null,
            });
        });
    } else {
        const editData = template.services.map((elem) => {
            if (elem.uuid === deleteSelect.uuid) {
                return {
                    ...elem,
                    option: elem.option.map((item) => {
                        return {
                            ...item,
                            data: `${elem?.category.name}`.includes("auto_") ? Number(data[item.name]) : data[item.name],
                        };
                    }),
                };
            } else {
                return elem;
            }
        });

        const createData = {
            ...template,
            services: [...utilTransformServices(editData, "edit")],
            id: isToggleMode ? null : template.id,
            price_per_one: undefined,
            service: serviceTemplate,
            total_price: undefined,
            name: data.name,
            type: undefined,
        };

        saveTemplate({
            data: JSON.stringify(createData),
        }).then((res) => {
            const resData = res?.data?.data?.["template_data"];
            const dispatchCreateTemplateData = {
                ...resData,
                type: "edit",
            };

            dispatch(setCreateTemplate(dispatchCreateTemplateData));
            dispatch(setDeleteSelectTemplate(null));
            dispatch(profileTemplatesApi.util.invalidateTags(["getWebsiteDetailedServices"]));

            reset({
                ...formState.defaultValues, // Сбрасываем все поля до значений по умолчанию
                name: data.name, // Сохраняем текущее значение для одного поля
                count: null,
            });
        });
    }
};

/**
 * Утилита для отображения сервисов в форме создания или редактирования шаблона
 * @returns {unknown[]}
 */
export const utilRenderServicesCreateOrEditTemplate = (services, isMobile, serviceName, handleDeleteService, handleEditService) => {
    return (
        Array.isArray(services) &&
        services?.map((elem, index) => {
            const {
                category: { ru_name: categoryRuName, name: categoryName },
                quality: { ru_name: qualityRuName },
                type: { ru_name: typeRuName },
                total_price,
                count,
                uuid,
            } = elem;
            const iconService = !isMobile ? servicesConfig?.[`${serviceName}`]?.icon : servicesConfig?.[`${serviceName}`]?.iconNotSocial;
            const bgService = servicesConfig?.[`${serviceName}`]?.bg;
            const classIcon = classnames("max-sm:w-[20px] max-sm:flex max-sm:items-center max-sm:justify-center max-sm:rounded-[8px]", {
                [`${bgService}`]: isMobile,
            });
            const isCategoryNameAutoPostViews = `${categoryName}`.includes("auto_");

            const isReactions = categoryName === "reactions";
            const iconReaction = configIconsReactionsServices({ className: "w-4 h-4" })?.[`${qualityRuName}`]?.icon;

            return (
                <div className="flex py-3 border-b w-full items-center max-sm:items-stretch sm:gap-4 gap-3 border-gray-200" key={uuid}>
                    {/* Иконка */}
                    <div className={classIcon}>{iconService}</div>

                    <div className="flex items-center w-full max-sm:gap-2 max-sm:flex-row max-sm:items-start max-sm:flex-wrap max-sm:justify-between">
                        {/* Характеристики */}
                        <div className="flex items-center max-sm:flex-wrap sm:gap-2 max-sm:gap-x-1 max-sm:w-[70%]">
                            <p className="text-sm sm:text-[16px] font-pn-semibold text-gray-600">{categoryRuName}</p>
                            <div className="w-[3px] h-[3px] rounded-full bg-gray-200"></div>
                            <p className="text-sm sm:text-[16px] font-pn-regular text-gray-500">{typeRuName}</p>
                            <div className="w-[3px] h-[3px] rounded-full bg-gray-200"></div>
                            <p className="text-sm sm:text-[16px] font-pn-regular text-gray-500 max-sm:w-[50%]">
                                {isReactions ? iconReaction : qualityRuName}
                            </p>
                        </div>

                        {/* Количество и цена */}
                        <div className="flex ml-auto sm:gap-3 max-sm:flex-col max-sm:items-end">
                            {!isCategoryNameAutoPostViews && (
                                <>
                                    <p className="text-sm sm:text-[16px] font-pn-regular text-gray-500">
                                        x {utilFormatNumberWithSpaces(`${count}`)}
                                    </p>
                                    <p className="text-sm sm:text-[16px] font-pn-semibold text-gray-600 inline-flex sm:justify-end items-center gap-0.5 sm:w-[130px]">
                                        {utilFormatNumberWithSpaces(`${total_price}`, true)}
                                        <IconRuble className="fill-gray-600 w-[10px] h-[10px] -translate-y-[1px]" />
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Кнопки */}
                        <div className="flex sm:ml-5 sm:gap-5 max-sm:w-full">
                            <div
                                className="max-sm:ml-auto flex gap-3 items-center max-sm:order-2 cursor-pointer"
                                onClick={() => handleEditService(elem)}
                            >
                                <p className="sm:hidden text-gray-500 font-pn-regular text-sm">Редактировать</p>

                                <IconTemplatesEdit className="fill-gray-500 w-[16px] h-[16px]" />
                            </div>
                            <div className="cursor-pointer flex gap-3 items-center" onClick={() => handleDeleteService(index)}>
                                <IconTemplatesDelete className="fill-red-500 w-[16px] h-[16px]" />

                                <p className="sm:hidden text-red-500 font-pn-regular text-sm">Удалить</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    );
};

/**
 * Утилита для удаления полей option в сервисах
 * @param services
 * @param type
 * @returns {unknown[]}
 */
export const utilTransformServices = (services, type = "createAndEdit") =>
    services.map((item) => ({
        option: item.option.map(({ type: typeItem, value, data, name }) => {
            let processedData;
            if (type === "createAndEdit") {
                processedData = value ?? data;
            } else {
                if (typeItem === "slider") {
                    processedData = Number(data ?? value);
                } else {
                    processedData = data ?? value;
                }
            }

            return {
                data: processedData,
                name,
            };
        }),
        category: item.category.name,
        quality: item.quality.name,
        type: item.type.name,
    }));

/**
 * Утилита для добавления полей option в сервис
 * @param select
 * @param data
 * @returns {[{category: *, type: *, option: (*|*[]), quality: *}]}
 */
export const utilTransformResponseAddService = (select, data) => {
    const isCategoryNameAutoPostViews = `${select?.category?.name}`.includes("auto_");
    console.log(data);

    const option =
        (Array.isArray(select.option) &&
            select.option?.map((opt) => {
                if (opt.name === "comments")
                    return {
                        data: isCategoryNameAutoPostViews && opt.name === "count" ? 10 : data[opt.name],
                        name: opt.name,
                    };
                else if (opt.name === "count")
                    return {
                        data: isCategoryNameAutoPostViews && opt.name === "count" ? 10 : data[opt.name],
                        name: opt.name,
                    };
                else
                    return {
                        data: isCategoryNameAutoPostViews && opt.name === "count" ? 10 : Number(data[opt.name]),
                        name: opt.name,
                    };
            })) ||
        [];

    return [
        {
            category: select?.category?.name,
            quality: select.quality?.name,
            type: select.type?.name,
            option: option,
        },
    ];
};
