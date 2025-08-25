import { utilColorInputValid, utilHelperText } from "@utils";
import { TextInput, Button, Label } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import React from "react";

/**
 * Компонент купона
 * @returns {JSX.Element}
 * @constructor
 */
export const DepositRefillCoupon = () => {
    const methods = useFormContext();
    const { dirtyFields, register, errors } = methods;

    return (
        <div className="w-full">
            <div className="mb-4 sm:mb-5">
                <Label className="text-[16px] sm:text-[20px] font-pn-boldit text-gray-600" htmlFor="coupon" value="Купон" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col w-full max-w-[361px]">
                    {/* Купон */}
                    <TextInput
                        color={utilColorInputValid("coupon", errors, dirtyFields)}
                        helperText={utilHelperText("coupon", errors)}
                        placeholder="Введите, если есть"
                        className="w-full"
                        name="coupon"
                        type="number"
                        id="coupon"
                        sizing="lg"
                        {...register("coupon")}
                    />
                </div>

                <Button color="primary" size="sm">
                    Проверить
                </Button>
            </div>
        </div>
    );
};
