import { useTypeDevice } from "@hooks";
import PropTypes from "prop-types";

import { TemplatesTableButtonDeleteTemplate, TemplatesTableButtonEditTemplate, TemplatesTableButtonCreateOrder } from "./";

/**
 * Компонент действий в таблице шаблонов
 * @param createOrderQuery
 * @param elem
 * @returns {JSX.Element}
 * @constructor
 */
export const TemplatesTableActions = ({ createOrderQuery, elem }) => {
    const { isMobile } = useTypeDevice();

    return (
        <div className="sm:min-w-[138px] max-sm:bg-white flex flex-row sm:flex-col sm:gap-3 sm:self-stretch sm:ml-auto max-sm:items-center p-[15px] sm:pl-0 justify-between max-sm:rounded-b-2xl">
            <div className="flex sm:justify-end gap-2">
                {!isMobile && <TemplatesTableButtonEditTemplate elem={elem} />}

                <TemplatesTableButtonDeleteTemplate elem={elem} />
            </div>

            <TemplatesTableButtonCreateOrder createOrderQuery={createOrderQuery} elem={elem} />
        </div>
    );
};

TemplatesTableActions.propTypes = {
    createOrderQuery: PropTypes.object,
    elem: PropTypes.object,
};
