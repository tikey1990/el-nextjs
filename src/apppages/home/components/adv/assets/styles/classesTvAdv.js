import { tv } from "tailwind-variants";

/**
 * Стили для блока Преимущества на главной
 */
export const classesTvAdv = tv({
  slots: {
    tvHomeAdvWrapperItem:
      "w-full items-center justify-between p-[25px] gap-[25px] h-[152px] relative flex bg-gradient-adv-white shadow-block-adv-wrapper after:content-[''] after:flex after:absolute after:h-[20px] after:bottom-0 after:left-0 after:bg-[#ffffff] after:rounded-[16px] after:w-[85%] after:translate-x-[22px] after:translate-y-[22px] after:z-[-2] after:shadow-after-adv-wrapper md:after:w-[322px] md:after:translate-y-[18px] before:content-[''] before:flex before:absolute before:h-[20px] before:bottom-0 before:left-0 before:bg-[#ffffff] before:rounded-[16px] before:w-[90%] before:z-[-1] before:translate-x-[15px] before:translate-y-[12px] before:shadow-before-adv-wrapper md:before:w-[356px] md:before:translate-x-[10px] md:before:translate-y-[10px] rounded-[16px] md:w-[380px] md:items-end md:p-[30px]",
    tvHomeSubtitle:
      "max-w-[143px] leading-[105%] mb-[30px] font-extrabold font-pn-extraboldit text-[20px] md:text-[52px] md:max-w-[370px] md:mb-[110px]",
    tvAdvImg:
      "relative w-[80px] h-auto translate-y-[inherit] md:translate-y-[-75px] md:max-w-[100px] md:absolute",
    tvAdvWrapperText:
      "text-[18px] text-gray-600 w-full leading-[130%] order-[-1] font-bold font-pn-extraboldit md:text-[20px]",
    tvHomeAdvWrapper:
      "relative flex flex-row justify-between flex-wrap gap-[60px] md:gap-[90px_30px]",
    tvHomeAdv: "opacity-0 mb-[120px] md:mb-[180px]",
    tvAdvWrapperTextSpan: "font-pn-regular",
    tvAvdImagePrice: "w-[58px]",
    tvAdvWrapperTextBr: "hidden md:block",
  },
});
