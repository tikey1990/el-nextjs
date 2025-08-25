import { setDeleteSelectTemplate, setSelectTemplate, setCreateTemplate } from "@features";
import { useDispatch } from "react-redux";
import { Button } from "flowbite-react";

/**
 * Компонент кнопки "Назад" в форме создания или редактирования шаблона
 * @returns {JSX.Element}
 * @constructor
 */
export const CreateAndEditTemplateButtonBack = () => {
    const dispatch = useDispatch();

    const handleBack = () => {
        dispatch(setCreateTemplate(null));
        dispatch(setSelectTemplate(null));
        dispatch(setDeleteSelectTemplate(null));
    };

    return (
        <Button className="[&>span]:py-2 [&>span]:text-[14px]" onClick={handleBack} color="primary" size="sm">
            Назад
        </Button>
    );
};
