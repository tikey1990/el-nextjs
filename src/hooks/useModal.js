"use client";
import { useState } from "react";

/**
 * Хук для управления состоянием модального окна
 */
export const useModal = () => {
  const [modal, setModal] = useState(false); // State модального окна

  /**
   * Слушатель нга открытие модального окна
   */
  const handleOpenModal = () => setModal(true);

  /**
   * Слушатель на закрытие модального окна
   */
  const handleCloseModal = () => setModal(false);

  return { handleCloseModal, handleOpenModal, setModal, modal };
};
