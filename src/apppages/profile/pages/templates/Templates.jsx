import { useSelector } from "react-redux";

import { CreateAndEditTemplate, TemplatesHeader, TemplatesTable } from "./components";

/**
 * Страница шаблонов
 * @returns {JSX.Element}
 * @constructor
 */
const Templates = () => {
    const templateType = useSelector((state) => state.profileTemplates.template.type);
    const isShowTemplates = templateType === null;

    return (
        <div className="sm:shadow-content sm:rounded-2xl sm:bg-white sm:p-10">
            {isShowTemplates ? (
                <>
                    <TemplatesHeader />

                    <TemplatesTable />
                </>
            ) : (
                <CreateAndEditTemplate />
            )}
        </div>
    );
};

export default Templates;
