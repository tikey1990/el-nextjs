import { classListboxWrapper, classListboxOptions, classListboxOption, classListboxButton } from "@components/select/config/index.js";
import { select as selectForm, selectDefault, selectValues, selectText, selectName } from "@config";
import React, { useEffect, useState, Fragment, useRef } from "react";
import { Transition, Listbox } from "@headlessui/react";
import { useUpdateDefaultValueSelect } from "@hooks";
import { TextInput, Label } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import { HiChevronDown } from "react-icons/hi";
import { useSelector } from "react-redux";

/**
 * Компонент select для шаблонов
 * @returns {JSX.Element}
 * @constructor
 */
export const CreateAndEditServiceTemplateSelect = () => {
    /**
     * Форма
     */
    const methods = useFormContext();
    const { register, setValue } = methods;

    const select = useSelector((state) => state.profileTemplates.select);
    const deleteSelect = useSelector((state) => state.profileTemplates.deleteSelect);
    const listboxRef = useRef(null);
    const isEditMode = deleteSelect === null;

    const [stateSelect, setStateSelect] = useState(selectDefault(select?.option, "templates"));
    const [active, setActive] = useState(false);

    useUpdateDefaultValueSelect(setValue, select?.option, "templates", isEditMode);

    const handleClickListBox = () => setActive(!active);

    const handleClickOutside = (event) => {
        if (listboxRef.current && !listboxRef.current.contains(event.target)) {
            setActive(false);
        }
    };

    useEffect(() => {
        if (selectForm(select?.option, "templates"))
            setValue(selectName(select?.option, "templates"), stateSelect, { shouldDirty: true, shouldTouch: true });
    }, [stateSelect, selectForm(select?.option, "templates")]);

    useEffect(() => {
        if (selectDefault(select?.option, "templates")) setStateSelect(selectDefault(select?.option, "templates"));
    }, [selectDefault(select?.option, "templates")]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isEditMode) {
            const valueSelect = deleteSelect?.option?.find((elem) => elem?.name === selectName(select?.option, "templates"))?.value;

            setValue(selectName(select?.option, "templates"), valueSelect, { shouldDirty: true, shouldTouch: true });
            setStateSelect(valueSelect);
        }
    }, [deleteSelect]);

    const renderOptions = () =>
        selectValues(select?.option, "templates")?.map((elem, index) => (
            <Listbox.Option className={classListboxOption("templates")} value={elem} key={index}>
                <span className="truncate flex items-center gap-3 w-full">{elem}</span>
            </Listbox.Option>
        ));

    return (
        <>
            {selectForm(select?.option, "templates") && (
                <div className="flex flex-col gap-2 max-w-[492px]">
                    <div className="flex w-full flex-col">
                        <Label htmlFor={selectName(select?.option, "templates")} value={selectText(select?.option, "templates")} />
                    </div>

                    <Listbox className="border-none w-full" onChange={setStateSelect} value={stateSelect} ref={listboxRef}>
                        <div className={classListboxWrapper("templates")}>
                            <Listbox.Button className={classListboxButton("templates", active)} onClick={handleClickListBox}>
                                <span className="truncate flex items-center gap-3 text-gray-600">{stateSelect} сек</span>

                                <span className="pointer-events-none flex items-center">
                                    <HiChevronDown className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                </span>
                            </Listbox.Button>
                            <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" as={Fragment}>
                                <Listbox.Options className={classListboxOptions("templates")}>{renderOptions()}</Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>

                    <TextInput className="hidden" disabled {...register(selectName(select?.option, "templates"))} />
                </div>
            )}
        </>
    );
};
