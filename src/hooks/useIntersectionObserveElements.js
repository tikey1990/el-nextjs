"use client";
import { useEffect, useState, useRef } from "react";

/**
 * Хук для отслеживания элемента на экране
 */
export const useIntersectionObserveElements = () => {
  // Текущий элемент, который находится на экране
  const [currentSection, setCurrentSection] = useState(null);
  // Отлеживаемые элементы
  const observers = useRef([]);
  const timestamps = useRef({});

  /**
   * Регистрация элемента
   * @param {Element} element - Элемент
   * @param {string} name - Название элемента
   */
  const register = (element, name) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentTimestamp = timestamps.current[name];
            if (
              currentSection === null ||
              currentTimestamp < timestamps.current[currentSection]
            ) {
              setCurrentSection(name);
            }
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(element);
    observers.current.push(observer);
    timestamps.current[name] = Date.now();
  };

  return { currentSection, observers, register };
};

export const useIntersectionObserveElementWithCallback = (
  callCallback,
  deps,
  params,
) => {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callCallback();
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, deps, params]);

  return observerTarget;
};

export const utilHandleObserveTarget = (
  page,
  navigate,
  params,
  setFilters,
  setShowTarget,
  basePath,
  pagesCount,
) => {
  if (page < pagesCount) {
    setShowTarget(false);
    setFilters((prev) => ({ ...prev, scrollPage: page + 1 }));
    let url = `${basePath}?page=${page + 1}`;
    if (params.toString()) {
      url = `${url}&${params.toString()}`;
    }

    navigate(null, "", url);
  }
};
