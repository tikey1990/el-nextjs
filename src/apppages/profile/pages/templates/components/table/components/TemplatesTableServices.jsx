import PropTypes from "prop-types";

import { utilRenderServicesTemplates } from "../utils";

/**
 * Компонент отображения услуг в таблице
 * @param services
 * @returns {*}
 * @constructor
 */
export const TemplatesTableServices = ({ services }) => {
    return <div className="flex flex-col max-sm:px-[15px] max-sm:bg-white">{utilRenderServicesTemplates(services)}</div>;
};

TemplatesTableServices.propTypes = {
    services: PropTypes.array,
};
