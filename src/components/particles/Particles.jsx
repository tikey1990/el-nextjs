"use client";
import { VAR_HAS_PREMIUM_VISUAL_MODE } from "@vars";
import { loadSlim } from "tsparticles-slim";
import { useSelector } from "react-redux";
import Particles from "react-particles";
import { useCallback } from "react";

/**
 * Компонент звездного неба
 */
const ParticlesComponent = () => {
  const statusStars = useSelector(
    (state) => state.profileSettings.stars.status,
  );
  const fpsStars = useSelector((state) => state.profileSettings.stars.fps);
  const isCheckedVisualMode = VAR_HAS_PREMIUM_VISUAL_MODE();
  const countBigStars = isCheckedVisualMode ? 45 : 30;
  const countSmallStars = countBigStars * 2.2;

  /**
   * Инициализация звездного неба
   * @type {(function(*): Promise<void>)|*}
   */
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <>
      {statusStars && (
        <>
          {/* Компонент больших звезд */}
          <Particles
            options={{
              particles: {
                move: {
                  direction: "top",
                  out_mode: "out",
                  straight: true,
                  enable: true,
                  speed: 0.7,
                },
                size: {
                  random: false,
                  value: 1,
                },
                number: {
                  value: countBigStars,
                },
                color: {
                  value: "#fff",
                },
              },
              fpsLimit: fpsStars,
            }}
            style={{ pointerEvents: "none", zIndex: "-100" }}
            init={(engine) => particlesInit(engine)}
            id="tsparticles--front"
          />

          {/* Компонент маленьких звезд на фоне */}
          <Particles
            options={{
              particles: {
                move: {
                  direction: "top",
                  out_mode: "out",
                  straight: true,
                  enable: true,
                  speed: 1.5,
                },
                size: {
                  random: false,
                  value: 0.4,
                },
                number: {
                  value: countSmallStars,
                },
                color: {
                  value: "#fff",
                },
              },
              fpsLimit: fpsStars,
            }}
            style={{ pointerEvents: "none", zIndex: "-100" }}
            init={(engine) => particlesInit(engine)}
            id="tsparticles--behind"
          />
        </>
      )}
    </>
  );
};

export default ParticlesComponent;
