import { DecoratorSuspense } from "@decorators";
import { lazyReactNaiveRetry } from "@utils";
import { VAR_LINK_ROUTES } from "@vars";
import { animated } from "react-spring";

import { infoRoute } from "../../../config";

const Faq = lazyReactNaiveRetry(() => import("../Faq"));

/**
 * Маршруты пополнения баланса
 */
export const ProfileFaqRoutes = [
    {
        element: (
            <DecoratorSuspense animation>
                {(props) => (
                    // eslint-disable-next-line react/prop-types
                    <animated.section className="w-full z-10" style={props?.style}>
                        <Faq />
                    </animated.section>
                )}
            </DecoratorSuspense>
        ),
        handle: {
            ...infoRoute,
            childrenRus: "Помощь",
        },
        path: VAR_LINK_ROUTES.faq,
    },
];
