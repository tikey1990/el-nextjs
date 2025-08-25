"use client";
import { useEffect, useState, Suspense } from "react";
import { lazyReactNaiveRetry } from "@utils";
import { useTransition } from "react-spring";
import PropTypes from "prop-types";

const Loader = lazyReactNaiveRetry(() => import("@components/loader/Loader"));

export const DecoratorSuspense = ({ animation, children }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(!animation);
  }, [animation]);

  const transitions = useTransition(!isLoading, {
    config: {
      duration: 600,
    },
    onRest: () => setIsLoading(false),
    leave: { opacity: 0, blur: 20 },
    enter: { opacity: 1, blur: 0 },
    from: { opacity: 0, blur: 20 },
  });

  const AnimatedLoader = <Loader />;

  const childrenWithAnimation = transitions((styles, item) =>
    item
      ? typeof children === "function"
        ? children({ style: { ...styles, filter: `blur(${styles.blur}px)` } })
        : children
      : null,
  );

  return (
    <Suspense fallback={AnimatedLoader}>
      {animation ? childrenWithAnimation : children}
    </Suspense>
  );
};

DecoratorSuspense.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  animation: PropTypes.bool,
};
