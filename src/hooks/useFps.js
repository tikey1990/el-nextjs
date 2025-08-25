"use client";
import { useEffect, useState } from "react";

export const useFps = () => {
  const [fps, setFps] = useState(0);
  let frameCount = 0;
  let lastTime = performance.now();

  useEffect(() => {
    const countFrames = (currentTime) => {
      frameCount++;

      if (currentTime - lastTime > 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(countFrames);
    };

    requestAnimationFrame(countFrames);

    return () => cancelAnimationFrame(countFrames);
  }, []);

  return fps;
};
