import { DecoratorSuspense } from "@decorators";
import { lazyReactNaiveRetry } from "@utils";
import { VAR_LINK_ROUTES } from "@vars";
import { animated } from "react-spring";
import { infoRoute } from "@pages";

const Ref = lazyReactNaiveRetry(() => import("../Ref"));

/**
 * Маршруты для компонента Ref
 */
export const RefRoutes = [
    {
        element: (
            <DecoratorSuspense animation>
                {(props) => (
                    // eslint-disable-next-line react/prop-types
                    <animated.section className="w-full max-sm:z-10" style={props?.style}>
                        <Ref />
                    </animated.section>
                )}
            </DecoratorSuspense>
        ),
        handle: {
            routeParent: VAR_LINK_ROUTES.profile,
            routeName: VAR_LINK_ROUTES.ref,
            ...infoRoute,
            childrenRus: "Рефералы",
        },
        path: VAR_LINK_ROUTES.ref,
    },
];
