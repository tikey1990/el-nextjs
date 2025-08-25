import { pollVoteAnswersText, pollVoteAnswersName, pollVoteAnswers } from "@config";
import { utilColorInputValid, utilHelperText } from "@utils";
import { useFormContext } from "react-hook-form";
import { TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import React from "react";

/**
 * Компонент номера голосований для формы создания и редактирования шаблона услуги
 * @returns {JSX.Element}
 * @constructor
 */
export const CreateAndEditServiceTemplateFormPollVotes = () => {
    /**
     * Получение данных об услугах и качестве из Redux store
     */
    const select = useSelector((state) => state.profileTemplates.select);

    /**
     * Форма
     */
    const methods = useFormContext();
    const {
        formState: { dirtyFields, errors },
        register,
    } = methods;

    return (
        <>
            {pollVoteAnswers(select?.option, "templates") && (
                <div className="w-full sm:w-[282px]">
                    <TextInput
                        color={utilColorInputValid(pollVoteAnswersName(select?.option, "templates"), errors, dirtyFields)}
                        helperText={utilHelperText(pollVoteAnswersName(select?.option, "templates"), errors)}
                        placeholder={pollVoteAnswersText(select?.option, "templates")}
                        name={pollVoteAnswersName(select?.option, "templates")}
                        id={pollVoteAnswersName(select?.option, "templates")}
                        className="w-full rounded-l-xl"
                        type="number"
                        sizing="lg"
                        {...register(pollVoteAnswersName(select?.option, "templates"))}
                    />
                </div>
            )}
        </>
    );
};
