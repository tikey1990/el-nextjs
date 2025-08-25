import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect } from "react";

/**
 * Resets form fields using values obtained from state and form context.
 *
 * @function servicesUtilResetForm
 * @returns {void}
 */
export const servicesUtilResetForm = () => {
    const serviceInfo = useSelector((state) => state.services.route.serviceInfo);

    const { getValues, reset } = useFormContext();

    useEffect(() => {
        reset({
            massOrder: getValues("massOrder"),
            comments: getValues("comments"),
            count: getValues("count"),
            link: getValues("link"),
        });
    }, [serviceInfo?.name]);
};
