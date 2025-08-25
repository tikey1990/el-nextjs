import { sliderText, sliderStep, sliderName, sliderMin, sliderMax, slider } from "@config";
import { RangeSlider, TextInput, Label } from "flowbite-react";
import { useUpdateDefaultValueSlider } from "@hooks";
import React, { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

/**
 * Компонент номера голосований
 * @returns {JSX.Element}
 * @constructor
 */
export const ServicesFormDuration = () => {
    // Ref слайдера
    const refDuration = useRef(null);

    /**
     * Получение данных об услугах и качестве из Redux store
     */
    const quality = useSelector((state) => state.services.route.quality);

    /**
     * Форма
     */
    const methods = useFormContext();
    const { register, setValue, watch } = methods;

    useUpdateDefaultValueSlider(setValue, quality, "services");

    /**
     * Слушатель на слайдер
     */
    const sliderHandle = (elem) => {
        const value = elem.target.value;

        // При изменении устанавливаем значение в input
        setValue(sliderName(quality), value, {
            shouldValidate: true, // Ревалидация
            shouldDirty: true, // Делаем поле загрязненным
        });

        refDuration?.current?.focus();
    };

    useEffect(() => {
        const fillPercentage = (watch(sliderName(quality)) / sliderMax(quality)) * 100;

        document.documentElement.style.setProperty("--fill-percentage", fillPercentage + "%");
    }, [watch(sliderName(quality))]);

    return (
        <>
            {slider(quality) && (
                <div className="flex w-full flex-col">
                    <div className="mb-2">
                        <Label htmlFor={sliderName(quality)} value={sliderText(quality)} />
                    </div>
                    <div className="flex flex-col flex-wrap items-center gap-4 sm:flex-row sm:flex-nowrap sm:justify-between">
                        <div className="flex w-full sm:max-w-[252px] items-center gap-3">
                            <RangeSlider
                                value={watch(sliderName(quality))}
                                className="w-full h-[30px]"
                                step={sliderStep(quality)}
                                max={sliderMax(quality)}
                                min={sliderMin(quality)}
                                onChange={sliderHandle}
                                id="limit"
                                size="xl"
                            />

                            <TextInput
                                name={sliderName(quality)}
                                min={sliderMin(quality)}
                                max={sliderMax(quality)}
                                id={sliderName(quality)}
                                ref={refDuration}
                                sizing="slider"
                                color="slider"
                                type="number"
                                {...register(sliderName(quality))}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
