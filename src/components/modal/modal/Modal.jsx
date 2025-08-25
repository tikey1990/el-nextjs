"use client";
import { Transition, Portal, Dialog } from "@headlessui/react";
import React, { useEffect, Fragment, useRef } from "react";
import { useTypeDevice } from "@hooks";
import { HiX } from "react-icons/hi";
import PropTypes from "prop-types";

import { utilModalHandleCloseModal } from "./utils";
import { configModalClassModal } from "./config";

/**
 * Компонент модального окна
 * @returns {JSX.Element}
 * @constructor
 */
export const Modal = ({
  setOpenModal,
  elemClose,
  openModal,
  children,
  ...props
}) => {
  const { isMobile } = useTypeDevice();
  const modalContentRef = useRef(null);

  useEffect(() => {
    if (openModal && isMobile) {
      setTimeout(() => {
        modalContentRef.current.scrollTop = 0;
      }, 0);
    }
  }, [openModal, setOpenModal]);

  return (
    <Portal>
      <Transition show={openModal} as={Fragment}>
        <Dialog
          {...props}
          className="fixed px-0 sm:px-4 top-0 z-[150] sm:overflow-y-scroll flex h-full w-full items-center justify-center"
          onClose={() => utilModalHandleCloseModal(setOpenModal)}
          as="div"
        >
          <Transition.Child
            enter="ease-out duration-300"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            enterTo="opacity-100"
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            as={Fragment}
          >
            <div className="fixed inset-0 backdrop-blur-xl bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            leaveFrom="opacity-100 scale-100"
            enterTo="opacity-100 scale-100"
            enterFrom="opacity-0 scale-95"
            leave="ease-out duration-200"
            enter="ease-out duration-200"
            leaveTo="opacity-0 scale-95"
            as={Fragment}
          >
            {isMobile ? (
              <Dialog.Panel
                className={`${configModalClassModal(props)} scroll-touch`}
                ref={modalContentRef}
              >
                {elemClose ? (
                  elemClose
                ) : (
                  <HiX
                    className="absolute hover:scale-110 w-5 h-5 right-5 top-5 cursor-pointer fill-gray-500"
                    onClick={() => utilModalHandleCloseModal(setOpenModal)}
                  />
                )}

                {children}
              </Dialog.Panel>
            ) : (
              <div className="flex justify-center w-full h-fit overflow-y-scroll scrollbar-hidden">
                <Dialog.Panel className={configModalClassModal(props)}>
                  {elemClose ? (
                    elemClose
                  ) : (
                    <HiX
                      className="absolute hover:scale-110 w-5 h-5 right-5 top-5 cursor-pointer fill-gray-500"
                      onClick={() => utilModalHandleCloseModal(setOpenModal)}
                    />
                  )}

                  {children}
                </Dialog.Panel>
              </div>
            )}
          </Transition.Child>
        </Dialog>
      </Transition>
    </Portal>
  );
};

Modal.propTypes = {
  /**
   * Функция для изменения состояния модального окна
   */
  setOpenModal: PropTypes.func,

  /**
   * Элемент для закрытия модального окна
   */
  elemClose: PropTypes.node,

  /**
   * Состояние модального окна
   */
  openModal: PropTypes.bool,

  /**
   * Дочерние элементы
   */
  children: PropTypes.node,

  props: PropTypes.any,
};
