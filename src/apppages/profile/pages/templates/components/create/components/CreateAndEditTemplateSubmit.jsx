import { setDeleteSelectTemplate, profileTemplatesApi } from "@features";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "flowbite-react";
import { IconRuble } from "@icons";
import { slider } from "@config";

/**
 * Компонент кнопки отправки формы создания и редактирования шаблона
 * @returns {JSX.Element}
 * @constructor
 */
export const CreateAndEditTemplateSubmit = () => {
    const dispatch = useDispatch();
    const type = useSelector((state) => state.profileTemplates.template.type);
    const select = useSelector((state) => state.profileTemplates.select);
    const total_price = useSelector((state) => state.profileTemplates.template?.["total_price"]);
    const deleteSelect = useSelector((state) => state.profileTemplates.deleteSelect);
    const deleteSelectTotalPrice = useSelector((state) => state.profileTemplates.deleteSelect?.total_price);
    const isDeleteMode = deleteSelect === null;
    const text = isDeleteMode ? "Сохранить и продолжить редактирование" : "Сохранить изменения";
    const buttonText = type === "create" ? "Создать" : text;
    const isCategoryNameAutoPostViews = `${select?.category?.name}`.includes("auto_");
    const [prevTotalPrice, setPrevTotalPrice] = useState(0);
    const pricePerOne = select?.price_per_one ?? select?.price;

    /**
     * Форма
     */
    const { formState, reset, watch } = useFormContext();
    const count = watch().count;
    const speedSlider = slider(isDeleteMode ? isDeleteMode?.option : select?.option, "templates") ? watch()?.["duration_slider"] ?? 1 : 1;

    // Сумма заказа
    const sum = useMemo(() => {
        const formPrice = count * pricePerOne * speedSlider;

        if (count !== 0 && count) {
            return parseFloat((isDeleteMode ? formPrice + total_price : total_price - deleteSelectTotalPrice + formPrice).toFixed(2));
        } else return parseFloat(total_price ?? 0);
    }, [watch()]);

    useEffect(() => {
        if (total_price !== prevTotalPrice && !isNaN(total_price) && total_price !== undefined) setPrevTotalPrice(total_price);
    }, [total_price]);

    /**
     * Слушатель на отмену режима удаления
     */
    const handleDeleteModeEdit = () => {
        dispatch(setDeleteSelectTemplate(null));
        dispatch(profileTemplatesApi.util.invalidateTags(["getWebsiteDetailedServices"]));

        reset({
            ...formState.defaultValues, // Сбрасываем все поля до значений по умолчанию
            count: null,
        });
    };

    return (
        <div className="flex justify-between flex-col sm:flex-row gap-6">
            {!isCategoryNameAutoPostViews ? (
                <p className="items-center inline-flex gap-[10px] text-[20px] font-pn-boldit text-gray-600">
                    Итоговая цена:
                    <span className="items-center inline-flex gap-0.5">
                        {sum} <IconRuble className="w-[14px] h-[14px] fill-gray-600 -translate-y-[1px]" />
                    </span>
                </p>
            ) : (
                <div></div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-4">
                {!isDeleteMode && (
                    <Button
                        className="max-sm:w-full sm:min-w-[150px] [&>span]:max-sm:text-[16px] [&>span]:py-4 [&>span]:px-3"
                        onClick={handleDeleteModeEdit}
                        color="red"
                        size="sm"
                    >
                        Отменить
                    </Button>
                )}
                <Button
                    className="max-sm:w-full sm:min-w-[150px] max-sm:-order-1 [&>span]:max-sm:text-[16px] [&>span]:py-4 [&>span]:px-3"
                    disabled={select === null}
                    color="primary"
                    type="submit"
                    size="sm"
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};
