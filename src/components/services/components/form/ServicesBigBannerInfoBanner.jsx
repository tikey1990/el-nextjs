import { shallowEqual, useSelector } from "react-redux";
import React from "react";

/**
 * Компонент большого баннера под услугами
 */
export const ServicesBigBannerInfoBanner = () => {
    const currentQuality = useSelector((state) => state.services.route.quality, shallowEqual)?.["order_subtleties"]?.description;
    const bigBannerInfoText = currentQuality?.find((elem) => elem?.name === "big_banner_info")?.text;

    if (bigBannerInfoText)
        return (
            <div className="w-full items-center rounded-2xl bg-[#F0FAFF] p-[15px] flex gap-3">
                <div className="flex flex-col gap-2">
                    <p dangerouslySetInnerHTML={{ __html: bigBannerInfoText || "" }} />
                </div>
            </div>
        );
};
