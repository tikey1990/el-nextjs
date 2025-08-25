import { useDispatch, useSelector } from "react-redux";
import { useSaveTemplateMutation } from "@features";
import { useYupValidationResolver } from "@hooks";
import { useForm } from "react-hook-form";
import { RHFProvider } from "@providers";
import { useState } from "react";

import {
    CreateAndEditTemplateButtonBack,
    CreateAndEditTemplateServices,
    CreateAndEditServiceTemplate,
    CreateAndEditTemplateSubmit,
    CreateAndEditTemplateName,
} from "./components";
import { createOrEditTemplateSchemaValidation, handleSubmitCreateOrEditTemplate } from "./utils";
import { defaultValuesPageCreateOrEdit, titlePageCreateOrEdit } from "./config";

/**
 * Компонент создания шаблона
 * @returns {JSX.Element}
 * @constructor
 */
export const CreateAndEditTemplate = () => {
    const dispatch = useDispatch();
    const template = useSelector((state) => state.profileTemplates.template);
    const select = useSelector((state) => state.profileTemplates.select);
    const service = useSelector((state) => state.profileTemplates.template.service);
    const deleteSelect = useSelector((state) => state.profileTemplates.deleteSelect);

    const [serviceTemplate, setServiceTemplate] = useState(service);

    const [saveTemplate] = useSaveTemplateMutation();

    /**
     * Инициализация формы
     */
    const resolver = useYupValidationResolver(createOrEditTemplateSchemaValidation());
    const methods = useForm({
        defaultValues: defaultValuesPageCreateOrEdit(),
        mode: "onChange",
        resolver,
    });
    const { handleSubmit, formState, reset } = methods;

    return (
        <div className="flex flex-col bg-white gap-6 sm:gap-10 max-sm:py-6 max-sm:px-5 max-sm:rounded-2xl">
            <h1 className="sm:text-[32px] inline-flex justify-between text-2xl font-pn-extraboldit text-gray-600">
                {titlePageCreateOrEdit()}

                <CreateAndEditTemplateButtonBack />
            </h1>

            <RHFProvider
                onSubmit={handleSubmit((data) =>
                    handleSubmitCreateOrEditTemplate(
                        data,
                        saveTemplate,
                        template,
                        select,
                        serviceTemplate,
                        dispatch,
                        reset,
                        formState,
                        deleteSelect
                    )
                )}
                className="flex flex-col sm:gap-10 gap-5"
                methods={methods}
            >
                <CreateAndEditTemplateName />

                <CreateAndEditTemplateServices />

                <CreateAndEditServiceTemplate setServiceTemplate={setServiceTemplate} serviceTemplate={serviceTemplate} />

                <CreateAndEditTemplateSubmit />
            </RHFProvider>
        </div>
    );
};
