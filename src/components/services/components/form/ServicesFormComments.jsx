import { commentsText, commentsName, comments } from "@config";
import { utilColorInputValid, utilHelperText } from "@utils";
import { Textarea, Label } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

/**
 * Компонент комментариев
 * @returns {Element}
 * @constructor
 */
export const ServicesFormComments = () => {
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
        register,
        setValue,
        watch,
    } = methods;
    const commentsValue = watch("comments"); // Значение поля комментариев

    // Устанавливаем в поле "Количество" количества комментариев
    useEffect(() => {
        const filteredComments = commentsValue?.split("\n").filter((item) => item.trim() !== "");

        setValue("count", filteredComments?.length);
    }, [commentsValue]);

    return (
        <>
            {comments(quality) && (
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor={commentsName(quality)} value={commentsText(quality)} />
                    </div>
                    <Textarea
                        color={utilColorInputValid(commentsName(quality), errors, dirtyFields)}
                        placeholder="Введите комментарии, каждый комментарий с новой строки"
                        helperText={utilHelperText(commentsName(quality), errors)}
                        name={commentsName(quality)}
                        className="h-[155px] w-full"
                        id={commentsName(quality)}
                        sizing="lg"
                        {...register(commentsName(quality))}
                    />
                </div>
            )}
        </>
    );
};
