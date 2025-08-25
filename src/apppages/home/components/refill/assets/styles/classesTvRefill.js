import { tv } from "tailwind-variants";

/**
 * Стили для блока Способы пополнения на главной
 */
export const classesTvRefill = tv({
    slots: {
        tvHomeRefillWrapperItems:
            "w-[65px] h-[65px] flex justify-center items-center bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.12)] rounded-[50%] cursor-pointer hover:opacity-80 md:w-[130px] md:h-[130px] md:rounded-[10px]",
        tvHomeSubtitle:
            "max-w-[200px] mb-[30px] font-extrabold font-pn-extraboldit text-[20px] leading-[120%] md:max-w-[309px] md:mb-[70px] md:text-[52px]",
        tvHomeRefillWrapper: "flex flex-wrap justify-center gap-[10px] md:gap-[20px] md:justify-start",
        tvImg: "w-[25px] h-[25px] md:w-full md:h-auto",
        tvHomeRefill: "opacity-0",
    },
});
