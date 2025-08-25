import { pollVoteAnswersText, pollVoteAnswersName, pollVoteAnswers } from "@config";
import { utilColorInputValid, utilHelperText } from "@utils";
import { useFormContext } from "react-hook-form";
import { TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import React from "react";

/**
 * Компонент номера голосований
 * @returns {JSX.Element}
 * @constructor
 */
export const ServicesFormPollVotes = () => {
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
    } = methods;

    return (
        <>
            {pollVoteAnswers(quality) && (
                <div className="w-full sm:w-[282px]">
                    <TextInput
                        color={utilColorInputValid(pollVoteAnswersName(quality), errors, dirtyFields)}
                        helperText={utilHelperText(pollVoteAnswersName(quality), errors)}
                        placeholder={pollVoteAnswersText(quality)}
                        name={pollVoteAnswersName(quality)}
                        id={pollVoteAnswersName(quality)}
                        className="w-full rounded-l-xl"
                        type="number"
                        sizing="lg"
                        {...register(pollVoteAnswersName(quality))}
                    />
                </div>
            )}
        </>
    );
};
