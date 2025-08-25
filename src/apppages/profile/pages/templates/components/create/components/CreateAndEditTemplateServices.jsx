import { useSaveTemplateMutation, setDeleteSelectTemplate, setSelectTemplate, setCreateTemplate, deleteService } from "@features";
import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import { useTypeDevice } from "@hooks";

import { utilRenderServicesCreateOrEditTemplate, utilTransformServices } from "../utils";

/**
 * Компонент таблицы услуг для создания и редактирования шаблона
 * @constructor
 */
export const CreateAndEditTemplateServices = () => {
    const services = useSelector((state) => state.profileTemplates.template.services);
    const { isMobile } = useTypeDevice();
    const serviceName = useSelector((state) => state.profileTemplates.template.service);
    const isShowServices = services.length > 0;
    const { formState, setValue, reset } = useFormContext();

    const dispatch = useDispatch();
    const template = useSelector((state) => state.profileTemplates.template);

    const [saveTemplate] = useSaveTemplateMutation();

    /**
     * Слушатель на удаление услуги из шаблона
     * @param index
     */
    const handleDeleteService = (index) => {
        dispatch(deleteService(index));
        dispatch(setDeleteSelectTemplate(null));

        const createData = {
            ...template,
            services: [...utilTransformServices(template.services)].filter((item, indexItem) => index !== indexItem),
            price_per_one: undefined,
            total_price: undefined,
            type: undefined,
        };

        saveTemplate({
            data: JSON.stringify(createData),
        }).then((res) => {
            const resData = res?.data?.data?.["template_data"];

            dispatch(setCreateTemplate(resData));
        });
    };

    /**
     * Слушатель на редактирование услуги в шаблоне
     * @param select
     */
    const handleEditService = (select) => {
        dispatch(setSelectTemplate(select));
        dispatch(setDeleteSelectTemplate(select));

        select?.option?.forEach((item) => {
            setValue(item.name, item.value ?? item.data);
        });

        reset(
            { ...formState.values },
            {
                keepValues: true,
            }
        );
    };

    return (
        <div className="flex flex-col gap-5 sm:gap-6">
            <p className="text-[20px] font-pn-boldit text-gray-600">Список услуг</p>

            {isShowServices ? (
                <div className="flex flex-col w-full border-t border-gray-200">
                    {utilRenderServicesCreateOrEditTemplate(services, isMobile, serviceName, handleDeleteService, handleEditService)}
                </div>
            ) : (
                <p className="text-[16px] font-pn-regular text-gray-500">Список услуг пока пуст</p>
            )}
        </div>
    );
};
