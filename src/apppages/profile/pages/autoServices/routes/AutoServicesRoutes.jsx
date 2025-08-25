import { DecoratorSuspense } from "@decorators";
import { lazyReactNaiveRetry } from "@utils";
import { Navigate } from "react-router-dom";
import { VAR_LINK_ROUTES } from "@vars";
import { animated } from "react-spring";

import { infoRoute } from "../../../config";

const AutoServices = lazyReactNaiveRetry(() => import("../AutoServices"));

/**
 * Маршруты моих заказов
 */
export const AutoServicesRoutes = [
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
                                <AutoServices />
                            </animated.section>
                        )}
                    </DecoratorSuspense>
                ),
                handle: {
                    routeEnName: VAR_LINK_ROUTES.autoServices,
                    routeName: VAR_LINK_ROUTES.autoServices,
                    routeParent: VAR_LINK_ROUTES.profile,
                    ...infoRoute,
                    childrenRus: "Автоуслуги",
                },
                path: "*",
            },
        ],
        handle: {
            routeEnName: VAR_LINK_ROUTES.autoServices,
            routeName: VAR_LINK_ROUTES.autoServices,
            routeParent: VAR_LINK_ROUTES.profile,
            ...infoRoute,
            childrenRus: "Автоуслуги",
        },
        path: VAR_LINK_ROUTES.autoServices,
    },
];
