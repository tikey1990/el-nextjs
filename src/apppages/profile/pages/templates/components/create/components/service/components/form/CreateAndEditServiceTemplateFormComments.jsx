import { commentsText, commentsName, comments } from "@config";
import { utilColorInputValid, utilHelperText } from "@utils";
import { Textarea, Label } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect } from "react";

/**
 * Компонент комментариев для формы создания и редактирования шаблона услуги
 * @returns {JSX.Element}
 * @constructor
 */
export const CreateAndEditServiceTemplateFormComments = () => {
    const select = useSelector((state) => state.profileTemplates.select);

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
        if (commentsValue) {
            if (commentsValue?.split("\n").length === 1 && commentsValue?.split("\n")[0].length === 0) setValue("count", null);
            else setValue("count", commentsValue?.split("\n").length);
        }
    }, [commentsValue]);

    return (
        <>
            {comments(select?.option, "templates") && (
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor={commentsName(select?.option, "templates")} value={commentsText(select?.option, "templates")} />
                    </div>
                    <Textarea
                        color={utilColorInputValid(commentsName(select?.option, "templates"), errors, dirtyFields)}
                        helperText={utilHelperText(commentsName(select?.option, "templates"), errors)}
                        placeholder="Введите комментарии, каждый комментарий с новой строки"
                        name={commentsName(select?.option, "templates")}
                        id={commentsName(select?.option, "templates")}
                        className="h-[155px] w-full"
                        sizing="lg"
                        {...register(commentsName(select?.option, "templates"))}
                    />
                </div>
            )}
        </>
    );
};
