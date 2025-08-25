import { classListboxWrapper, classListboxOptions, classListboxOption, classListboxButton } from "@components/select/config/index.js";
import { selectDefault, selectValues, selectText, selectName, select } from "@config";
import React, { useEffect, useState, Fragment, useRef } from "react";
import { Transition, Listbox } from "@headlessui/react";
import { TextInput, Label } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import { HiChevronDown } from "react-icons/hi";
import { useSelector } from "react-redux";

/**
 * Компонент select для услуг
 * @returns {JSX.Element}
 * @constructor
 */
export const ServicesFormSelect = () => {
    /**
     * Форма
     */
    const methods = useFormContext();
    const { register, setValue } = methods;

    const quality = useSelector((state) => state.services.route.quality);
    const listboxRef = useRef(null);

    const [stateSelect, setStateSelect] = useState(selectDefault(quality));
    const [active, setActive] = useState(false);

    const handleClickListBox = () => setActive(!active);

    const handleClickOutside = (event) => {
        if (listboxRef.current && !listboxRef.current.contains(event.target)) {
            setActive(false);
        }
    };

    useEffect(() => {
        if (select(quality)) setValue(selectName(quality), stateSelect, { shouldDirty: true, shouldTouch: true });
    }, [stateSelect, select(quality)]);

    useEffect(() => {
        if (selectDefault(quality)) setStateSelect(selectDefault(quality));
    }, [selectDefault(quality)]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const renderOptions = () =>
        selectValues(quality)?.map((elem, index) => (
            <Listbox.Option className={classListboxOption("templates")} value={elem} key={index}>
                <span className="truncate flex items-center gap-3 w-full">{elem}</span>
            </Listbox.Option>
        ));

    return (
        <>
            {select(quality) && (
                <div className="flex flex-col gap-2 max-w-[250px]">
                    <div className="flex w-full flex-col">
                        <Label htmlFor={selectName(quality)} value={selectText(quality)} />
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

                    <TextInput className="hidden" disabled {...register(selectName(quality))} />
                </div>
            )}
        </>
    );
};
