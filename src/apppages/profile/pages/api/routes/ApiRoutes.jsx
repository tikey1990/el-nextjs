import { DecoratorSuspense } from "@decorators";
import { lazyReactNaiveRetry } from "@utils";
import { VAR_LINK_ROUTES } from "@vars";
import { animated } from "react-spring";
import { infoRoute } from "@pages";

const Api = lazyReactNaiveRetry(() => import("../Api"));

/**
 * Маршруты API
 */
export const ApiRoutes = [
    {
        element: (
            <DecoratorSuspense animation>
                {(props) => (
                    // eslint-disable-next-line react/prop-types
                    <animated.section className="w-full max-sm:z-10" style={props?.style}>
                        <Api />
                    </animated.section>
                )}
            </DecoratorSuspense>
        ),
        handle: {
            routeParent: VAR_LINK_ROUTES.profile,
            routeName: VAR_LINK_ROUTES.api,
            ...infoRoute,
            childrenRus: "API",
        },
        path: VAR_LINK_ROUTES.api,
    },
];
