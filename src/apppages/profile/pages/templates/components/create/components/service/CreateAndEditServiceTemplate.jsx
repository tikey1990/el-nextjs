import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { CreateAndEditServiceTemplateForm, CreateAndEditServiceTemplateTabs } from "./components";

/**
 * Компонент выбор услуги для создания или редактирования шаблона
 * @returns {JSX.Element}
 * @constructor
 */
export const CreateAndEditServiceTemplate = ({ setServiceTemplate, serviceTemplate }) => {
    const deleteSelect = useSelector((state) => state.profileTemplates.deleteSelect);
    const text = deleteSelect === null ? "Новая услуга" : "Редактирование услуги";

    return (
        <div className="flex flex-col gap-5 sm:gap-6">
            <p className="text-[20px] font-pn-boldit text-gray-600">{text}</p>

            <CreateAndEditServiceTemplateTabs setServiceTemplate={setServiceTemplate} serviceTemplate={serviceTemplate} />

            <CreateAndEditServiceTemplateForm setServiceTemplate={setServiceTemplate} serviceTemplate={serviceTemplate} />
        </div>
    );
};

CreateAndEditServiceTemplate.propTypes = {
    setServiceTemplate: PropTypes.func.isRequired,
    serviceTemplate: PropTypes.any,
};
