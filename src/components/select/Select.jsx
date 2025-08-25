"use client";
import { useEffect, useState, Fragment, useRef } from "react";
import { Transition, Listbox } from "@headlessui/react";
import { capitalizeFirstLetter } from "@utils";
import { HiChevronDown } from "react-icons/hi";
import PropTypes from "prop-types";

import {
  classListboxWrapper,
  classListboxOptions,
  classListboxOption,
  classListboxButton,
} from "./config";

/**
 * Компонент select
 * @param {[]} data - Данные select
 * @param {{}} state - Состояние select
 * @param {"default" | "large"} style - Стиль select
 * @param  props - Props
 * @returns {JSX.Element}
 * @constructor
 */
export const Select = ({ style, state, data, ...props }) => {
  const [selected, setSelected] = useState(
    Array.isArray(data) &&
      (data?.find((elem) => elem?.name === state?.name) ?? data[0]),
  );
  const [active, setActive] = useState(false);

  const nameFilter = (elem) =>
    elem.name === "vk"
      ? "VK"
      : capitalizeFirstLetter(elem.ru_name ?? elem.name);

  /**
   * Рендер options
   * @returns {unknown[]}
   */
  const renderOptions = () =>
    Array.isArray(data) &&
    data?.map((elem, index) => (
      <Listbox.Option
        className={classListboxOption(style)}
        value={elem}
        key={index}
      >
        {elem?.icon && elem.icon}
        <span className={"text-gray-600 text-sm font-pn-regular"}>
          {nameFilter(elem)}
        </span>
      </Listbox.Option>
    ));

  const handleClickListBox = () => setActive(!active);

  const listboxRef = useRef(null);

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
    <Listbox
      className="border-none w-full"
      onChange={setSelected}
      value={selected}
      {...props}
      ref={listboxRef}
    >
      <div className={classListboxWrapper(style)}>
        <Listbox.Button
          className={classListboxButton(style, active)}
          onClick={handleClickListBox}
        >
          <span className="block truncate">{nameFilter(state)}</span>
          <span className="pointer-events-none flex items-center">
            <HiChevronDown
              className="h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as={Fragment}
        >
          <Listbox.Options className={classListboxOptions(style)}>
            {renderOptions()}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

Select.propTypes = {
  /**
   * Состояние select
   */ style: PropTypes.string.isRequired,

  /**
   * Состояние select
   */
  state: PropTypes.object.isRequired,

  /**
   * Данные select
   */
  data: PropTypes.array.isRequired,
};

Select.defaultProps = {
  style: "default",
};
