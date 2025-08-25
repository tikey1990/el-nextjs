import { Transition } from "@headlessui/react";
import { Accordion } from "flowbite-react";
import { useState } from "react";

import { socialsData, dataFaq } from "../config";

/**
 * Рендер социальных сетей
 * @returns {unknown[]}
 */
export const renderSocials = () => {
    return (
        Array.isArray(socialsData) &&
        socialsData?.map((elem, index) => (
            <a
                style={{
                    background:
                        "radial-gradient(146.84% 141.42% at 100% 0.00%, rgba(52, 211, 153, 0.05) 0%, rgba(52, 211, 153, 0.00) 100%), #1A1F25",
                }}
                className="font-md-moz-fix relative flex h-[44px] w-[calc(50%-0.5rem)] cursor-pointer items-center justify-center rounded-full p-3 text-sm font-medium ring-1 ring-gray-700 hover:ring-gray-600 sm:w-[calc(33.33%-(2/3)*1rem)]"
                href={elem?.link}
                rel="noreferrer"
                target="_blank"
                key={index}
            >
                <div className={`absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full ${elem.class}`}>
                    {elem.icon}
                </div>
                {elem.name}
            </a>
        ))
    );
};

/**
 * Рендер FAQ аккордеона
 * @returns {unknown[]}
 */
export const renderFaq = () => {
    const [isShowing, setIsShowing] = useState(null);

    return (
        Array.isArray(dataFaq) &&
        dataFaq?.map((elem, index) => (
            <Accordion.Panel className={isShowing ? "accordion-content open" : "accordion-content"} key={index} static>
                <div
                    onClick={() => setIsShowing(isShowing === elem.ti1le ? null : elem.title)}
                    className="rounded-b-xl rounded-t-xl ring-1 ring-gray-700"
                >
                    <Accordion.Title>{elem.title}</Accordion.Title>

                    <Accordion.Content className="rounded-b-xl">
                        <Transition
                            leaveFrom="transform scale-100 opacity-100"
                            enterTo="transform scale-100 opacity-100"
                            enterFrom="transform scale-95 opacity-0"
                            enter="transition duration-100 ease-out"
                            leave="transition duration-75 ease-out"
                            leaveTo="transform scale-95 opacity-0"
                            show={isShowing === elem.title}
                        >
                            <p className="mb-2 text-gray-400">{elem.description}</p>
                        </Transition>
                    </Accordion.Content>
                </div>
            </Accordion.Panel>
        ))
    );
};
