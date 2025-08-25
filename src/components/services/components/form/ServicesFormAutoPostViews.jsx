import {
    speedPerAdPostText,
    speedPerAdPostStep,
    speedPerAdPostName,
    countPerAdPostText,
    countPerAdPostName,
    speedPerAdPostMin,
    speedPerAdPostMax,
    speedPerPostText,
    speedPerPostStep,
    speedPerPostName,
    countPerPostText,
    countPerPostName,
    speedPerPostMin,
    speedPerPostMax,
    speedPerAdPost,
    countPerAdPost,
    speedPerPost,
    countPerPost,
} from "@config";
import { RangeSlider, TextInput, Label } from "flowbite-react";
import { utilColorInputValid, utilHelperText } from "@utils";
import { useUpdateDefaultValueAuto } from "@hooks";
import React, { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

export const ServicesFormAutoPostViews = () => {
    // Ref слайдера
    const refSpeedPerPost = useRef(null);
    const refSpeedPerAdPost = useRef(null);

    /**
     * Получение данных об услугах и качестве из Redux store
     */
    const quality = useSelector((state) => state.services.route.quality);

    /**
     * Форма
     */
    const methods = useFormContext();
    const {
        formState: { dirtyFields, errors },
        setValue,
        register,
        watch,
    } = methods;

    useUpdateDefaultValueAuto(setValue, quality, "services");

    const pricePerPost = Number(watch(countPerPostName(quality))) * quality?.["price_per_one"];
    const pricePerAdPost = Number(watch(countPerAdPostName(quality))) * quality?.["price_per_one"];

    /**
     * Слушатель на слайдер
     */
    const sliderHandle = (elem, sliderName, ref) => {
        const value = elem.target.value;

        // При изменении устанавливаем значение в input
        setValue(sliderName(quality), value, {
            shouldValidate: true, // Ревалидация
            shouldDirty: true, // Делаем поле загрязненным
        });

        ref?.current?.focus();
    };

    useEffect(() => {
        const fillPercentagePost = (watch(speedPerPostName(quality)) / speedPerPostMax(quality)) * 100;
        const fillPercentagePostAd = (watch(speedPerAdPostName(quality)) / speedPerAdPostMax(quality)) * 100;

        document.documentElement.style.setProperty("--fill-percentage-post", fillPercentagePost + "%");
        document.documentElement.style.setProperty("--fill-percentage-post-ad", fillPercentagePostAd + "%");
    }, [watch(speedPerPostName(quality)), watch(speedPerAdPostName(quality))]);

    return (
        <>
            {countPerPost(quality) && speedPerPost(quality) && (
                <div className="flex flex-col sm:flex-row items-end gap-4">
                    <div className="w-full sm:max-w-[250px] flex flex-col gap-2">
                        <div>
                            <Label htmlFor={countPerPostName(quality)} value={countPerPostText(quality)} />
                        </div>

                        <TextInput
                            helperText={utilHelperText(countPerPostName(quality), errors, `${pricePerPost} руб за каждый пост`)}
                            color={utilColorInputValid(countPerPostName(quality), errors, dirtyFields)}
                            name={countPerPostName(quality)}
                            placeholder="Введите количество"
                            id={countPerPostName(quality)}
                            className="w-full"
                            type="number"
                            sizing="lg"
                            {...register(countPerPostName(quality))}
                        />
                    </div>

                    <div className="flex w-full sm:max-w-[250px] flex-col gap-2 sm:-translate-y-[34px]">
                        <div>
                            <Label htmlFor={speedPerPostName(quality)} value={speedPerPostText(quality)} />
                        </div>
                        <div className="flex flex-col flex-wrap items-center gap-4 sm:flex-row sm:flex-nowrap sm:justify-between">
                            <div className="flex w-full items-center gap-3">
                                <RangeSlider
                                    onChange={(elem) => sliderHandle(elem, speedPerPostName, refSpeedPerPost)}
                                    className="w-full h-[30px] percentage-post"
                                    value={watch(speedPerPostName(quality))}
                                    step={speedPerPostStep(quality)}
                                    min={speedPerPostMin(quality)}
                                    max={speedPerPostMax(quality)}
                                    id="limit"
                                    size="xl"
                                />

                                <TextInput
                                    name={speedPerPostName(quality)}
                                    max={speedPerPostMax(quality)}
                                    min={speedPerPostMin(quality)}
                                    id={speedPerPostName(quality)}
                                    ref={refSpeedPerPost}
                                    sizing="slider"
                                    color="slider"
                                    type="number"
                                    {...register(speedPerPostName(quality))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {countPerAdPost(quality) && speedPerAdPost(quality) && (
                <div className="flex flex-col sm:flex-row items-end gap-4">
                    <div className="w-full sm:max-w-[250px] flex flex-col gap-2">
                        <div>
                            <Label htmlFor={countPerAdPostName(quality)} value={countPerAdPostText(quality)} />
                        </div>

                        <TextInput
                            helperText={utilHelperText(countPerAdPostName(quality), errors, `${pricePerAdPost} руб за каждый пост`)}
                            color={utilColorInputValid(countPerAdPostName(quality), errors, dirtyFields)}
                            name={countPerAdPostName(quality)}
                            placeholder="Введите количество"
                            id={countPerAdPostName(quality)}
                            className="w-full"
                            type="number"
                            sizing="lg"
                            {...register(countPerAdPostName(quality))}
                        />
                    </div>

                    <div className="flex w-full sm:max-w-[250px] flex-col gap-2 sm:-translate-y-[34px]">
                        <div>
                            <Label htmlFor={speedPerAdPostName(quality)} value={speedPerAdPostText(quality)} />
                        </div>
                        <div className="flex flex-col flex-wrap items-center gap-4 sm:flex-row sm:flex-nowrap sm:justify-between">
                            <div className="flex w-full items-center gap-3">
                                <RangeSlider
                                    onChange={(elem) => sliderHandle(elem, speedPerAdPostName, refSpeedPerAdPost)}
                                    className="w-full h-[30px] percentage-post-ad"
                                    value={watch(speedPerAdPostName(quality))}
                                    step={speedPerAdPostStep(quality)}
                                    min={speedPerAdPostMin(quality)}
                                    max={speedPerAdPostMax(quality)}
                                    id="limit"
                                    size="xl"
                                />

                                <TextInput
                                    name={speedPerAdPostName(quality)}
                                    min={speedPerAdPostMin(quality)}
                                    max={speedPerAdPostMax(quality)}
                                    id={speedPerAdPostName(quality)}
                                    ref={refSpeedPerAdPost}
                                    sizing="slider"
                                    color="slider"
                                    type="number"
                                    {...register(speedPerAdPostName(quality))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
