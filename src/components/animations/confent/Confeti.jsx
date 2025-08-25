"use client";
import ReactCanvasConfetti from "react-canvas-confetti";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef } from "react";
import { setCofetti } from "@features";

/**
 * Компонент конфетти
 * @returns {JSX.Element}
 * @constructor
 */
export const Confeti = () => {
  const dispatch = useDispatch();
  const refAnimationInstance = useRef(null);
  const confetti = useSelector((state) => state.profileSettings.confetti);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        particleCount: Math.floor(500 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    const numberOfShots = 5; // Количество выстрелов по ширине экрана
    const shot = {
      particleRatio: 0.8,
      startVelocity: 35,
      spread: 120,
      decay: 0.9,
    };

    for (let i = 0; i < numberOfShots; i++) {
      makeShot(shot.particleRatio, {
        ...shot,
        origin: { x: i / (numberOfShots - 1), y: 0 }, // Распределение по ширине экрана
      });
    }
  }, [makeShot]);

  useEffect(() => {
    if (confetti) {
      fire(); // Запуск анимации конфетти

      setTimeout(() => {
        dispatch(setCofetti(false));
      }, 3000);
    }
  }, [confetti]);

  return (
    <ReactCanvasConfetti
      style={{
        pointerEvents: "none",
        zIndex: 100000000000,
        position: "fixed",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
      }}
      refConfetti={getInstance}
    />
  );
};
