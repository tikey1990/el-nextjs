import { useGetServicesWebsitesQuery } from "@features";
import { Label } from "flowbite-react";
import PropTypes from "prop-types";

import {
    CreateAndEditServiceTemplateFormAutoPostViews,
    CreateAndEditServiceTemplateFormPollVotes,
    CreateAndEditServiceTemplateFormDuration,
    CreateAndEditServiceTemplateFormComments,
    CreateAndEditServiceTemplateFormSelect,
    CreateAndEditServiceTemplateFormCount,
    CreateAndEditServiceTemplateSelect,
} from "../";

/**
 * Компонент формы создания и редактирования шаблона услуги
 * @param setServiceTemplate
 * @param serviceTemplate
 * @returns {JSX.Element}
 * @constructor
 */
export const CreateAndEditServiceTemplateForm = ({ serviceTemplate }) => {
    const isShowForm = serviceTemplate;
    const getServicesWebsitesQuery = useGetServicesWebsitesQuery({ website: serviceTemplate }, { skip: !serviceTemplate });
    const { data: { data = [] } = {} } = getServicesWebsitesQuery;

    return (
        <>
            {isShowForm && (
                <div className="flex flex-col gap-5 sm:gap-6">
                    <div className="flex gap-5 flex-col sm:h-[90px] sm:flex-row">
                        <div className="flex flex-col w-full">
                            <div className="mb-2 block">
                                <Label value="Услуга и качество" htmlFor="count" />
                            </div>
                            <CreateAndEditServiceTemplateFormSelect getServicesWebsitesQuery={getServicesWebsitesQuery} data={data} />
                        </div>

                        <CreateAndEditServiceTemplateFormCount />
                    </div>

                    <CreateAndEditServiceTemplateFormComments />

                    <CreateAndEditServiceTemplateFormAutoPostViews />

                    <CreateAndEditServiceTemplateFormDuration />

                    <CreateAndEditServiceTemplateFormPollVotes />

                    <CreateAndEditServiceTemplateSelect />
                </div>
            )}
        </>
    );
};

CreateAndEditServiceTemplateForm.propTypes = {
    serviceTemplate: PropTypes.string,
};
