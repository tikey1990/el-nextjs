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
import { useFormContext } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

/**
 * Компонент формы создания и редактирования шаблона услуги автопросмотров.
 * @returns {JSX.Element}
 * @constructor
 */
export const CreateAndEditServiceTemplateFormAutoPostViews = () => {
    // Ref слайдера
    const refSpeedPerPost = useRef(null);
    const refSpeedPerAdPost = useRef(null);

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
    const {
        formState: { dirtyFields, errors },
        setValue,
        register,
        watch,
    } = methods;

    useUpdateDefaultValueAuto(setValue, isEditMode ? select?.option : deleteSelect?.option, "templates", isEditMode);

    /**
     * Слушатель на слайдер
     */
    const sliderHandle = (elem, sliderName, ref) => {
        const value = elem.target.value;

        // При изменении устанавливаем значение в input
        setValue(sliderName(select?.option, "templates"), value, {
            shouldValidate: true, // Ревалидация
            shouldDirty: true, // Делаем поле загрязненным
        });

        ref?.current?.focus();
    };

    useEffect(() => {
        const fillPercentagePost =
            (watch(speedPerPostName(select?.option, "templates")) / speedPerPostMax(select?.option, "templates")) * 100;
        const fillPercentagePostAd =
            (watch(speedPerAdPostName(select?.option, "templates")) / speedPerAdPostMax(select?.option, "templates")) * 100;

        document.documentElement.style.setProperty("--fill-percentage-post", fillPercentagePost + "%");
        document.documentElement.style.setProperty("--fill-percentage-post-ad", fillPercentagePostAd + "%");
    }, [watch(speedPerPostName(select?.option, "templates")), watch(speedPerAdPostName(select?.option, "templates"))]);

    return (
        <>
            {countPerPost(select?.option, "templates") && speedPerPost(select?.option, "templates") && (
                <div className="flex flex-col sm:flex-row items-end gap-4">
                    <div className="w-full sm:max-w-[300px] flex flex-col gap-2">
                        <div>
                            <Label
                                htmlFor={countPerPostName(select?.option, "templates")}
                                value={countPerPostText(select?.option, "templates")}
                            />
                        </div>

                        <TextInput
                            color={utilColorInputValid(countPerPostName(select?.option, "templates"), errors, dirtyFields)}
                            helperText={utilHelperText(countPerPostName(select?.option, "templates"), errors)}
                            name={countPerPostName(select?.option, "templates")}
                            id={countPerPostName(select?.option, "templates")}
                            placeholder="Введите количество"
                            className="w-full"
                            type="number"
                            sizing="lg"
                            {...register(countPerPostName(select?.option, "templates"))}
                        />
                    </div>

                    <div
                        className={`flex w-full sm:max-w-[250px] flex-col gap-2 ${
                            // eslint-disable-next-line no-prototype-builtins
                            errors.hasOwnProperty("count_per_post") && "sm:-translate-y-[34px]"
                        }`}
                    >
                        <div>
                            <Label
                                htmlFor={speedPerPostName(select?.option, "templates")}
                                value={speedPerPostText(select?.option, "templates")}
                            />
                        </div>
                        <div className="flex flex-col flex-wrap items-center gap-4 sm:flex-row sm:flex-nowrap sm:justify-between">
                            <div className="flex w-full items-center gap-3">
                                <RangeSlider
                                    onChange={(elem) => sliderHandle(elem, speedPerPostName, refSpeedPerPost)}
                                    value={watch(speedPerPostName(select?.option, "templates"))}
                                    step={speedPerPostStep(select?.option, "templates")}
                                    max={speedPerPostMax(select?.option, "templates")}
                                    min={speedPerPostMin(select?.option, "templates")}
                                    className="w-full h-[30px] percentage-post"
                                    id="limit"
                                    size="xl"
                                />

                                <TextInput
                                    name={speedPerPostName(select?.option, "templates")}
                                    id={speedPerPostName(select?.option, "templates")}
                                    ref={refSpeedPerPost}
                                    sizing="slider"
                                    color="slider"
                                    type="number"
                                    {...register(speedPerPostName(select?.option, "templates"))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {countPerAdPost(select?.option, "templates") && speedPerAdPost(select?.option, "templates") && (
                <div className="flex flex-col sm:flex-row items-end gap-4">
                    <div className="w-full sm:max-w-[300px] flex flex-col gap-2">
                        <div>
                            <Label
                                htmlFor={countPerAdPostName(select?.option, "templates")}
                                value={countPerAdPostText(select?.option, "templates")}
                            />
                        </div>

                        <TextInput
                            color={utilColorInputValid(countPerAdPostName(select?.option, "templates"), errors, dirtyFields)}
                            helperText={utilHelperText(countPerAdPostName(select?.option, "templates"), errors)}
                            name={countPerAdPostName(select?.option, "templates")}
                            id={countPerAdPostName(select?.option, "templates")}
                            placeholder="Введите количество"
                            className="w-full"
                            type="number"
                            sizing="lg"
                            {...register(countPerAdPostName(select?.option, "templates"))}
                        />
                    </div>

                    <div
                        className={`flex w-full sm:max-w-[250px] flex-col gap-2 ${
                            // eslint-disable-next-line no-prototype-builtins
                            errors.hasOwnProperty("count_per_ad_post") && "sm:-translate-y-[34px]"
                        }`}
                    >
                        <div>
                            <Label
                                htmlFor={speedPerAdPostName(select?.option, "templates")}
                                value={speedPerAdPostText(select?.option, "templates")}
                            />
                        </div>
                        <div className="flex flex-col flex-wrap items-center gap-4 sm:flex-row sm:flex-nowrap sm:justify-between">
                            <div className="flex w-full items-center gap-3">
                                <RangeSlider
                                    onChange={(elem) => sliderHandle(elem, speedPerAdPostName, refSpeedPerAdPost)}
                                    value={watch(speedPerAdPostName(select?.option, "templates"))}
                                    step={speedPerAdPostStep(select?.option, "templates")}
                                    max={speedPerAdPostMax(select?.option, "templates")}
                                    min={speedPerAdPostMin(select?.option, "templates")}
                                    className="w-full h-[30px] percentage-post-ad"
                                    id="limit"
                                    size="xl"
                                />

                                <TextInput
                                    name={speedPerAdPostName(select?.option, "templates")}
                                    id={speedPerAdPostName(select?.option, "templates")}
                                    ref={refSpeedPerAdPost}
                                    sizing="slider"
                                    color="slider"
                                    type="number"
                                    {...register(speedPerAdPostName(select?.option, "templates"))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
