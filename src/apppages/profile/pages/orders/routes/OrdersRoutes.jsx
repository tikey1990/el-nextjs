import { DecoratorSuspense } from "@decorators";
import { lazyReactNaiveRetry } from "@utils";
import { Navigate } from "react-router-dom";
import { VAR_LINK_ROUTES } from "@vars";
import { animated } from "react-spring";

import { infoRoute } from "../../../config";

const Orders = lazyReactNaiveRetry(() => import("../Orders"));

/**
 * Маршруты моих заказов
 */
export const OrdersRoutes = [
    {
        children: [
            {
                element: <Navigate to="1" />,
                path: "",
            },
            {
                element: (
                    <DecoratorSuspense animation>
                        {(props) => (
                            // eslint-disable-next-line react/prop-types
                            <animated.section style={props?.style} className="w-full">
                                <Orders />
                            </animated.section>
                        )}
                    </DecoratorSuspense>
                ),
                handle: {
                    routeParent: VAR_LINK_ROUTES.profile,
                    routeEnName: VAR_LINK_ROUTES.orders,
                    routeName: VAR_LINK_ROUTES.orders,
                    ...infoRoute,
                    childrenRus: "Мои заказы",
                },
                path: "*",
            },
        ],
        handle: {
            routeParent: VAR_LINK_ROUTES.profile,
            routeEnName: VAR_LINK_ROUTES.orders,
            routeName: VAR_LINK_ROUTES.orders,
            ...infoRoute,
            childrenRus: "Мои заказы",
        },
        path: VAR_LINK_ROUTES.orders,
    },
];
