import { utilServicesCheckOrder, utilColorInputValid, utilHelperText } from "@utils";
import { Textarea, Button } from "flowbite-react";
import { useYupValidationResolver } from "@hooks";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { RHFProvider } from "@providers";
import { Modal } from "@components";
import { IconRuble } from "@icons";
import PropTypes from "prop-types";

import { createOrderSchemaValidation, utilHandleCreateOrder } from "../../utils";

/**
 * Компонент модального окна для подтверждения удаления шаблона
 * @param {function} setOpenModal - Функция для открытия модального окна
 * @param {boolean} openModal - Состояние модального окна
 * @param {{}} elem - информация о шаблоне
 * @param createOrderQuery
 * @returns {JSX.Element}
 * @constructor
 */
export const TemplatesTableCreateOrderModal = ({ createOrderQuery, setOpenModal, openModal, elem }) => {
    const dispatch = useDispatch();
    const { total_price } = elem;

    /**
     * Инициализация формы
     */
    const resolver = useYupValidationResolver(createOrderSchemaValidation);
    const methods = useForm({
        mode: "onChange",
        resolver,
    });
    const {
        formState: { dirtyFields, errors },
        handleSubmit,
        getValues,
        register,
        watch,
        reset,
    } = methods;
    const linkLength = watch("link")?.split("\n")?.length;
    const priceTemplate = linkLength ? (Number(total_price) * linkLength).toFixed(2) : total_price.toFixed(2);

    utilServicesCheckOrder(createOrderQuery, getValues, reset);

    return (
        <Modal
            className="w-full sm:w-[585px] max-sm:max-h-[calc(100vh-2rem)] max-sm:w-[90%] max-sm:overflow-y-scroll max-sm:scrollbar-hidden max-sm:scroll-m-10 sm:-translate-y-[70px]"
            setOpenModal={setOpenModal}
            openModal={openModal}
        >
            <h2 className="mb-6 text-center sm:mb-10 text-2xl text-gray-600 font-pn-extraboldit">Подтверждение заказа</h2>

            <RHFProvider
                onSubmit={handleSubmit((data) => {
                    utilHandleCreateOrder(elem, data, dispatch);
                    setOpenModal(false);
                })}
                className="flex flex-col gap-6"
                methods={methods}
            >
                <div>
                    <Textarea
                        placeholder={`Введите ссылку или несколько ссылок.
Каждая ссылка должна быть с новой строки.`}
                        color={utilColorInputValid("link", errors, dirtyFields)}
                        helperText={utilHelperText("link", errors)}
                        className="h-[155px] w-full"
                        autoComplete="off"
                        name="link"
                        sizing="lg"
                        id="link"
                        {...register("link")}
                    />
                </div>

                <Button className="shadow-button mx-auto [&>span]:items-center [&>span]:gap-0.5" color="primary" type="submit" size="sm">
                    Купить | {priceTemplate} <IconRuble className="fill-white w-[11px] h-[11px] -translate-y-[2px]" />
                </Button>
            </RHFProvider>
        </Modal>
    );
};

TemplatesTableCreateOrderModal.propTypes = {
    /**
     * Функция для открытия модального окна
     */
    setOpenModal: PropTypes.func.isRequired,

    /**
     * Состояние модального окна
     */
    openModal: PropTypes.bool.isRequired,

    /**
     * Запрос на создание заказа
     */
    createOrderQuery: PropTypes.object,

    /**
     * Информация о шаблоне
     */
    elem: PropTypes.object.isRequired,
};
