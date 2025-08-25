import { utilServicesRenderInfos } from "../utils";

/**
 * Компонент характеристик качества услуг
 * @returns {JSX.Element}
 * @constructor
 */
export const ServicesQualityInfo = () => {
    return (
        <div className="flex flex-wrap max-xl:w-full max-sm:mt-6 flex-col xl:flex-row gap-3 sm:max-w-[30%] xl:max-w-[370px]">
            {utilServicesRenderInfos()}
        </div>
    );
};
