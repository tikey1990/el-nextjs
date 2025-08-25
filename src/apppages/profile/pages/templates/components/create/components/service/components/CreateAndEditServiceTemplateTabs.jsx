import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { utilRenderServicesTabsTemplate } from "../utils";

/**
 * Компонент для выбора услуги в шаблоне
 * @constructor
 */
export const CreateAndEditServiceTemplateTabs = ({ setServiceTemplate, serviceTemplate }) => {
    const service = useSelector((state) => state.profileTemplates.template.service);
    const services = useSelector((state) => state.profileTemplates.template.services);
    const isShowTabs = service === null || services.length === 0;

    return (
        <>
            {isShowTabs && (
                <div className="flex w-full flex-wrap sm:max-w-[812px]  justify-center sm:justify-between gap-x-[10px] gap-y-[15px] sm:gap-2 z-[1] flex-row">
                    {utilRenderServicesTabsTemplate(setServiceTemplate, serviceTemplate)}
                </div>
            )}
        </>
    );
};

CreateAndEditServiceTemplateTabs.propTypes = {
    setServiceTemplate: PropTypes.func,
    serviceTemplate: PropTypes.string,
};
