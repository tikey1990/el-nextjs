import { renderSocials } from "../utils";

/**
 * Компонент FaqSocials - социальные сети
 * @returns {JSX.Element}
 * @constructor
 */
export const FaqSocials = () => {
    return <div className="flex flex-row flex-wrap justify-center gap-4">{renderSocials()}</div>;
};
