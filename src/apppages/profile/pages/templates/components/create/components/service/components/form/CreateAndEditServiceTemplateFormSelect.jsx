import { classListboxWrapper, classListboxOptions, classListboxOption, classListboxButton } from "@components/select/config";
import { configIconsReactionsServices, servicesCategories } from "@config";
import { useEffect, useState, Fragment, useRef } from "react";
import { Transition, Listbox } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { HiChevronDown } from "react-icons/hi";
import { setSelectTemplate } from "@features";
import PropTypes from "prop-types";

/**
 * Компонент select для формы создания и редактирования шаблона услуги
 * @param getServicesWebsitesQuery
 * @param isLoaded
 * @param data
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const CreateAndEditServiceTemplateFormSelect = ({ getServicesWebsitesQuery, data, ...props }) => {
    const deleteSelect = useSelector((state) => state.profileTemplates.deleteSelect);
    const select = useSelector((state) => state.profileTemplates.template.select);
    const { isLoading, isSuccess } = getServicesWebsitesQuery;
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(select ?? data[0]);
    const listboxRef = useRef(null);
    const [active, setActive] = useState(false);
    const icon = servicesCategories(selected?.category?.name)?.icon;

    const isReactions = selected?.category?.name === "reactions";
    const categoryIconReaction = selected?.quality?.name;
    const iconReaction = configIconsReactionsServices({ className: "w-4 h-4" })?.[`${categoryIconReaction}`]?.icon;

    useEffect(() => {
        if (!isLoading && isSuccess) setSelected(data[0]);
    }, [getServicesWebsitesQuery]);

    useEffect(() => {
        if (deleteSelect !== null) {
            const dataDeleteFind = data.find((item) => item.id === deleteSelect?.id);

            setSelected(dataDeleteFind);
        }
    }, [deleteSelect]);

    useEffect(() => {
        dispatch(setSelectTemplate(selected));
    }, [selected]);

    /**
     * Рендер options
     * @returns {unknown[]}
     */
    const renderOptions = () =>
        Array.isArray(data) &&
        data?.map((elem, index) => {
            const icon = servicesCategories(elem.category?.name)?.icon;
            const isReactions = elem.category.name === "reactions";
            const categoryIconReaction = elem.quality.name;
            const iconReaction = configIconsReactionsServices({ className: "w-5 h-5" })?.[`${categoryIconReaction}`]?.icon;

            return (
                <Listbox.Option className={classListboxOption("templates")} value={elem} key={index}>
                    <span className="truncate flex items-center gap-3 w-full">
                        {icon}

                        <div className="flex items-center gap-1 overflow-hidden">
                            <div className="text-sm text-gray-600 flex-shrink-0">{elem.category?.["ru_name"]}</div>
                            <div className="w-[3px] h-[3px] rounded-full bg-gray-200 flex-shrink-0"></div>
                            <div className="text-sm text-gray-500 flex-2 whitespace-nowrap overflow-hidden text-ellipsis">
                                {elem.type?.["ru_name"]}
                            </div>
                            <div className="w-[3px] h-[3px] rounded-full bg-gray-200 flex-shrink-0"></div>
                            <div className="text-sm text-gray-500 flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                                {isReactions ? iconReaction : elem.quality?.["ru_name"]}
                            </div>
                        </div>

                        {!`${elem?.category?.name}`.includes("auto_") && (
                            <p className="text-gray-600 font-pn-regular ml-auto">{`${elem?.price}`.replace(".", ",")} р.</p>
                        )}
                    </span>
                </Listbox.Option>
            );
        });

    const handleClickListBox = () => setActive(!active);
    const handleClickOutside = (event) => {
        if (listboxRef.current && !listboxRef.current.contains(event.target)) {
            setActive(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <Listbox className="border-none w-full" onChange={setSelected} {...props} ref={listboxRef}>
            <div className={classListboxWrapper("templates")}>
                <Listbox.Button className={classListboxButton("templates", active)} onClick={handleClickListBox}>
                    <span className="truncate flex items-center gap-3">
                        {!isLoading && isSuccess && (
                            <>
                                {icon}

                                <span className="flex items-center gap-1 overflow-hidden max-sm:w-[85%]">
                                    <p className="text-[16px] text-gray-600 flex-shrink-0">{selected?.category?.["ru_name"]}</p>
                                    <div className="w-[3px] h-[3px] rounded-full bg-gray-200 flex-shrink-0"></div>
                                    <p className="text-[16px] text-gray-500 flex-2 whitespace-nowrap overflow-hidden text-ellipsis">
                                        {selected?.type?.["ru_name"]}
                                    </p>
                                    <div className="w-[3px] h-[3px] rounded-full bg-gray-200 flex-shrink-0"></div>
                                    <p className="text-[16px] text-gray-500 flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                                        {isReactions ? iconReaction : selected?.quality?.["ru_name"]}
                                    </p>
                                </span>

                                {!`${selected?.category?.name}`.includes("auto_") && (
                                    <p className="text-gray-600 font-pn-regular">{`${selected?.price}`.replace(".", ",")} р.</p>
                                )}
                            </>
                        )}
                    </span>

                    <span className="pointer-events-none flex items-center">
                        <HiChevronDown className="h-5 w-5 text-gray-500" aria-hidden="true" />
                    </span>
                </Listbox.Button>
                <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" as={Fragment}>
                    <Listbox.Options className={classListboxOptions("templates")}>{renderOptions()}</Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};

CreateAndEditServiceTemplateFormSelect.propTypes = {
    /**
     * Запрос на получение данных
     */
    getServicesWebsitesQuery: PropTypes.object,

    /**
     * Данные select
     */
    data: PropTypes.array.isRequired,

    /**
     * Состояние загрузки данных
     */
    isLoaded: PropTypes.bool,
};

CreateAndEditServiceTemplateFormSelect.defaultProps = {
    data: [],
};
