import { useGetServicesQuery } from "@features";
import { useSelector } from "react-redux";
import { useTypeDevice } from "@hooks";
import PropTypes from "prop-types";

import { IconArrowBottom, IconArrowTop } from "./assets/icons";

/**
 * Компонент баннера с шагами выбора тарифов
 * @returns {JSX.Element}
 * @constructor
 */
export const BannerStep = () => {
    const { data } = useGetServicesQuery();
    const serviceInfo = useSelector((state) => state.services.route.serviceInfo);
    const step = useSelector((state) => state.services.bannerStep.step);
    const { isMobile } = useTypeDevice();

    const currService =
        data?.data.find((item) => item.name === serviceInfo?.name) ?? data?.data.find((item) => item.name === serviceInfo?.service);
    const htmlText = currService?.html_text;

    return (
        <>
            {step !== "third" && (
                <div className="flex-col flex">
                    <div className="flex z-[10] w-full sm:max-h-[158px] flex-wrap sm:flex-nowrap flex-row max-sm:justify-center items-center p-5 sm:p-10 gap-5 sm:gap-10 bg-white shadow-content rounded-2xl">
                        {step === "first" && (
                            <>
                                <IconArrowTop />

                                <p className="font-pn-extraboldit text-2xl sm:text-[32px] text-gray-600 max-sm:order-1 max-sm:text-center">
                                    Выберите социальную сеть для продвижения
                                </p>
                                <p className="ml-0 sm:ml-auto font-pn-extraboldit text-lg whitespace-nowrap p-[25px] text-primary-500 bg-[#f0faff] rounded-[53px]">
                                    Шаг 1
                                </p>
                            </>
                        )}

                        {step === "second" && (
                            <>
                                {isMobile ? <IconArrowTop /> : <IconArrowBottom />}

                                <p className="font-pn-extraboldit text-2xl sm:text-[32px] text-gray-600 max-sm:order-1 max-sm:text-center">
                                    Выберите тип продвижения
                                </p>
                                <p className="ml-0 sm:ml-auto font-pn-extraboldit text-lg whitespace-nowrap p-[25px] text-primary-500 bg-[#f0faff] rounded-[53px]">
                                    Шаг 2
                                </p>
                            </>
                        )}
                    </div>

                    {htmlText && <div dangerouslySetInnerHTML={{ __html: htmlText }} className="mt-10"></div>}
                </div>
            )}
        </>
    );
};

BannerStep.propTypes = {
    step: PropTypes.oneOf(["first", "second"]),
};
