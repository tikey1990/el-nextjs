import classNames from "classnames";

export const classListboxWrapper = (style) =>
    classNames(
        "relative cursor-pointer",
        { "w-auto": style === "default" },
        { "w-full": style === "large" },
        { "w-full": style === "templates" }
    );

export const classListboxButton = (style, active) =>
    classNames(
        "relative flex w-full cursor-default select-btn hover:bg-[#E6F6FD] cursor-pointer sm:h-[36px] items-center justify-between gap-1.5 rounded-[10px] text-left font-pn-semibold !text-sm",
        {
            "bg-white px-3 py-2 text-xs text-gray-600": style === "default",
        },
        {
            "bg-white px-3 py-3 text-sm ring-1 ring-[#E8EBF1] shadow-input text-gray-500": style === "large",
        },
        {
            "!bg-[#E6F6FD]": active,
        },
        {
            "bg-white p-5 sm:!h-[60px] !text-[16px] ring-1 ring-[#E8EBF1] shadow-input text-gray-500": style === "templates",
        }
    );

export const classListboxOption = (style) =>
    classNames(
        "relative flex flex-row gap-3 items-center select-none hover:rounded-[10px]",
        {
            "hover:bg-[#E6F6FD] bg-white px-3 py-2": style === "default",
        },
        {
            "hover:bg-[#E6F6FD] bg-white px-3 py-2": style === "large",
        },
        {
            "hover:bg-[#E6F6FD] bg-white px-3 py-2": style === "templates",
        }
    );

export const classListboxOptions = (style) =>
    classNames(
        "text-left max-h-800 bg-white shadow-select py-2 px-1 cursor-pointer absolute z-20 mt-1.5 w-full overflow-auto rounded-[10px] font-pn-regular text-gray-600 focus:outline-none !text-sm",
        {
            "text-xs": style === "default",
        },
        {
            "text-sm": style === "large",
        },
        {
            "text-sm h-[200px] sm:h-[300px] custom-scrollbar": style === "templates",
        }
    );
