import classNames from "classnames";

import { configSocialTabsDataServices } from "../config";

export const utilRenderServicesTabsTemplate = (setServiceTemplate, serviceTemplate) => {
    const classItem = (elem) =>
        classNames(
            "flex justify-center h-[60px] relative w-[calc(25%-(3/4)*10px)] xs:w-[calc((100%/4)-(4/5)*10px)] sm:w-[calc((100%/8)-(7/8)*0.5rem)] aspect-video hover:opacity-90 rounded-xl sm:rounded-2xl cursor-pointer items-center",
            {
                "sm:rounded-2xl rounded-xl pseudoOutlineSafari": serviceTemplate === elem.name,
            },
            elem.bg
        );

    const handleClickedService = (service) => {
        setServiceTemplate(service);
    };

    return configSocialTabsDataServices.map((elem, index) => (
        <div onClick={() => handleClickedService(elem.name)} className={classItem(elem)} key={index}>
            {elem.icon}
        </div>
    ));
};
