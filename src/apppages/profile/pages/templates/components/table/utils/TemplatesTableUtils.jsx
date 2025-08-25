import {
    configIconsReactionsServices,
    speedPerAdPostName,
    countPerAdPostName,
    speedPerPostName,
    countPerPostName,
    pollVoteAnswers,
    speedPerAdPost,
    servicesConfig,
    countPerAdPost,
    speedPerPost,
    countPerPost,
    sliderName,
    comments,
    slider,
} from "@config";
import { utilServicesFormattingCustomLinks, utilFormatNumberWithSpaces } from "@utils";
import { setMassOrders } from "@features";
import { v4 as uuidv4 } from "uuid";
import { IconRuble } from "@icons";
import * as yup from "yup";

import { TemplatesTableActions, TemplatesTableInfo } from "../components";
import { classBlockSocial } from "./";

/**
 * Утилита для рендера шаблонов
 * @param data
 * @param createOrderQuery
 * @returns {*}
 */
export const utilRenderTemplates = (data, createOrderQuery) => {
    return (
        Array.isArray(data) &&
        data?.map((elem) => {
            const { service, id } = elem;
            const iconSocial = servicesConfig[service]?.icon_lg || servicesConfig[service]?.iconNotSocial;
            const bgSocial = servicesConfig?.[`${service}`].bg;

            return (
                <div className="rounded-2xl h-full shadow-block2 flex flex-col sm:flex-row" key={id}>
                    <div className={classBlockSocial(bgSocial)}>{iconSocial}</div>

                    <TemplatesTableInfo iconSocial={iconSocial} bgSocial={bgSocial} elem={elem} />

                    <TemplatesTableActions createOrderQuery={createOrderQuery} elem={elem} />
                </div>
            );
        })
    );
};

/**
 * Утилита для рендера услуг в шаблонах
 * @param services
 * @returns {*}
 */
export const utilRenderServicesTemplates = (services) => {
    return services.map(
        ({
            category: { ru_name: categoryRuName, name: categoryName },
            quality: { ru_name: qualityRuName },
            type: { ru_name: typeRuName },
            total_price,
            count,
            uuid,
        }) => {
            const isReactions = categoryName === "reactions";
            const iconReaction = configIconsReactionsServices({ className: "w-4 h-4" })?.[`${qualityRuName}`]?.icon;

            return (
                <div
                    className="flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 py-2 border-b border-gray-200"
                    key={uuid}
                >
                    <div className="w-full sm:flex inline-flex max-sm:flex-wrap flex-row gap-1 font-pn-regular text-sm items-center">
                        {/* Категория услуги */}
                        <span className="text-gray-600 font-pn-semibold">{categoryRuName}</span>
                        <div className="w-[3px] h-[3px] bg-gray-200"></div>

                        {/* Тип услуги */}
                        <span className="text-gray-500">{typeRuName}</span>
                        <div className="w-[3px] h-[3px] bg-gray-200"></div>

                        {/* Качество услуги */}
                        <span className="text-gray-500">{isReactions ? iconReaction : qualityRuName}</span>
                    </div>

                    <div className="flex flex-row items-center max-sm:justify-between gap-4 max-sm:w-full">
                        {/* Количество */}
                        <span className="sm:min-w-[100px] text-gray-500 font-pn-regular text-sm sm:text-right">
                            x {utilFormatNumberWithSpaces(`${count}`)}
                        </span>

                        {/* Цена услуги */}
                        <span className="sm:min-w-[100px] text-gray-600 inline-flex font-pn-semibold text-sm items-center gap-1 justify-end">
                            {utilFormatNumberWithSpaces(`${total_price}`, true)}{" "}
                            <IconRuble className="w-[7px] h-[10px] fill-gray-600 -translate-y-[1px]" />
                        </span>
                    </div>
                </div>
            );
        }
    );
};

/**
 * Утилита для отправки запроса на создание заказов по шаблону
 * @param elem
 * @param data
 * @param dispatch
 */
export const utilHandleCreateOrder = (elem, data, dispatch) => {
    const { service, id } = elem;
    const links = utilServicesFormattingCustomLinks(data?.link.split("\n")); // Массив ссылок на заказ

    let counterDelay = 0;
    elem?.services.forEach(
        ({
            category: { ru_name: categoryRuName, name: categoryName },
            quality: { ru_name: qualityRuName, name: qualityName },
            type: { ru_name: typeRuName, name: typeName },
            price_per_one,
            total_price,
            option,
            count,
        }) => {
            const idMassOrder = uuidv4();

            /**
             * Поле options
             * @returns {{[p: string]: *}}
             */
            const calcOption = () => {
                // Если есть комментарии
                if (comments(option, "templates")) {
                    if (`${categoryName}`.includes("auto_")) return [`${comments(option, "templates")?.value}`];
                    else return `${comments(option, "templates")?.value}`;
                }
                // Если есть номер голосования
                else if (pollVoteAnswers(option, "templates")?.name && data[pollVoteAnswers(option, "templates")?.name]) {
                    if (`${categoryName}`.includes("auto_")) return [data[pollVoteAnswers(option, "templates").name]];
                    else return data[pollVoteAnswers(option, "templates").name];
                }
                // Если есть слайдер
                else if (slider(option, "templates")) {
                    if (`${categoryName}`.includes("auto_")) return [slider(option, "templates")?.value];
                    else return slider(option, "templates")?.value;
                }
                // Если авто просмотры
                else if (`${categoryName}`.includes("auto_"))
                    return JSON.stringify({
                        [`${countPerAdPostName(option, "templates")}`]: countPerAdPost(option, "templates")?.value,
                        [`${speedPerAdPostName(option, "templates")}`]: speedPerAdPost(option, "templates")?.value,
                        [`${countPerPostName(option, "templates")}`]: countPerPost(option, "templates")?.value,
                        [`${speedPerPostName(option, "templates")}`]: speedPerPost(option, "templates")?.value,
                    });
                else return [""];
            };

            // Данные дял отправки формы
            const orderData = {
                speed: service === "telegram" && sliderName(option, "templates") ? sliderName(option, "templates")?.value : 0,
                count: `${categoryName}`.includes("auto_") ? undefined : Number(count),
                quality: `${typeName}_${qualityName}`,
                source: `templates_${id}`,
                option: calcOption(),
                type: categoryName,
                website: service,
                link: links,
            };

            // Преобразовываем данные с формы в массив заказов
            // Информация о заказах
            const data = links.map((elem) => {
                const idOrder = uuidv4();

                return {
                    ...orderData,
                    price: total_price,
                    errorMessage: null,
                    status: "active",
                    currBal: null,
                    newId: null,
                    id: idOrder,
                    link: elem,
                };
            });

            // Информация о массовом заказе
            const newOrderData = {
                isOpenedFirstOrder: undefined,
                countAllOrders: data?.length,
                price_per_one: price_per_one,
                website: orderData.website,
                quality: qualityRuName,
                id: `${idMassOrder}`,
                type: categoryRuName,
                type_ru: typeRuName,
                status: "active",
                data: data,
            };

            counterDelay += 400;

            setTimeout(() => {
                // Кидаем в стор массовый заказ
                dispatch(setMassOrders(newOrderData));
            }, counterDelay);
        }
    );
};

/**
 * Схема валидации для формы создания заказа по шаблону
 */
export const createOrderSchemaValidation = yup.object({
    link: yup.string().required("Поле должно быть заполнено!"),
});
