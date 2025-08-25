import { DecoratorSuspense } from "@decorators";
import { lazyReactNaiveRetry } from "@utils";
import { VAR_LINK_ROUTES } from "@vars";
import { animated } from "react-spring";
import { infoRoute } from "@pages";

const Templates = lazyReactNaiveRetry(() => import("../Templates"));

/**
 * Маршруты шаблонов
 */
export const TemplatesRoutes = [
    {
        element: (
            <DecoratorSuspense animation>
                {(props) => (
                    // eslint-disable-next-line react/prop-types
                    <animated.section className="w-full z-10" style={props?.style}>
                        <Templates />
                    </animated.section>
                )}
            </DecoratorSuspense>
        ),
        handle: {
            routeParent: VAR_LINK_ROUTES.profile,
            routeName: VAR_LINK_ROUTES.templates,
            ...infoRoute,
            childrenRus: "Шаблоны",
        },
        path: VAR_LINK_ROUTES.templates,
    },
];
