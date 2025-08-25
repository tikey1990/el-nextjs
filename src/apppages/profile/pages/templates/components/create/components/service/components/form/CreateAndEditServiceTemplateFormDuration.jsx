import { sliderText, sliderStep, sliderName, sliderMin, sliderMax, slider } from "@config";
import { RangeSlider, TextInput, Label } from "flowbite-react";
import { useUpdateDefaultValueSlider } from "@hooks";
import { useFormContext } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

/**
 * Компонент номера голосований для формы создания и редактирования шаблона услуги.
 * @returns {JSX.Element}
 * @constructor
 */
export const CreateAndEditServiceTemplateFormDuration = () => {
    // Ref слайдера
    const refDuration = useRef(null);

    /**
     * Получение данных об услугах и качестве из Redux store
     */
    const select = useSelector((state) => state.profileTemplates.select);
    const deleteSelect = useSelector((state) => state.profileTemplates.deleteSelect);
    const isEditMode = deleteSelect === null;

    /**
     * Форма
     */
    const methods = useFormContext();
    const { register, setValue, watch } = methods;

    useUpdateDefaultValueSlider(setValue, select?.option, "templates", isEditMode);

    /**
     * Слушатель на слайдер
     */
    const sliderHandle = (elem) => {
        const value = elem.target.value;

        // При изменении устанавливаем значение в input
        setValue(sliderName(select?.option, "templates"), value, {
            shouldValidate: true, // Ревалидация
            shouldDirty: true, // Делаем поле загрязненным
        });

        refDuration?.current?.focus();
    };

    useEffect(() => {
        const fillPercentage = (watch(sliderName(select?.option, "templates")) / sliderMax(select?.option, "templates")) * 100;

        document.documentElement.style.setProperty("--fill-percentage", fillPercentage + "%");
    }, [watch(sliderName(select?.option, "templates"))]);

    return (
        <>
            {slider(select?.option, "templates") && (
                <div className="flex w-full flex-col">
                    <div className="mb-2">
                        <Label htmlFor={sliderName(select?.option, "templates")} value={sliderText(select?.option, "templates")} />
                    </div>
                    <div className="flex flex-col flex-wrap items-center gap-4 sm:flex-row sm:flex-nowrap sm:justify-between">
                        <div className="flex w-full sm:max-w-[250px] items-center gap-3">
                            <RangeSlider
                                value={watch(sliderName(select?.option, "templates"))}
                                step={sliderStep(select?.option, "templates")}
                                min={sliderMin(select?.option, "templates")}
                                max={sliderMax(select?.option, "templates")}
                                className="w-full h-[30px]"
                                onChange={sliderHandle}
                                id="limit"
                                size="xl"
                            />

                            <TextInput
                                name={sliderName(select?.option, "templates")}
                                id={sliderName(select?.option, "templates")}
                                ref={refDuration}
                                sizing="slider"
                                color="slider"
                                type="number"
                                {...register(sliderName(select?.option, "templates"))}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
