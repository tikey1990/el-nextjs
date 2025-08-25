import { tv } from "tailwind-variants";

/**
 * Стили для блока Тарифы на главной
 */
export const classesTvServices = tv({
    slots: {
        tvHomeDescription:
            "font-pn-regular max-w-[200px] text-center font-extrabold text-[16px] leading-[22px] mt-[20px] md:text-[32px] md:leading-[41px] md:max-w-[100%] md:text-start",
        tvHomeSubtitle: "font-extrabold font-pn-extraboldit leading-[120%] text-[20px] max-w-[584px] md:text-[52px]",
        tvHomeServicesDesktop: "hidden md:flex md:justify-between md:flex-row md:items-center md:gap-[60px]",
        tvHomeServicesImg: "max-w-[139px] md:max-w-[522px] drop-shadow-[0_0_60px_rgba(0,159,231,0.5)] ",
        tvHomeServicesWrapperFirst: "flex flex-row justify-between items-center gap-[30px]",
        tvHomeServicesWrapper: "gap-[30px] md:flex md:flex-col md:gap-[40px]",
        tvHomeServicesWrapperLast: "flex flex-col items-center gap-[30px]",
        tvHomeServices: "opacity-0 mb-[80px] md:mb-[180px]",
        tvHomeServicesMobile: "flex flex-col md:hidden ",
    },
});
