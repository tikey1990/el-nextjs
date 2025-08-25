import { tv } from "tailwind-variants";

/**
 * Стили для блока Статистика на главной
 */
export const classesTvStatistic = tv({
    slots: {
        tvHomeStatistic:
            "w-full flex opacity-0 duration-700 flex-row flex-nowrap justify-between py-[35px] gap-[34px] mb-[80px] bg-gradient-white border-y border-gray-700 md:flex-wrap md:py-[40px] md:px-[50px] md:gap-[50px] md:mb-[126px]",
        tvHomeStatisticWrapper:
            "flex flex-col w-auto gap-[36px] sm:w-[45%] sm:flex-row sm:justify-between md:flex-col lg:flex-col lg:w-auto lg:gap-[36px] xl:w-[42%] xl:flex-row xl:gap-[0px]",
        tvStatisticTextStat: "font-extrabold font-pn-extraboldit leading-[120%] text-[20px] md:text-[38px] statistic-text-stat-shadow ",
        tvStatisticTextDescription: "font-400 font-pn-regular leading-[120%] text-[15px] md:text-[24px]",
        tvHomeStatisticElem: "flex min-w-[40%] flex-col items-center gap-[10px] text-center",
    },
});
