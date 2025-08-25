import { utilFormatNumberWithSpaces } from "@utils";
import { useTypeDevice } from "@hooks";
import { IconRuble } from "@icons";
import PropTypes from "prop-types";

import { TemplatesTableButtonEditTemplate, TemplatesTableServices } from "./";
import { classHeaderTable } from "../utils";

/**
 * Компонент информации об услугах о шаблоне в таблице шаблонов
 * @param elem
 * @param iconSocial
 * @param bgSocial
 * @returns {JSX.Element}
 * @constructor
 */
export const TemplatesTableInfo = ({ iconSocial, bgSocial, elem }) => {
    const { total_price, services, name } = elem;
    const { isMobile } = useTypeDevice();

    return (
        <div className="sm:py-[15px] max-sm:pb-0 sm:px-5 flex flex-col w-full">
            <div className={classHeaderTable(bgSocial)}>
                {isMobile && iconSocial}

                <p className="font-pn-boldit text-[16px] text-white sm:text-gray-600 sm:pb-2 sm:border-b sm:border-gray-200 mr-auto">
                    {name}
                </p>

                {isMobile && <TemplatesTableButtonEditTemplate elem={elem} />}
            </div>

            <TemplatesTableServices services={services} />

            <span className="font-pn-boldit max-sm:px-[15px] max-sm:bg-white max-sm:w-full inline-flex items-center max-sm:justify-end gap-1 text-[16px] text-gray-600 pt-2 ml-auto">
                {utilFormatNumberWithSpaces(`${total_price}`, true)}{" "}
                <IconRuble className="w-[8px] h-[15px] fill-gray-600 -translate-y-[1px] rotate-[7deg]" />
            </span>
        </div>
    );
};

TemplatesTableInfo.propTypes = {
    iconSocial: PropTypes.object,
    bgSocial: PropTypes.string,
    elem: PropTypes.object,
};
