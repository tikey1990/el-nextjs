import { DecoratorSuspense } from "@decorators";
import { lazyReactNaiveRetry } from "@utils";
import { Navigate } from "react-router-dom";
import { ErrorBoundary } from "@components";
import { VAR_LINK_ROUTES } from "@vars";
import { animated } from "react-spring";
import { useAuth } from "@hooks";

const HomePage = lazyReactNaiveRetry(() => import("@pages/home/HomePage"));

/**
 * Роутер страницы "Главная"
 */
export const HomeRouter = () => {
    const { isAuth } = useAuth();

    return !isAuth
        ? [
              {
                  element: (
                      <DecoratorSuspense animation>
                          {(props) => (
                              // eslint-disable-next-line react/prop-types
                              <animated.div style={props?.style}>
                                  <HomePage />
                              </animated.div>
                          )}
                      </DecoratorSuspense>
                  ),
                  handle: {
                      routeName: "Главная",
                  },
                  errorElement: <ErrorBoundary />,
                  path: VAR_LINK_ROUTES.home,
              },
          ]
        : [
              {
                  element: <Navigate to={VAR_LINK_ROUTES.services} replace />,
                  path: VAR_LINK_ROUTES.home,
              },
          ];
};
