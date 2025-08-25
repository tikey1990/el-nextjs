import classNames from "classnames";

export const classFormLinksSection = (getValues) => {
    const massOrder = getValues().massOrder;

    return classNames("flex flex-wrap xl:flex-nowrap gap-5", { "flex-col": massOrder }, { "flex-row": !massOrder });
};

export const classButton = (isActiveElem, countQualitys, isReactions) =>
    classNames(
        "focus:!ring-0 max-sm:pt-[10px] hover:bg-transparent hover:text-white [&>span]:flex sm:h-[50px] [&>span]:flex-col [&>span]:max-sm:gap-1 p-1.5 sm:pr-3 max-sm:h-[63px] sm:pl-5 max-sm:rounded-2xl font-pn-bold text-sm [&>span]:sm:flex-row [&>span]:w-full [&>span]:items-center",
        {
            "hover:text-primary-500 hover:bg-white focus:!ring-0 ring-0 pseudoOutlineServicesTabsSafari max-sm:h-[63px] sm:h-[50px]":
                !isActiveElem,
        },
        { "max-sm:w-[calc((100%/2)-(1/2)*0.75rem)]": countQualitys === 1 && !isReactions },
        { "max-sm:w-[calc((100%/2)-(1/2)*0.375rem)]": countQualitys === 2 && !isReactions },
        { "max-sm:w-[calc((100%/3)-(2/3)*0.375rem)]": countQualitys === 3 && !isReactions },
        { "max-sm:w-[calc((100%/4)-(3/4)*0.375rem)]": countQualitys === 4 && !isReactions },
        { "w-[calc((100%/3)-(2/3)*1rem)] max-sm:w-[calc((100%/3)-(2/3)*0.375rem)]": isReactions },
        { "w-[calc(50%-0.5rem)]": !isReactions }
    );

export const classPrice = (isActiveElem, price) =>
    classNames(
        "flex flex-row flex-nowrap sm:ml-auto justify-center max-sm:gap-1 sm:min-w-[37px] max-sm:w-full max-sm:h-[26px] text-[13px] text-type-bold items-center rounded-xl sm:rounded-[35px] py-[5px] px-2",
        { "bg-white text-primary-500": isActiveElem },
        { "bg-[#F0FAFF] text-[#62C2EE]": !isActiveElem },
        { "sm:justify-end gap-[1px]": `${price}`.length === 1 },
        { "sm:justify-between": `${price}`.length > 1 }
    );

export const classRuble = (isActiveElem) =>
    classNames("sm:ml-0.5", { "fill-[#009FE7]": isActiveElem }, { "fill-[#62C2EE]": !isActiveElem });
