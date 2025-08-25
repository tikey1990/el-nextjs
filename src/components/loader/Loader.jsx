"use client";
import { Transition } from "react-transition-group";
import { Spinner } from "flowbite-react";
import classNames from "classnames";
import { useRef } from "react";

/**
 * Компонент loader
 * @returns {JSX.Element}
 * @constructor
 */
const Loader = () => {
  // Ref
  const loaderRef = useRef(null);

  // Класс loader
  const classLoader = classNames(
    "loader trans flex h-screen w-full flex-row flex-wrap items-center justify-center transition-all duration-500 ease-in-out",
  );

  return (
    <Transition
      timeout={{ exit: 500, entry: 0 }}
      className={classLoader}
      nodeRef={loaderRef}
      appear={true}
      mountOnEnter
      in={true}
    >
      {(state) => (
        <div className={`${classLoader} ${state}`} ref={loaderRef}>
          <div className="flex flex-col">
            <Spinner aria-label="Loading" color="success" size="xl" />
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Loader;
