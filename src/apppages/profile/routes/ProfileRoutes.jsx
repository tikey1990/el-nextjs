import { DecoratorSuspense } from "@decorators";
import { lazyReactNaiveRetry } from "@utils";
import { ErrorBoundary } from "@components";
import { Navigate } from "react-router-dom";
import { VAR_LINK_ROUTES } from "@vars";
import { animated } from "react-spring";
import { useAuth } from "@hooks";

import {
    AutoServicesRoutes,
    ProfileFaqRoutes,
    TemplatesRoutes,
    SettingsRoutes,
    DepositRoutes,
    OrdersRoutes,
    RefRoutes,
    ApiRoutes,
} from "../pages";
import { infoRoute } from "../config";

const ProfileLayout = lazyReactNaiveRetry(() => import("../layout/ProfileLayout"));

/**
 * Маршруты раздела "Профиль"
 */
export const ProfileRoutes = () => {
    const { isAuth } = useAuth();

    return isAuth
        ? [
              {
                  children: [
                      // Пополнение баланса
                      ...DepositRoutes,

                      // Заказы
                      ...OrdersRoutes,

                      // Faq
                      ...ProfileFaqRoutes,

                      // Настройки
                      ...SettingsRoutes,

                      // Реферальная программа
                      ...RefRoutes,

                      // Api
                      ...ApiRoutes,

                      // Автосервисы
                      ...AutoServicesRoutes,

                      // Шаблоны
                      ...TemplatesRoutes,
                  ],
                  element: (
                      <DecoratorSuspense animation>
                          {(props) => (
                              // eslint-disable-next-line react/prop-types
                              <animated.section className="page profile" style={props?.style}>
                                  <ProfileLayout />
                              </animated.section>
                          )}
                      </DecoratorSuspense>
                  ),
                  handle: {
                      ...infoRoute,
                  },
                  errorElement: <ErrorBoundary />,
                  path: infoRoute.routeName,
              },
          ]
        : [
              {
                  element: <Navigate to={`/${VAR_LINK_ROUTES.login}`} replace />,
                  path: `/${infoRoute.routeName}/*`,
              },
          ];
};
