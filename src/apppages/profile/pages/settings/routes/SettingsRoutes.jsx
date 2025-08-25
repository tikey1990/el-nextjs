import { DecoratorSuspense } from "@decorators";
import { animated } from "react-spring";
import { VAR_LINK_ROUTES } from "@vars";
import { infoRoute } from "@pages";

import Settings from "../Settings";

/**
 * Маршруты страницы настроек
 */
export const SettingsRoutes = [
    {
        element: (
            <DecoratorSuspense animation>
                {(props) => (
                    // eslint-disable-next-line react/prop-types
                    <animated.section className="w-full max-sm:z-10" style={props?.style}>
                        <Settings />
                    </animated.section>
                )}
            </DecoratorSuspense>
        ),
        handle: {
            ...infoRoute,
            childrenRus: "Настройки",
        },
        path: VAR_LINK_ROUTES.settings,
    },
];
