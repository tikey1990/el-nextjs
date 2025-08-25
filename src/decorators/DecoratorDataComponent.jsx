"use client";
import { useTransition, animated } from "react-spring";
import { DecoratorSuspense } from "@decorators";
import { lazyReactNaiveRetry } from "@utils";
import PropTypes from "prop-types";

const Loader = lazyReactNaiveRetry(() => import("@components/loader/Loader"));

export const DecoratorDataComponent = ({
  loading = () => (
    <DecoratorSuspense>
      <Loader />
    </DecoratorSuspense>
  ),
  fallback = () => {
    return <div>{query.error.status}</div>;
  },
  animation = false,
  children,
  query,
}) => {
  const transitions = useTransition(!query.isLoading, {
    config: {
      duration: 250,
    },
    leave: { opacity: 0, blur: 20 },
    enter: { opacity: 1, blur: 0 },
    from: { opacity: 0, blur: 20 },
  });

  if (query.isLoading || query.isFetching) {
    return animation ? (
      <animated.div style={transitions}>{loading()}</animated.div>
    ) : (
      loading()
    );
  }

  if (query.isError) {
    return fallback();
  }

  return animation
    ? transitions((styles, item) => item && children({ style: styles }))
    : children;
};

DecoratorDataComponent.propTypes = {
  /**
   * Анимация
   */
  animation: PropTypes.bool,

  /**
   * Callback возникновения ошибки при загрузке данных
   */
  fallback: PropTypes.func,

  /**
   * Результат запроса
   */
  children: PropTypes.any,

  /**
   * Результат запроса
   */
  query: PropTypes.object,

  /**
   * Callback ожидания при загрузке данных
   */
  loading: PropTypes.func,
};
