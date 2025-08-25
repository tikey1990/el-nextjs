import { tv } from "tailwind-variants";

/**
 * Стили для блока Preview на главной
 */
export const classesTvPreview = tv({
  slots: {
    tvWrapperFirst:
      "flex flex-col justify-center h-auto gap-[20px] w-full xs:w-full xs:min-h-[280px] s:mx-auto lg:h-[654px] lg:gap-[30px] bg-no-repeat bg-bottom bg-right bg-contain bg-wrapper-image lg:bg-none",
    tvHomeDescription:
      "font-normal font-pn-regular max-w-[178px] text-[16px] leading-[140%] mt-[20px] md:text-[32px] md:max-w-[356px] md:leading-[130%]",
    tvHomePreview:
      "w-full opacity-0 duration-700 flex preview-title flex-row justify-between items-center mt-[60px] mb-[180px] md:mb-[80px]",
    tvTitlePreview:
      "font-extrabold font-pn-extraboldit max-w-[191px] text-[28px] leading-[105%] md:max-w-[655px] md:text-[64px]",
    tvPreviewButtons:
      "flex flex-row gap-[10px] mt-[0] md:gap-[27px] md:mt-[30px] translate-y-[50px]",
    tvPreviewIconPhone: "min-w-[440px] min-h-[640px]",
    tvWrapperLast: "hidden lg:block",
    tvAuthFirst: "",
    tvAuthLast: "",
    tvButton: "",
  },
});
