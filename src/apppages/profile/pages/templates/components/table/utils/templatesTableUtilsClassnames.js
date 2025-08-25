import { useTypeDevice } from "@hooks";
import classnames from "classnames";

export const classBlockSocial = (bgSocial) => {
    return classnames("rounded-2xl min-w-[56px] hidden self-stretch sm:flex justify-center items-center", bgSocial);
};

export const classHeaderTable = (bgSocial) => {
    const { isMobile } = useTypeDevice();

    return classnames("max-sm:flex max-sm:items-center max-sm:gap-[15px] max-sm:py-1 max-sm:px-3 max-sm:w-full max-sm:rounded-t-2xl", {
        [`${bgSocial}`]: isMobile,
    });
};
