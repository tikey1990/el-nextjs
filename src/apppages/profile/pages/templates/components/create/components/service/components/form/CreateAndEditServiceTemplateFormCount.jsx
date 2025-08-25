import { utilColorInputValid, utilHelperText } from "@utils";
import { TextInput, Label } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";

/**
 * Компонент поля количества услуги
 * @returns {JSX.Element}
 * @constructor
 */
export const CreateAndEditServiceTemplateFormCount = () => {
    const select = useSelector((state) => state.profileTemplates.select);
    const isShowCount = select?.category?.name !== "auto_post_views";
    const isComments = select?.category?.name === "comments";

    const [prevMinCount, setPrevMinCount] = useState(0);

    const {
        formState: { dirtyFields, errors },
        register,
    } = useFormContext();

    useEffect(() => {
        if (select?.["min_count"] !== prevMinCount && select?.["min_count"] !== undefined) setPrevMinCount(select?.["min_count"]);
    }, [select?.["min_count"]]);

    const classInput = classnames("w-full sm:w-[300px]", { "[&_input]:bg-gray-200 [&_input]:ring-0": isComments });

    return (
        <>
            {isShowCount && (
                <div>
                    <div className="mb-2 block">
                        <Label value="Количество" htmlFor="count" />
                    </div>

                    <TextInput
                        rightIcon={() => <p className="text-gray-600 font-pn-regular">шт.</p>}
                        color={utilColorInputValid("count", errors, dirtyFields)}
                        helperText={utilHelperText("count", errors)}
                        placeholder={`Минимум ${prevMinCount}`}
                        className={classInput}
                        autoComplete="off"
                        type="number"
                        name="count"
                        sizing="lg"
                        id="count"
                        {...register("count")}
                    />
                </div>
            )}
        </>
    );
};
